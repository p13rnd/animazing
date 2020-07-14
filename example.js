(function(){
    const animate = function() {
        motio.animate('.motio');
        motio.animate('.motioJS', {
            delay: 300,
            duration: 1000,
            iterations: 3,
            trigger: 'click',
            direction: 'alternate',
            easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
            animations: {
                color: '#f4fc05',
                transform: 'translate(100%) scale(3)'
            }
        });
    }
    animate();
})();