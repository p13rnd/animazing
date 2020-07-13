"use strict";

(function(){
    const APP = {
        animate: ((selector, opts) => {
            const NODE = document.querySelectorAll(selector);
            NODE.forEach((node) => {
                // load options
                APP.loadOpts(node, opts);

                // animate
                APP.doAnim(node);
            });
        }),
        loadOpts: ((node, opts) => {
            node.motio = {};
            if (APP.isEmptyObj(opts)) {
                APP.loadDataAttr(node);
            } else {
                opts = APP.initDefaults(opts);
                Object.assign(node.motio, opts);
            }
            node.motio.fontSize = parseFloat(window.getComputedStyle(node, null).getPropertyValue('font-size')) || 24;
            node.motio.currentDelay = 0;
        }),
        initDefaults: ((opts) => {
            if (isNaN(parseInt(opts.fullAnimation))) {
                opts.fullAnimation = APP.animParts;
            } else {
                opts.fullAnimation = 0 === parseInt(opts.fullAnimation) ? APP.animParts : APP.animFull;
            }
            
            opts.delay = parseInt(opts.delay) || 0;
            opts.clean = parseInt(opts.clean) || 0;
            opts.retain = parseInt(opts.retain) || 0; // TODO
            opts.duration = parseInt(opts.duration) || 1000;
            opts.iterationStart = parseFloat(opts.iterationStart) || 0.0;
            opts.iterations = (-1 === parseInt(opts.iterations) ? Infinity : parseInt(opts.iterations)) || 1;
            opts.direction = opts.direction || 'normal';
            opts.animations = opts.animations || false; // TODO ?
            return opts;
        }),
        loadDataAttr: ((node) => {
            node.motio.fullAnimation = 0 === parseInt(node.dataset.full) ? APP.animParts : APP.animFull;
            node.motio.delay = parseInt(node.dataset.delay) || 0;
            node.motio.clean = parseInt(node.dataset.clean) || 0;
            node.motio.retain = node.dataset.retain || false;
            node.motio.duration = parseInt(node.dataset.duration) || 1000;
            node.motio.iterationStart = parseFloat(node.dataset.iterationstart) || 0.0;
            node.motio.iterations = -1 === parseInt(node.dataset.iterations) ? Infinity : parseInt(node.dataset.iterations) || 1;
            node.motio.direction = node.dataset.direction || 'normal';
            node.motio.animations = node.dataset.animations || false;
        }),
        makeEmpty: ((node) => {
            node.textContent = '';
        }),
        props: ((node) => {
            const PROPS = {
                duration: node.motio.duration,
                fill: 'forwards',
                delay: node.motio.currentDelay,
                iterationStart: node.motio.iterationStart,
                iterations: node.motio.iterations,
                direction: node.motio.direction
            };
            return PROPS;
        }),
        cleanUp: ((node) => {
            // should properties be retained?
            // if so move them to parent
            if (false !== node.motio.retain) {
                // get values to retain
                let retainerObj = {};
                node.motio.retain.split(', ').forEach((retainProp) => {
                    const MATCHES = retainProp.split(/\[(.*?)\]/);
                    const RVALUE = node.motio.animObj[MATCHES[0]][MATCHES[1]];
                    retainerObj[MATCHES[0]] = RVALUE;
                });
                Object.assign(node.style, retainerObj);
            }

            let text = '';
            Array.from(node.childNodes).forEach((child) => {
                // retain links
                if('A' === child.tagName) {
                    const aSpans = child.querySelectorAll('span');
                    aSpans.forEach((s) => {
                        child.append(s.innerText);
                        s.remove();
                    });

                    if (0 !== node.motio.retain) {
                        Object.assign(child.style, node.motio.animObj);
                    }

                    text += child.outerHTML;
                } else {
                    text += 0 === child.innerText.length ? ' ' : child.innerText;
                    child.remove();
                }
            });
            node.innerText = text;
        }),
        animFull: ((node) => {
            node.motio.currentDelay = node.motio.currentDelay + node.motio.delay;
            node.animate(node.motio.animObj, APP.props(node));
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
            if (undefined !== node.motio.animObj.opacity) {
                if (1 == node.motio.animObj.opacity) {
                    opacity = 0;
                }
            }

            let anim;
            letters.forEach((letter, index) => {
                let runAnim = true;

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
                        SPAN.style.display = 'inline-block';
                        SPAN.style.opacity = opacity;

                        // empty space
                        if (' ' === letter) {
                            SPAN.style.width = `${node.motio.fontSize / 4}px`;
                            runAnim = false;
                        }
                        
                        a.append(SPAN);

                        anim = SPAN.animate(node.motio.animObj, APP.props(node));
                        node.motio.currentDelay = node.motio.currentDelay + node.motio.delay;
                    });

                    node.append(a);
                    return;
                }

                const SPAN = document.createElement('span');
                SPAN.innerText = letter;
                SPAN.style.display = 'inline-block';
                SPAN.style.opacity = opacity;
                
                // empty space
                if (' ' === letter) {
                    SPAN.style.width = `${node.motio.fontSize / 4}px`;
                    runAnim = false;
                }

                node.append(SPAN);

                // if last node finished
                if (true === runAnim) {
                    anim = SPAN.animate(node.motio.animObj, APP.props(node));
                }
                
                if (1 === node.motio.clean) {
                    anim.onfinish = (() => {
                        node.lastElementCb(index, letters.length);
                    });
                }

                node.motio.currentDelay = node.motio.currentDelay + node.motio.delay;
            });
        }),
        isEmptyObj: ((obj) => {
            for(let i in obj) return false;
            return true;
        }),
        str2Obj: ((str) => {
            return str
                .split('|')
                .map(keyVal => {
                    return keyVal
                        .split(':')
                        .map(s => s.trim());
                    })
                    .reduce((accumulator, currentValue) => {
                        accumulator[currentValue[0]] = currentValue[1]
                            .replace('[', '')
                            .replace(']', '')
                            .split(', ').map(val => {
                                return val.replace('randomColor', APP.randomColor())
                            });
                    return accumulator;
            }, {})
        }),
        randomColor: (() => {
            return "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
        }),
        doAnim: ((node) => {
            let animObj = {};
            
            if (false !== node.motio.animations) {
                if (false === node.motio.animations instanceof Object) {
                    animObj = APP.str2Obj(node.motio.animations);
                } else {
                    animObj = node.motio.animations;
                }
            }
            
            if (! APP.isEmptyObj(animObj)) {
                animObj = APP.ensureExplicit(animObj, node);
                node.motio.animObj = animObj;
                node.motio.fullAnimation(node);
            }
        }),
        ensureExplicit: ((animObj, node) => {
            // ensure explicit animation until Partial keyframes are supported
            for(let [key, value] of Object.entries(animObj)){
                // only one item in array
                if (1 === value.length) {
                    // get computed style
                    let prop = window.getComputedStyle(node, null).getPropertyValue(key);
                    if (undefined != prop) {
                        animObj[key].unshift(prop);
                    }
                }
            }

            return animObj;
        })
    }

    module.exports = APP;
})();
