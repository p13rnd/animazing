# motio - Animate anything easily

![motio](https://github.com/p13rnd/motio/blob/master/motio.gif)

This lib animates your text letter by letter using data attributes to control them or if desired you can use options {} instead as a second paramter to take control over the animations. It has zero runtime dependencies utilising [Web Animations](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) so make sure you understand the implications (no IE support and not planned*)

But there's more, motio can animate letter by letter, the full node, it retains anchor tags and much more.

## How does it work?

motio takes any selector fed into it and breaks it into several span nodes letter by letter, afterwards it will run the animation code on each node with the provided delay between each of them. It will also apply any options passed to it. See options below.

**WIP THIS IS A WORK IN PROGRESS AND THINGS MAY NOT WORK AS EXPECTED, ALSO MISSING SOME DOCS RIGHT NOW. THIS NOTE WILL BE REMOVED ONCE THE PACKAGE IS READY AND PUBLISHED TO NPM**

## Installation

using npm
> npm i @p13rnd/motio  

UMD
> \<script defer src="https://unpkg.com/@p13rnd/motio@1.0.0/dist/motio.min.js"\></script>

## How to use?

```html
<section>
    <h1	class="motioJS">motio</h1>
</section>
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
        data-animations="color: #f4fc05, fontSize: 4rem"
    >motio Text with a <a target="_blank" href="https://github.com/p13rnd/motio">Link</a>.</p>
</section>
```

```js
motio.animate('.motio');
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

> TODO

## Notes on IE and old browsers

Backwards compatibility is nice, but I think it's also the wrong way to go. If everything stays with "Support for IE-insert-version-clients-ask-for-here" we will also allow people to run around with Windows7 in 20 years time, among with the Security concerns for everyone else. We will also end up with tons of dependencies just to support a few people not willing to upgrade. 

So we will not support IE at all for the sake of keeping out dependencies and having some more people think about updating their Systems (finally).

## Credits

- thanks to [Cory Simmons](https://github.com/corysimmons) for [strToObj function](https://stackoverflow.com/a/45384610/11775243)
