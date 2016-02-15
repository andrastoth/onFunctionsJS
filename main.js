/**
 * onFunctions 1.0.0 javascript jQuery like on/of function
 * Author: Tóth András
 * Web: http://atandrastoth.co.uk
 * email: atandrastoth@gmail.com
 * Licensed under the MIT license
 */
var rightSide = document.querySelector('.right-side');
var leftSide = document.querySelector('.left-side');
rightSide.on('mouseenter, mouseleave', 'button, span, .img-div', function(e) {
    e.stopPropagation();
    if (e.type == 'mouseleave') {
        this.style.background = '';
    } else {
        this.style.background = 'green';
    }
});
rightSide.on('click', 'button, span, .img-div', function(e) {
    e.stopPropagation();
    leftSide.appendChild(this);
});
leftSide.on('mouseenter, mouseleave', 'button, span, .img-div', function(e) {
    e.stopPropagation();
    if (e.type == 'mouseleave') {
        this.style.background = '';
    } else {
        this.style.background = 'red';
    }
});
leftSide.on('click', 'button, span, .img-div', function(e) {
    e.stopPropagation();
    rightSide.appendChild(this);
});
var center = document.querySelector('.center');
var centerHandler = document.querySelector('.center-handler');
centerHandler.on('click', 'button:nth-of-type(1)', function() {
    if (!leftSide.children.length && !rightSide.children.length) {
        var len = center.children.length;
        for (var i = 0; i < len; i++) {
            if (i % 2 == 0) rightSide.appendChild(center.children[0]);
            else leftSide.appendChild(center.children[0]);
            this.innerText = 'Pull top items to neutral area';
        };
    } else {
        if (leftSide.children.length) center.appendChild(leftSide.children[0]);
        if (rightSide.children.length) center.appendChild(rightSide.children[0]);
    }
    if (!leftSide.children.length && !rightSide.children.length) this.innerText = 'Divide the items from the containers';
});

function leftOnOff() {
    if (leftSide.onFunctions.filter(function(f) {
            return f.type == 'mouseleave' && f.selector == '.img-div'
        }).length) {
        leftSide.off('mouseleave', '.img-div');
    } else {
        leftSide.on('mouseleave', '.img-div', function(e) {
            e.stopPropagation();
            this.style.background = '';
        });
    }
}

function rightOnOff() {
    if (rightSide.onFunctions.filter(function(f) {
            return f.type == 'mouseleave' && f.selector == '.img-div'
        }).length) {
        rightSide.off('mouseleave', '.img-div');
    } else {
        rightSide.on('mouseleave', '.img-div', function(e) {
            e.stopPropagation();
            this.style.background = '';
        });
    }
}