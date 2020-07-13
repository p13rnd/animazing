# motio - Animate anything easily

![motio](https://github.com/p13rnd/motio/blob/master/motio.gif)

This lib animates your text letter by letter using data attributes to control them or if desired you can use options {} instead as a second paramter to take control over the animations. It has zero runtime dependencies utilising [Web Animations](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) so make sure you understand the implications (no IE support and not planned*)

But there's more, motio can animate letter by letter, the full node, it retains anchor tags and much more.

## How does it work?

motio takes any selector fed into it and breaks it into several span nodes letter by letter, afterwards it will run the animation code on each node with the provided delay between each of them. It will also apply any options passed to it. See options below.

## Installation

using npm
> npm i @p13rnd/motio  

UMD
> \<script defer src="https://unpkg.com/@p13rnd/motio@1.0.0/dist/motio.min.js"></script>

## How to use?

```html
<!-- js config object -->
<section>
    <h1	class="motioJS">motio</h1>
</section>

<!-- data attributes -->
<section>
    <p
        class="motio"
        data-full="0"
        data-delay="120"
        data-duration="1000"
        data-iterations="1"
        data-direction="alternate"
        data-clean="1"
        data-retain="1"
        data-trigger="click"
        data-animations="color: [#f4fc05, randomColor, randomColor, randomColor, randomColor, randomColor, randomColor] | transform: [translateX(10%), translateY(20%), rotate(360deg), scale(0.75)]"
    >motio Text with a <a target="_blank" href="https://github.com/p13rnd/motio">Link</a>.</p>
</section>
```

```js
// use data-attributes for configuration
motio.animate('.motio');

// use js object for configuration
motio.animate('.motioJS', {
    fullAnimation: 0,
    delay: 300,
    duration: 1000,
    iterations: -1,
    direction: 'alternate',
    animations: {
        color: '#f4fc05',
        transform: 'translate(100%) scale(3)'
    }
});
```

## Documentation

key | values | default | notes
--- | --- | --- | ---
full | 0 or 1 | 0 | wether to animate the full node or it's innerText letter by letter, for the js object config use the key fullAnimation
fullAnimation | 0 or 1 | 0 | wether to animate the full node or it's innerText letter by letter, for the data attribute config use the key full
delay | int | 0 | the delay between animations, if animating single nodes the delay will be set between each node (letter)
duration | int | 1000 | the duration one animation lasts in milliseconds
trigger | string | false | the trigger for the animation 'click' or 'hover' are supported right now.
iterations | int | 1 | the number of iterations, -1 for inifinite running animations
iterationStart | float | 0.0 | the start delay between 2 iterations
direction | string | 'normal' | the direction per Web API, options are 'normal', 'reverse' and 'alternate-reverse'
clean | 0 or 1 | 0 | only used when full is set to 0, part animations inject spans, if clean is set to 1 the parts get removed when the animation is completed (this does not work on infinite animations)
retain | 0 or 1 | 0 | only used when full is set to 0 and clean to 1, this will retain styles set during the animation if possible but still clean up span nodes generated. This is possible by transferring styles to the parent dom node.
animations | csv string | false | a comma separated value string for data attribute controlled animations or a js object (see examples above). ```html data-animations="color: #f4fc05, fontSize: 4rem"```

some special options:

Opacity is flipped, if you provide 0 it will animate to 1 and vice-versa.

## Notes on IE and old browsers*

Backwards compatibility is nice, but I think it's also the wrong way to go. If everything stays with "Support for IE-insert-version-clients-ask-for-here" we will also allow people to run around with Windows7 in 20 years time, among with the Security concerns for everyone else. We will also end up with tons of dependencies just to support a few people not willing to upgrade. 

So we will not support IE at all for the sake of keeping out dependencies and having some more people think about updating their Systems (finally).

## Credits

- thanks to [Cory Simmons](https://github.com/corysimmons) for [strToObj function](https://stackoverflow.com/a/45384610/11775243)
