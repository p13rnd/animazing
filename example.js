(function(){
    const animate = function() {
        motio.animate('.motio');
        motio.animate('.motioJS', {
            fullAnimation: 0,
            delay: 300,
            duration: 1000,
            iterations: -1,
            trigger: 'click',
            direction: 'alternate',
            animations: {
                color: '#f4fc05',
                transform: 'translate(100%) scale(3)'
            }
        });
    }
    animate();
})();