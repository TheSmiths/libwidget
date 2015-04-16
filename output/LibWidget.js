Ext.data.JsonP.LibWidget({"tagname":"class","name":"LibWidget","autodetected":{},"files":[{"filename":"libWidget.js","href":null}],"members":[{"name":"addRule","tagname":"method","owner":"LibWidget","id":"method-addRule","meta":{}},{"name":"addRules","tagname":"method","owner":"LibWidget","id":"method-addRules","meta":{}},{"name":"build","tagname":"method","owner":"LibWidget","id":"method-build","meta":{}},{"name":"getAccessibleFunctions","tagname":"method","owner":"LibWidget","id":"method-getAccessibleFunctions","meta":{}},{"name":"setProperty","tagname":"method","owner":"LibWidget","id":"method-setProperty","meta":{}},{"name":"init","tagname":"method","owner":"LibWidget","id":"static-method-init","meta":{"static":true}},{"name":"newBuilder","tagname":"method","owner":"LibWidget","id":"static-method-newBuilder","meta":{"static":true}}],"alternateClassNames":[],"aliases":{},"id":"class-LibWidget","classIcon":"icon-class","superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><div class='doc-contents'><p>The library used to easily configure widgets.</p>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance methods</h3><div id='method-addRule' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LibWidget'>LibWidget</span><br/></div><a href='#!/api/LibWidget-method-addRule' class='name expandable'>addRule</a>( <span class='pre'>publicIdentifier, target</span> ) : <a href=\"#!/api/LibWidget\" rel=\"LibWidget\" class=\"docClass\">LibWidget</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Add a rule to the rules set; ...</div><div class='long'><p>Add a rule to the rules set;</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>publicIdentifier</span> : string<div class='sub-desc'><p>The id use to access an internal style property in the module</p>\n</div></li><li><span class='pre'>target</span> : Mixed<div class='sub-desc'><p>The targeted property in the widget or a  process/function that\n  would rather handle the property value into some special treatment instead of blindy bind\n  it to a targetted identifier.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/LibWidget\" rel=\"LibWidget\" class=\"docClass\">LibWidget</a></span><div class='sub-desc'><p>This instance of libWidget</p>\n</div></li></ul></div></div></div><div id='method-addRules' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LibWidget'>LibWidget</span><br/></div><a href='#!/api/LibWidget-method-addRules' class='name expandable'>addRules</a>( <span class='pre'>rules</span> ) : <a href=\"#!/api/LibWidget\" rel=\"LibWidget\" class=\"docClass\">LibWidget</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Used to define several rules in one call. ...</div><div class='long'><p>Used to define several rules in one call. See addRule for more details.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>rules</span> : Object<div class='sub-desc'><p>All rules to define. Keys will be used as public identifier, and\n values as targets.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/LibWidget\" rel=\"LibWidget\" class=\"docClass\">LibWidget</a></span><div class='sub-desc'><p>This instance of libWidget</p>\n</div></li></ul></div></div></div><div id='method-build' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LibWidget'>LibWidget</span><br/></div><a href='#!/api/LibWidget-method-build' class='name expandable'>build</a>( <span class='pre'>config, [container]</span> ) : Object|boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Execute rules within the config context. ...</div><div class='long'><p>Execute rules within the config context.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>An object that describe the user config for the widget as\ndescribed in a .tss file.</p>\n</div></li><li><span class='pre'>container</span> : <a target=\"_blank\" href=\"http://docs.appcelerator.com/titanium/3.0/#!/api/Titanium.UI.View\">Titanium.UI.View</a> (optional)<div class='sub-desc'><p>The top level container to which\napply the rules. If not supplied, the top level view will be used.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object|boolean</span><div class='sub-desc'><p>The configuration minus keys handled as rules or false in case\nof error.</p>\n</div></li></ul></div></div></div><div id='method-getAccessibleFunctions' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LibWidget'>LibWidget</span><br/></div><a href='#!/api/LibWidget-method-getAccessibleFunctions' class='name expandable'>getAccessibleFunctions</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Use to build an object of accessible functions from the outside. ...</div><div class='long'><p>Use to build an object of accessible functions from the outside.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>An object of all public/accessible functions</p>\n</div></li></ul></div></div></div><div id='method-setProperty' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LibWidget'>LibWidget</span><br/></div><a href='#!/api/LibWidget-method-setProperty' class='name expandable'>setProperty</a>( <span class='pre'>id, propertyChain, value</span> ) : <a href=\"#!/api/LibWidget\" rel=\"LibWidget\" class=\"docClass\">LibWidget</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Add a new style property to the list. ...</div><div class='long'><p>Add a new style property to the list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : string<div class='sub-desc'><p>The property id, as referenced in the View.</p>\n</div></li><li><span class='pre'>propertyChain</span> : string<div class='sub-desc'><p>The property that have to be set. Might be a nested\n property such as my.nested.property</p>\n</div></li><li><span class='pre'>value</span> : string|Number|Object<div class='sub-desc'><p>The value that has to be set.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/LibWidget\" rel=\"LibWidget\" class=\"docClass\">LibWidget</a></span><div class='sub-desc'><p>This instance of libWidget</p>\n</div></li></ul></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static methods</h3><div id='static-method-init' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LibWidget'>LibWidget</span><br/></div><a href='#!/api/LibWidget-static-method-init' class='name expandable'>init</a>( <span class='pre'></span> )<span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>Initialize the library. ...</div><div class='long'><p>Initialize the library.</p>\n</div></div></div><div id='static-method-newBuilder' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LibWidget'>LibWidget</span><br/></div><a href='#!/api/LibWidget-static-method-newBuilder' class='name expandable'>newBuilder</a>( <span class='pre'>widget</span> ) : <a href=\"#!/api/LibWidget\" rel=\"LibWidget\" class=\"docClass\">LibWidget</a><span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>Instantiate the a style builder. ...</div><div class='long'><p>Instantiate the a style builder.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>widget</span> : <a target=\"_blank\" href=\"http://docs.appcelerator.com/titanium/3.0/#!/api/Alloy.Controller\">Alloy.Controller</a><div class='sub-desc'><p>An instance to the related widget.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/LibWidget\" rel=\"LibWidget\" class=\"docClass\">LibWidget</a></span><div class='sub-desc'><p>An instance of the library</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});