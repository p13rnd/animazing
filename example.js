(function(){
    const animate = function() {
        animazing.animate('.animazing');
        animazing.animate('.animazingJS', {
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
    }
    animate();
})();