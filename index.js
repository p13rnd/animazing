"use strict";

const animazing = (function(){
    const APP = {
        animate: ((selector, opts) => {
            const NODE = document.querySelectorAll(selector);
            NODE.forEach((node) => {
                // load options
                APP.loadOpts(node, opts);

                // make it visible
                APP.makeVisible(node);

                // animate
                APP.doAnim(node);
            });
        }),
        loadOpts: ((node, opts) => {
            node.animazing = {};
            if (APP.isEmptyObj(opts)) {
                APP.loadDataAttr(node);
            } else {
                opts = APP.initDefaults(opts);
                Object.assign(node.animazing, opts);
            }
            node.animazing.currentDelay = 0;
        }),
        initDefaults: ((opts) => {
            if (isNaN(parseInt(opts.fullAnimation))) {
                opts.fullAnimation = APP.animParts;
            } else {
                opts.fullAnimation = 0 === parseInt(opts.fullAnimation) ? APP.animParts : APP.animFull;
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
            node.animazing.fullAnimation = 0 === parseInt(node.dataset.full) ? APP.animParts : APP.animFull;
            node.animazing.delay = parseInt(node.dataset.delay) || 0;
            node.animazing.clean = parseInt(node.dataset.clean) || 0;
            node.animazing.retain = parseInt(node.dataset.retain) || 0;
            node.animazing.duration = parseInt(node.dataset.duration) || 0;
            node.animazing.iterationStart = parseFloat(node.dataset.iterationstart) || 0.0;
            node.animazing.iterations = -1 === parseInt(node.dataset.iterations) ? Infinity : parseInt(node.dataset.iterations) || 1;
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
            const PROPS = {
                duration: node.animazing.duration,
                fill: 'forwards',
                delay: node.animazing.currentDelay,
                iterationStart: node.animazing.iterationStart,
                iterations: node.animazing.iterations,
                direction: node.animazing.direction
            };
            return PROPS;
        }),
        cleanUp: ((node) => {
            // should properties be retained?
            // if so move them to parent
            if (0 !== node.animazing.retain) {
                Object.assign(node.style, node.animazing.animObj);
            }

            let text = '';
            Array.from(node.childNodes).forEach((child, index) => {
                // retain links
                if('A' === child.tagName) {
                    const aSpans = child.querySelectorAll('span');
                    aSpans.forEach((s) => {
                        child.append(s.innerText);
                        s.remove();
                    });

                    if (0 !== node.animazing.retain) {
                        Object.assign(child.style, node.animazing.animObj);
                    }

                    text += child.outerHTML;
                } else {
                    text += child.innerText;
                    child.remove();
                }
            });
            node.innerHTML = text;
        }),
        animFull: ((node) => {
            node.animate(node.animazing.animObj, APP.props(node));
            node.animazing.currentDelay = node.animazing.currentDelay + node.animazing.delay;
        }),
        animParts: ((node) => {
            node.lastElementCb = ((current, last) => {
                if (current === last - 1) {
                    APP.cleanUp(node);
                }
            });

            const ANCHOR = node.querySelector('a');
            if (null !== ANCHOR) {
                node.textContent = node.textContent.replace(ANCHOR.innerText, '*');
            }
            
            let letters = node.textContent.split('');

            // clear node
            APP.makeEmpty(node);

            // is opacity set? lets flip it
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
                    a.href = ANCHOR.href;
                    a.target = ANCHOR.target;
                    a.style.textDecoration = 'none';

                    const ANCHORLETTERS = ANCHOR.innerText.split('');
                    ANCHORLETTERS.forEach((aLetter) => {
                        const SPAN = document.createElement('span');
                        SPAN.innerText = aLetter;
                        SPAN.style.opacity = opacity;
                        anim = SPAN.animate(node.animazing.animObj, APP.props(node));
                        node.animazing.currentDelay = node.animazing.currentDelay + node.animazing.delay;
                        a.append(SPAN);
                    });

                    node.append(a);
                    return;
                }

                const SPAN = document.createElement('span');
                SPAN.innerText = letter;
                SPAN.style.opacity = opacity;
                node.append(SPAN);

                // if last node finished
                anim = SPAN.animate(node.animazing.animObj, APP.props(node));
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
                if (false === node.animazing.animations instanceof Object) {
                    animObj = APP.str2Obj(node.animazing.animations);
                } else {
                    animObj = node.animazing.animations;
                }
            }

            if (! APP.isEmptyObj(animObj)) {
                node.animazing.animObj = animObj;
                node.animazing.fullAnimation(node);
            }
        }),
    }

    module.exports = APP;
})();
