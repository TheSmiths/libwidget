# LibWidget
A small framework to create and customize Alloy widgets from controller.

## How to install

Copy the `libWidget.js` inside your **lib** folder; then in your `app/alloy.js`, just require the
library as follow :

`var libWidget = require("libWidget");`

Then, every widget or component that is also requesting the library will work.

## How it works
In the widget's controller, you can declare rules describing how to dispatch *TSS* properties from
controller over widget's views. 
Rules define in fact an interface usable from inside a `.tss` file and allow you to manipulate
widget's properties through this interface. 

Libwidget also allows you to declare a `construct` method inside your controller. Then, when a
controller is instantiated by Alloy, the `construct` method will be automaticcaly called. It is a
good way to initialize your widget properties such as rules. 

### Exemple, On widget side
For example, inside `myWidgetController.js` :

```javascript
var libWidget = new require("libWidget").newHandler(this);

_.extend(this, {
    construct: function (config) {
        libWidget.addRules({
            "accessor1" : "#elem.internalProperty", 
            "accessor2" : ["#elem2.aProperty", "#elem3.anotherOne"],
            "accessor3" : function(value) {
                $.elem.setSomething(value);
                libWidget.addProperty("elem2", "internalProperty2", value == "condition" ?
                "thisText" : "orThisOne");
            },
            "accessor4" : "#elem4"
        });
        $.container.applyProperties(libWidget.parseAndApplyConfig(config));
    },

    ... // Some code 

});
```
### Exemple, On app side
According to the fact that the app is using **myWidget** based on the controller above. Inside the
app, `myView.xml` :

```xml
<Alloy>
    <Window>
        <Widget src="myWidget" id="myWidget" />
    </Window>
</Alloy>
```

And, in a corresponding `.tss` file of the app : 

```css
    "#myWidget": {
        accessor1: 14,
        accessor2: "red",
        accessor3: "notCondition",
        accessor4: {
            nested1: 42,
            nested2: {
                overNested: 1337,
                overNested2: "banana"
            }   
        }
    }
```
