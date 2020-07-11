# Animazing - Animate anything easily

This lib animates your text letter by letter using data attributes to control them or if desired you can use options {} instead as a second paramter to take control over the animations. It has zero runtime dependencies utilising [Web Animations](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) so make sure you understand the implications (no IE support and not planned*)

But there's more, animazing can animate letter by letter, the full node, it retains anchor tags and much more.

## How does it work?

Animazing takes any selector fed into it and breaks it into several span nodes letter by letter, afterwards it will run the animation code on each node with the provided delay between each of them. It will also apply any options passed to it. See options below.

##**WIP** THIS IS A WORK IN PROGRESS AND THINGS MAY NOT WORK AS EXPECTED, ALSO MISSING SOME DOCS RIGHT NOW. THIS NOTE WILL BE REMOVED ONCE THE PACKAGE IS READY AND PUBLISHED TO NPM

## How to use?

> TODO

## Documentation

> TODO

## Notes on IE and old browsers

Backwards compatibility is nice, but I think it's also the wrong way to go. If everything stays with "Support for IE-insert-version-clients-ask-for-here" we will also allow people to run around with Windows7 in 20 years time, among with the Security concerns for everyone else. We will also end up with tons of dependencies just to support a few people not willing to upgrade. 

So we will not support IE at all for the sake of keeping out dependencies and having some more people think about updating their Systems (finally).

## Credits

- thanks to [Cory Simmons](https://github.com/corysimmons) for [strToObj function](https://stackoverflow.com/a/45384610/11775243)
