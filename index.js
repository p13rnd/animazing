"use strict";

const animazing = (function(){
    const app = {
        animate: ((selector, opts) => {
            let text = document.querySelectorAll(selector);
            text.forEach((node) => {
                // load options
                app.loadOpts(node, opts);

                // make it visible
                app.makeVisible(node);

                // animate
                app.doAnim(node);
            });
        }),
        loadOpts: ((node, opts) => {
            node.animazing = {};
            if (app.isEmptyObj(opts)) {
                app.loadDataAttr(node);
            } else {
                opts = app.initDefaults(opts);
                Object.assign(node.animazing, opts);
            }
            node.animazing.currentDelay = 0;
        }),
        initDefaults: ((opts) => {
            if (isNaN(parseInt(opts.fullAnimation))) {
                opts.fullAnimation = app.animParts;
            } else {
                opts.fullAnimation = 0 === parseInt(opts.fullAnimation) ? app.animParts : app.animFull;
            }
            
            opts.delay = parseInt(opts.delay) || 0;
            opts.clean = parseInt(opts.clean) || 0;
            opts.retain = parseInt(opts.retain) || 0;
            opts.duration = parseInt(opts.duration) || 1000;
            opts.iterationStart = parseFloat(opts.iterationStart) || 0.0;
            opts.iterations = (-1 === parseInt(opts.iterations) ? Infinity : parseInt(opts.iterations)) || 1;
            opts.direction = opts.direction || 'normal';
            opts.animations = opts.animations || false;
            return opts;
        }),
        loadDataAttr: ((node) => {
            node.animazing.fullAnimation = 0 === parseInt(node.dataset.full) ? app.animParts : app.animFull;
            node.animazing.delay = parseInt(node.dataset.delay) || 0;
            node.animazing.clean = parseInt(node.dataset.clean) || 0;
            node.animazing.retain = parseInt(node.dataset.retain) || 0;
            node.animazing.duration = parseInt(node.dataset.duration) || 0;
            node.animazing.iterationStart = parseFloat(node.dataset.iterationstart) || 0.0;
            node.animazing.iterations = node.dataset.iterations == -1 ? Infinity : parseInt(node.dataset.iterations) || 1;
            node.animazing.direction = node.dataset.direction || 'normal';
            node.animazing.animations = node.dataset.animations || false;
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

            // TODO: retain links
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

            let anchor = node.querySelector('a');
            if (null !== anchor) {
                node.textContent = node.textContent.replace(anchor.innerText, '*');
            }
            
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
                // anchor found
                if ('*' === letter) {
                    let a = document.createElement('a');
                    a.href = anchor.href;
                    a.target = anchor.target;
                    a.style.textDecoration = 'none';

                    let anchorLetters = anchor.innerText.split('');
                    anchorLetters.forEach((aLetter) => {
                        let span = document.createElement('span');
                        span.innerText = aLetter;
                        span.classList.add('an');
                        span.style.opacity = opacity;
                        anim = span.animate(node.animazing.animObj, app.props(node));
                        node.animazing.currentDelay = node.animazing.currentDelay + node.animazing.delay;
                        a.append(span);
                    });

                    node.append(a);
                    return;
                }

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
                let compObj;
                if (false === node.animazing.animations instanceof Object) {
                    compObj = app.str2Obj(node.animazing.animations);
                } else {
                    compObj = node.animazing.animations;
                }

                Object.assign(animObj, compObj);
            }

            if (! app.isEmptyObj(animObj)) {
                node.animazing.animObj = animObj;
                node.animazing.fullAnimation(node);
            }
        }),
    }

    module.exports = app;
})();
