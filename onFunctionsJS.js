/**
 * Create NodeList.prototype.on prototype
 * Add event, according to the parameters
 * @param  {string} types           [required]
 * @param  {string} css selectors   [optional]
 * @param  {function} func          [optional]
 */
!NodeList.prototype.on ? NodeList.prototype.on = function(types, selectors, func) {
    (function(doc) {
        matches = doc.matchesSelector || doc.webkitMatchesSelector || doc.mozMatchesSelector || doc.oMatchesSelector || doc.msMatchesSelector;
    })(document.documentElement);
    types = types ? types.split(',').map(function(s) {
        return s.trim()
    }) : [];
    if (typeof selectors !== 'string') {
        func = selectors;
        selectors = [];
    } else {
        selectors = selectors.split(',').map(function(s) {
            return s.trim()
        });
    }

    function onFunction(sel, tp, fn, act) {
        this.active = act;
        this.selector = sel;
        this.type = tp;
        this.func = fn;
        this.addEvent = function(item) {
            item.addEventListener(this.type, this.func, false);
        };
        this.removeEvent = function(item) {
            item.removeEventListener(this.type, this.func, false);
        };
    }
    [].forEach.call(this, function(root) {
        root.DOMNodeChanged = function(e) {
            var root = this;
            [].forEach.call(root.onFunctions, function(func) {
                if (matches.call(e.target, func.selector)) {
                    if (e.type == 'DOMNodeInserted') {
                        var onFunc = new onFunction(func.selector, func.type, func.func, true);
                        onFunc.addEvent(e.target);
                        root.onFunctions.push(onFunc);
                    } else {
                        func.active = false;
                        func.removeEvent(e.target);
                    }
                }
            });
        };
        root.onFunctions = root.onFunctions ? root.onFunctions : [];
        if (!selectors.length) {
            types.forEach(function(type) {
                var onFunc = new onFunction(null, type, func, true);
                onFunc.addEvent(root);
                root.onFunctions.push(onFunc);
            });
        } else {
            root.addEventListener('DOMNodeRemoved', root.DOMNodeChanged, true);
            root.addEventListener('DOMNodeInserted', root.DOMNodeChanged, true);
            types.forEach(function(type) {
                selectors.forEach(function(selector) {
                    var onFunc = new onFunction(selector, type, func, true);
                    root.onFunctions.push(onFunc);
                });
            });
            selectors.forEach(function(selector) {
                [].forEach.call(root.querySelectorAll(selector), function(el) {
                    root.onFunctions.forEach(function(func) {
                        func.addEvent(el);
                    });
                });
            });
        }
    });
} : console.error('NodeList.prototype.on already defined!');
/**
 * NodeList.prototype.off prototype
 * Remove event, according to the parameters
 * @param  {string} types            [optional]
 * @param  {string} css selectors    [optional]
 */
!NodeList.prototype.off ? NodeList.prototype.off = function(types, selectors) {
    types = types ? types.split(',').map(function(s) {
        return s.trim()
    }) : [];
    if (typeof selectors !== 'string') {
        selectors = [];
    } else {
        selectors = selectors.split(',').map(function(s) {
            return s.trim()
        });
    }
    [].forEach.call(this, function(root) {
        var deleteFunc = false,
            destroy = false;
        if (root.onFunctions) {
            if (!selectors.length) {
                deleteFunc = true;
                if (!types.length) {
                    destroy = true;
                    root.removeEventListener('DOMNodeRemoved', root.DOMNodeChanged, false);
                    root.removeEventListener('DOMNodeInserted', root.DOMNodeChanged, false);
                }
                root.onFunctions.filter(function(func) {
                    return func.selector === null && (types.indexOf(func.type) !== -1 || !types.length)
                }).forEach(function(func) {
                    func.removeEvent(root);
                    root.onFunctions.splice(root.onFunctions.indexOf(func), 1);
                    func = null;
                });
            }
            if (!selectors.length) {
                selectors = Array.from(new Set(root.onFunctions.map(function(func) {
                    return func.selector;
                })));
            }
            if (!types.length) {
                types = Array.from(new Set(root.onFunctions.map(function(func) {
                    return func.type;
                })));
            }
            root.onFunctions.filter(function(func) {
                return types.indexOf(func.type) !== -1 && selectors.indexOf(func.selector) !== -1
            }).forEach(function(func) {
                [].forEach.call(root.querySelectorAll(func.selector), function(el) {
                    func.active = false;
                    func.removeEvent(el);
                    if (deleteFunc) {
                        root.onFunctions.splice(root.onFunctions.indexOf(func), 1);
                        func = null;
                    }
                });
            });
            if (destroy) {
                root.onFunctions = null;
                delete root.onFunctions;
                if(root.DOMContentChanged){
                    root.DOMContentChanged = null;
                    delete root.DOMContentChanged;
                }
            }
        };
    });
} : console.error('NodeList.prototype.off already defined!');
/**
 * Create HTMLElement.prototype.on prototype
 * Add event, according to the parameters
 * @param  {string} types           [required]
 * @param  {string} css selectors   [optional]
 * @param  {function} func          [optional]
 */
!HTMLElement.prototype.on ? HTMLElement.prototype.on = function(types, selectors, func) {
    var id = 'data-wrapp-'.concat(Math.random().toString(16).substring(2));
    this.setAttribute(id, true);
    var wrapped = document.querySelectorAll('[' + id + ']');
    wrapped.on(types, selectors, func);
    this.removeAttribute(id);
} : console.error('HTMLElement.prototype.on already defined!');
/**
 * HTMLElement.prototype.off prototype
 * Remove event, according to the parameters
 * @param  {string} types            [optional]
 * @param  {string} css selectors    [optional]
 */
!HTMLElement.prototype.off ? HTMLElement.prototype.off = function(types, selectors) {
    var id = 'data-'.concat(Math.random().toString(16).substring(2));
    this.setAttribute(id, true);
    var wrapped = document.querySelectorAll('[' + id + ']');
    wrapped.off(types, selectors);
    this.removeAttribute(id);
} : console.error('HTMLElement.prototype.off already defined!');