/**
 * @class LibWidget
 * The library used to easily configure widgets.
 */
var LibWidget = function (widget) {
    this.TAG = "libWidget";
    this.widget = widget;
    this.reset();
};

var Rule = function (id, options) {
    if (!id) throw(errTag + 'Missing id');

    this.errTag = 'RuleError: ';
    this.id = id;
    this.targets = [];
    this.addOptions(options || {});
};

_.extend(Rule.prototype, {
    addTargets: function (targets) {
        if (!targets) throw(this.errTag + 'Missing or invalid target(s)');
        Array.prototype.push.apply(this.targets, _.flatten([targets]));
    },

    addOptions: function (options) {
        if (options && !_.isObject(options)) throw(this.errTag + 'Invalid options');
        _.extend(this.options, options);
    },

    apply: function (styleValue, builder) {
        /* Browse each target of the rule to build corresponding property */
        _.each(this.targets, function (target) {
            /* Basic case, target is a string which represent the corresponding property to set */
            if (_.isString(target)) {
                var elementId = target.match(/^(#[^\.]+)\.?/)[1];
                if (_.isObject(styleValue)) {
                    /* First case, the input is an object, so only the id considered */
                    _.each(styleValue, function (propertyValue, propertyName) {
                        builder.setProperty(elementId, propertyName, propertyValue);
                    });
                } else {
                    /* The input is a value that should be assigned to the given property under the
                     * given element id */
                    var propertyChain = target.split(elementId)[1].substr(1);
                    builder.setProperty(elementId, propertyChain, styleValue);
                }
            } else if (_.isFunction(target)) {
                /* If the target is a function, then, just execute the function; The function should be
                 * in charge of declaring properties if any. */
                target(styleValue);
            } else {
                throw(this.errTag + 'Unable to apply rule "' + this.id + '"');
            }
        }, this);
        return true;
    },

    accessorName: function () {
        return (function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        })(this.id);
    },

    accessors: function (target, widget) {
        var elementId = target.match(/^(#[^\.]+)\.?/)[1],
            propertyChain = target.split(elementId)[1].substr(1).split("."),
            lastProperty = propertyChain.pop(),
            targetObject = widget[elementId.substr(1)];
        /* Crawl property chain to get targeted alloy object (if necessary) */
        _.each(propertyChain, function (property) {
            targetObject = (targetObject[property] = {});
        });
        widget["get"+this.accessorName()] = function() { return targetObject[lastProperty]; };
        widget["set"+this.accessorName()] = function(value) { widget[elementId.substr(1)][lastProperty] = value; };
    }
});

_.extend(LibWidget.prototype, {
    /* Apply a rule if it exists. Otherwise, just return false. */
    _applyRule: function (key, value) {
        if (!_.has(this.rules, key)) { return false; }
        return this.rules[key].apply(value, this);
    },

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
    build: function (config, container) {
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

    /**
    * @method addRule
    * Add a rule to the rules set;
    * @param {string} publicIdentifier The id use to access an internal style property in the module
    * @param {string|Array|Function} targets The targeted property/properties in the widget
    * or a function that would rather handle the property value into some special treatment instead
    * of blindy bind it to a targetted identifier.
    * @return {LibWidget} This instance of libWidget
    * */
    addRule: function (publicIdentifier, targets) {
        if (!_.has(this.rules, publicIdentifier)) {
            var rule = new Rule(publicIdentifier);
            this.rules[publicIdentifier] = rule;
            /* If target is a string Accessors will be created. */
            if(typeof targets === "string") {
                rule.accessors(targets, this.widget);
            }
        }
        this.rules[publicIdentifier].addTargets(targets);
        return this;
    },

    /**
    * @method addRules
    * Used to define several rules in one call. See addRule for more details.
    * @param {Object} rules All rules to define. Keys will be used as public identifier, and
    *  values as targets.
    * @return {LibWidget} This instance of libWidget
    */
    addRules: function (rules) {
        _.each(rules, function (target, id) { this.addRule(id, target); }, this);
        return this;
    },

    /**
    * @method setProperty
    * Add a new style property to the list.
    * @param {string} id The property id, as referenced in the View.
    * @param {string} propertyChain The property that have to be set. Might be a nested
    *  property such as my.nested.property
    * @param {string|Number|Object} value The value that has to be set.
    * @return {LibWidget} This instance of libWidget
    */
    setProperty: function (id, propertyChain, value) {
        /* Properties might be simple such as 'backgroundColor', or more complex such as
         * 'font.fontFamily'; In both case, we have to re-build a corresponding object */
        if (!_.has(this.styleProperties, id)) { this.styleProperties[id] = {}; }

        propertyChain = propertyChain.split(".");
        var lastProperty = propertyChain.pop(),
            currentRootObject = this.styleProperties[id];
        /* Crawl property tree */
        _.each(propertyChain, function (property) {
            currentRootObject = (currentRootObject[property] = {});
        });
        /* Finally, set the value as the last element of our tree */
        currentRootObject[lastProperty] = value;
        return this;
    },

    /** @method reset
     * Reset the instance as if it was a new instance.
     */
    reset: function () {
        this.styleProperties = {};
        this.rules = {};
    }
});

/**
* @static
* @method init
* Initialize the library.
*/
/* Override Alloy methods to allow the use of 'construct' method */
exports.init = function () {
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
};

/**
* @static
* @method newBuilder
* Instantiate the a style builder.
* @param {appcelerator: Alloy.Controller} widget An instance to the related widget.
* @return {LibWidget} An instance of the library
*/
exports.newBuilder = function (widgetInstance) {
    return new LibWidget(widgetInstance);
};
