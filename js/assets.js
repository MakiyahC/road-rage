(function(window, opspark, _) {
  const
    // TODO: Decide what phyz library you're using //
    draw = opspark.draw;

  /**
   * Takes a body and centers its x and y on the canvas.
   * @param {Object} asset: A body with an x and y property.
   * @param {Canvas} canvas: The HTML canvas element.
   */
  function centerOnStage(asset, canvas, level) {
    if (asset.type === 'circular' || asset.radius) {
      asset.x = canvas.width / 2;
      asset.y = canvas.height / 2;
    } else {
      const bounds = asset.getBounds();
      asset.x = (canvas.width - bounds.width) / 2;
      asset.y = (canvas.height - bounds.width) / 2;
    }
  }

  
  /**
   * Creates an API at opspark.assets to 
   * build and work with visual assets.
   * 
   * @param {Object} canvas: The canvas on which the 
   * game is drawn, used for incept positioning of assets.
   */
   // TODO: Decide what modules are necessary for building your assets //
  _.set(opspark, 'playa.assets',
    function(canvas, fx, dj, level) {
      // ASSET BEHAVIORS //
      

      /**
       * Each method draws and assembles the asset in a 
       * default state, assigning its update method.
       */
      return {
        // TODO: implement to return your asset //
        makeSomeAsset() {
          //const someAsset = _.extend(draw.circle(5, '#ff0000'), phyz.makeBody('someAsset'));

        //   someAsset.update = updateSomeAsset
        //   someAsset.snapToPixel = true;
        //   someAsset.cache(-projectile.radius, -projectile.radius, projectile.radius * 2, projectile.radius * 2);

        //   return someAsset;
        },
        centerOnStage,
      };
    });
}(window, window.opspark, window._));
