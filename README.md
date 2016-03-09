onFunctionsJS
=============

Javascript jQuery like (NodeList and HTMLElement) on/off function

* [Homepage] - Home page, demonstration

<p align="center">
    <img src="/icon.png">
</p>

Version
----

1.0.6

    - Some minor bug fixed

Version
----

1.0.0

Required HTML & Javascript example
--------------

```sh
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>On/Off functions</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui">
        <link href="style.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div class="container">
            <div class="left-side">
                <button>Button</button>
                <span>Span</span>
                <div class="img-div">
                    <img src="js.png">
                </div>
            </div>
            <div class="center"></div>
            <div class="right-side">
                <button>Button</button>
                <span>Span</span>
                <div class="img-div">
                    <img src="js.png">
                </div>
            </div>
        </div>
        <script src="onFunctionsJS.js" type="text/javascript"></script>
        <script type="text/javascript">
        var rightSide = document.querySelector('.right-side');
        /**
         * Description: Attach an event handler function for one or more events to the selected elements.
         * @param  {string} One or more comma separated event types                 [required]
         * @param  {string} css selector string to filter the descendants 
         *         of the selected elements that trigger the event. 
         *         If the selector is null or omitted, the event is always 
         *         triggered when it reaches the selected element.                  [optional]
         * @param  {function} A function to execute when the event is triggered.    [required]
         */ 
        /** Examples */
        rightSide.on('mouseenter, mouseleave', 'button, span, .img-div', function(e) {
            e.stopPropagation();
            if (e.type == 'mouseleave') {
                this.style.background = '';
            } else {
                this.style.background = 'green';
            }
        });
         document.querySelectorAll('.container').on('click', 'button', function (e) {
            console.log(this);
         });
        /**
         * Description: Remove an event handler.
         * @param  {string} One or more comma separated event types                 [optional]
         * @param  {string} A selector which should match the one originally 
         *         passed to .on() when attaching event handlers.                   [optional]
         */ 
        /** completely destroy */
        rightSide.off();
        /** remove click an event handler from buttons */
        document.querySelectorAll('.container').off('click', 'button');
        /** remove all click event handler */
        document.querySelectorAll('.container').off('click');
        </script>
    </body>
</html>
```

License
----

MIT

Author: Tóth András
---
http://atandrastoth.co.uk/

2015-06-10

[Homepage]:http://atandrastoth.co.uk/main/pages/plugins/onFunctionsJS/
[onFunctionsJS]:https://andrastoth.github.io/onFunctionsJS/
