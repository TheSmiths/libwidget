/**
 * @class LibWidget
 * The library used to easily configure widgets.
 */
var LibWidget = function (widget) {
    this.TAG = "libWidget";
    this.widget = widget;
    this.reset();
};

LibWidget.prototype = {
    _applyRule: function (ruleId, inputValue) {
        /*
         * Apply a rule once the input value is known.
         * @param {string} ruleId The rule's public identifier; should correspond to a previously
         *  defined rule.
         * @param {string} inputValue The value read from the config file that has to be set.
         * @return {boolean} true if the rule exist and have been applied, false otherwise.
         * */
        /* Grab the related rule, which is an array of either properties or functions. */
        if (!_.has(this.rules, ruleId)) { return false; }
        var rule = this.rules[ruleId];
        /* Browse each target of the rule to build corresponding property */
        _.each(rule, function (target) {
            /* Basic case, target is a string which represent the corresponding property to set */
            if (_.isString(target)) {
                var elementId = target.match(/^(#[^\.]+)\.?/)[1];
                if (_.isObject(inputValue)) {
                    /* First case, the input is an object, so only the id considered */
                    _.each(inputValue, function (propertyValue, propertyName) {
                        this.setProperty(elementId, propertyName, propertyValue);
                    }, this);
                } else {
                    /* The input is a value that should be assigned to the given property under the
                     * given element id */
                    var propertyChain = target.split(elementId)[1].substr(1);
                    this.setProperty(elementId, propertyChain, inputValue);
                }
            } else if (_.isFunction(target)) {
                /* If the target is a function, then, just execute the function; The function should be
                 * in charge of declaring properties if any. */
                target(inputValue);
            }
        }, this);
        return true;
    },

    build: function (config, container) {
        /**
         * @method build
         * Execute rules within the config context. 
         * @param {Object} config An object that describe the user config for the widget as
         * described in a .tss file.
         * @param {appcelerator: Titanium.UI.View} [container] The top level container to which
         * apply the rules. If not supplied, the top level view will be used. 
         * @return {Object|boolean} The configuration minus keys handled as rules or false in case
         * of error.
         */
        if (_.isObject(config)) {
            _.each(config, function (value, key) {
                if (this._applyRule(key, value)) { delete config[key]; }
            }, this);
        } else {
            Ti.API.error(this.TAG, "parseConfig failed with", config);
            return false;
        }
        this.widget.updateViews(this.styleProperties);
        var topLevelContainer = container || this.widget.getView();
        topLevelContainer.applyProperties(config);
        return config;
    },

    addRule: function (publicIdentifier, target) {
        /**
        * @method addRule
        * Add a rule to the rules set;
        * @param {string} publicIdentifier The id use to access an internal style property in the module
        * @param {Mixed} target The targeted property in the widget or a  process/function that
        *   would rather handle the property value into some special treatment instead of blindy bind
        *   it to a targetted identifier.
        * @return {LibWidget} This instance of libWidget
        * */
        //Ti.API.debug(this.TAG, "Adding rule to the set", publicIdentifier, target);
        if (!_.has(this.rules, publicIdentifier)) { this.rules[publicIdentifier] = []; }
        this.rules[publicIdentifier] = this.rules[publicIdentifier].concat(_.flatten([target]));
        return this.getAccessibleFunctions();
    },

    addRules: function (rules) {
         /**
         * @method addRules
         * Used to define several rules in one call. See addRule for more details.
         * @param {Object} rules All rules to define. Keys will be used as public identifier, and
         *  values as targets.
         * @return {LibWidget} This instance of libWidget
         */
        _.each(rules, function (target, id) { this.addRule(id, target); }, this);
        return this.getAccessibleFunctions();
    },

    setProperty: function (id, propertyChain, value) {
        /**
         * @method setProperty
         * Add a new style property to the list.
         * @param {string} id The property id, as referenced in the View.
         * @param {string} propertyChain The property that have to be set. Might be a nested
         *  property such as my.nested.property
         * @param {string|Number|Object} value The value that has to be set.
         * @return {LibWidget} This instance of libWidget
         */

        /* Properties might be simple such as 'backgroundColor', or more complex such as
         * 'font.fontFamily'; In both case, we have to re-build a corresponding object */
        if (!_.has(this.styleProperties, id)) { this.styleProperties[id] = {}; }

        propertyChain = propertyChain.split(".");
        var lastProperty = propertyChain.pop(),
            currentRootObject = this.styleProperties[id];

        _.each(propertyChain, function (property) {
            currentRootObject = (currentRootObject[property] = {});
        });

        /* Finally, set the value as the last element of our tree */
        currentRootObject[lastProperty] = value;
        return this.getAccessibleFunctions();
    },

    getAccessibleFunctions: function () {
        /**
         * @method getAccessibleFunctions
         * Use to build an object of accessible functions from the outside.
         * @return {Object} An object of all public/accessible functions
         * */
        if (!this.accessibleFunctions) {
            /* Select all functions */
            var _exports = _.omit(this.__proto__, 'getAccessibleFunctions', '_applyRule'),
                self = this;

            /* Then, wrap them into callable ... callers */
            this.accessibleFunctions = _.object(_.map(_exports, function (accessibleFunction, name) {
                return [name, function() { return accessibleFunction.apply(self, arguments); }];
            }));
        }
        return this.accessibleFunctions;
    },

    reset: function () {
        this.styleProperties = {};
        this.rules = {};
    }
};

/* Do the exports */
_.extend(exports, {
    init: function () {
        /**
        * @static
        * @method init
        * Initialize the library. 
        */
        /* Override Alloy methods to allow the use of 'construct' method */
        (function (_createWidget, _createController) {
            Alloy.createWidget = function (id, name, args) {
                var W = _createWidget(id, name, args);
                if (_.isFunction(W.construct)) W.construct.call(W, args);
                return W;
            };
            Alloy.createController = function (name, args) {
                var C = _createController(name, args);
                if (_.isFunction(C.construct)) C.construct.call(C, args);
                return C; 
            };
        })(Alloy.createWidget, Alloy.createController);
    },

    newBuilder: function (widgetInstance) {
        /**
        * @static
        * @method newBuilder 
        * Instantiate the a style builder.
        * @param {appcelerator: Alloy.Controller} widget An instance to the related widget.
        * @return {LibWidget} An instance of the library
        */
        var libWidgetInstance = new LibWidget(widgetInstance);
        return libWidgetInstance.getAccessibleFunctions();
    }
});
