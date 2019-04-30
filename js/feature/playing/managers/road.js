(function(window, opspark, _) {
  /**
   * Creates and returns the road module.
   * @param {Object} level: The current level data.
   */
  // create a namespace for the timer //
  _.set(opspark, 'playa.road',
    function(view, assets, level) {
        const road = assets.makeRoad(level);
        view.addChild(road);
        
        return {
          
        };
    });
}(window, window.opspark, window._));