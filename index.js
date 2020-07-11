"use strict";

const animazing = (function(){
    const app = {
        animate: ((selector) => {
            let text = document.querySelectorAll(selector);
            text.forEach((node) => {
                // load options
                app.loadOpts(node);

                // make it visible
                app.makeVisible(node);

                // animate
                app.doAnim(node);
            });
        }),
        loadOpts: ((node) => {
            node.animazing = {};
            node.animazing.doAnim = 0 === parseInt(node.dataset.full) ? app.animParts : app.animFull;
            node.animazing.delay = parseInt(node.dataset.delay) || 0;
            node.animazing.clean = parseInt(node.dataset.clean) || 0;
            node.animazing.retain = parseInt(node.dataset.retain) || 0;
            node.animazing.duration = parseInt(node.dataset.duration) || 0;
            node.animazing.iterationStart = parseFloat(node.dataset.iterationstart) || 0.0;
            node.animazing.iterations = node.dataset.iterations == -1 ? Infinity : parseInt(node.dataset.iterations) || 1;
            node.animazing.direction = node.dataset.direction || 'normal';
            node.animazing.animationType = node.dataset.animation || 'fade';
            node.animazing.fontSize = parseFloat(window.getComputedStyle(node, null).getPropertyValue('font-size')) || 24;
            node.animazing.animations = node.dataset.animations || false;
            node.animazing.currentDelay = 0;
        }),
        makeEmpty: ((node) => {
            node.textContent = '';
        }),
        makeVisible: ((node) => {
            node.style.visibility = 'visible';
        }),
        props: ((node) => {
            let props = {
                duration: node.animazing.duration,
                fill: 'forwards',
                delay: node.animazing.currentDelay,
                iterationStart: node.animazing.iterationStart,
                iterations: node.animazing.iterations,
                direction: node.animazing.direction
            };
            return props;
        }),
        cleanUp: ((node) => {
            // should properties be retained?
            // if so move them to parent
            if (0 !== node.animazing.retain) {
                Object.assign(node.style, node.animazing.animObj);
            }

            let spans = node.querySelectorAll('span.an');
            spans.forEach((span) => {
                node.append(span.innerText);
                span.remove();
            });
        }),
        animFull: ((node) => {
            node.animate(node.animazing.animObj, app.props(node));
            node.animazing.currentDelay = node.animazing.currentDelay + node.animazing.delay;
        }),
        animParts: ((node) => {
            node.lastElementCb = ((current, last) => {
                if (current === last - 1) {
                    app.cleanUp(node);
                }
            });
            
            let letters = node.textContent.split('');

            // clear node
            app.makeEmpty(node);

            // is opacity set?
            let opacity = 1;
            if (undefined !== node.animazing.animObj.opacity) {
                if (1 == node.animazing.animObj.opacity) {
                    opacity = 0;
                }
            }

            let anim;
            letters.forEach((letter, index) => {
                let span = document.createElement('span');
                span.innerText = letter;
                span.classList.add('an');
                span.style.opacity = opacity;
                node.append(span);

                // if last node finished
                anim = span.animate(node.animazing.animObj, app.props(node));
                if (1 === node.animazing.clean) {
                    anim.onfinish = (() => {
                        node.lastElementCb(index, letters.length)
                    });
                }

                node.animazing.currentDelay = node.animazing.currentDelay + node.animazing.delay;
            });
        }),
        isEmptyObj: ((obj) => {
            for(let i in obj) return false;
            return true;
        }),
        str2Obj: ((str) => {
            return str
            .split(',')
            .map(keyVal => {
                return keyVal
                    .split(':')
                    .map(s => s.trim())
                })
                .reduce((accumulator, currentValue) => {
                accumulator[currentValue[0]] = currentValue[1]
                    return accumulator
            }, {})
        }),
        doAnim: ((node) => {
            let animObj = {};
            
            if (false !== node.animazing.animations) {                
                let compObj = app.str2Obj(node.animazing.animations);
                Object.assign(animObj, compObj);
            }

            if (! app.isEmptyObj(animObj)) {
                node.animazing.animObj = animObj;
                node.animazing.doAnim(node);
            }
        }),
    }

    module.exports = app;
})();
