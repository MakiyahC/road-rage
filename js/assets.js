(function(window, opspark, _) {
  const
    // TODO: Decide what phyz library you're using //
    draw = opspark.draw,
    phyz = opspark.racket.physikz;

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
    function(canvas, dj, level) {
      // ASSET BEHAVIORS //
      function updateCar() {
        const car = this;
        // canvas.width / 2 
        // level.road.width
        // if car is touching right side of road or left, 
        // lookup road x and width
        let spacer = (canvas.width - level.road.width) / 2;
        if(this.x < spacer){
          this.x = this.x = spacer + 5;
        }else if(this.x > level.road.width + spacer - this.width){
          this.x = (level.road.width + spacer - this.width) - 5;
        }

      }
      

      /**
       * Each method draws and assembles the asset in a 
       * default state, assigning its update method.
       */
      return {
        makeRoad(level) {
          // TODO: draw the road based on width and x from level
          const road = draw.rect(level.road.width, canvas.height, '#818b9b');
          road.y = 0;
          switch(level.road.x) {
            case 'CENTER':
              road.x = (canvas.width - road.width) / 2;
              break; 
          }
          return road;
        },
        makeCar(color) {
          const
            radius = 25,
            car = draw.rect(150,300, '#fccd11');
            // car = draw.rect(radius, radius, color, null, null, -(radius + radius / 10), -(radius / 2));
            // draw.rect(100, 100, '#000', null, null, null, null, car);
            //Headlights
            draw.ellipse(30,15,'#000', null, null, null, null, car);
            draw.ellipse(30,15,'#000', null, null, 120, null, car);
            //Windows
            draw.rect(15, 190, '#000', null, null, null, 50, car);
            draw.rect(15, 190, '#000', null, null, 135, 50, car);

            //Hood Lines
            draw.ellipse(2,200,'#b58005', null, null, 30, 70, car);
            draw.ellipse(2,200,'#b58005', null, null, 60, 70, car);
            draw.ellipse(2,200,'#b58005', null, null, 90, 70, car);
            draw.ellipse(2,200,'#b58005', null, null, 120,70, car);
            //Brake Lights
            draw.rect(30, 10, '#ff1900', null, null, null, 282, car);
            draw.rect(30, 10, '#ff1900', null, null, 120, 282, car);
            

            
          // continue to draw on the car Shape to create our design //
          // reset the radius, other non-radii drawing operations have overwritten it //
          car.radius = radius + 3;
          car.color = color;

          // rasterize the vector graphic, basically creating a bitmap //
          // car.snapToPixel = true;
          // car.cache(-radius - 10, -radius - 10, radius * 2 + 15, radius * 2 + 15);

          // Merge the car with your game libs makeBody()
          Object.assign(car, phyz.makeBody('car'));
          
          // give the car a default propulsion //
          car.propulsion = 0;

          // set a random rotation value //

          // set the update behavior for the car //
          car.update = updateCar;

          // /*
          // * Returns the global position of where
          // * we want the exhaust to show up. This 
          // * global point will be passed to the 
          // * partical manager, who'll create and 
          // * render the car's exhaust.
          // */
          // car.getExhaustPoint = getExhaustPoint;

          // /*
          // * Returns the global position from where
          // * we want the projectile to launch. This 
          // * global point will be passed to the 
          // * projectile manager, who'll create and 
          // * render the car's projectile.
          // */
          // car.getProjectilePoint = getProjectilePoint;
          
          // car.explosion = fx
          //   .makeEmitter(5, 8, null, new Proton.Velocity(new Proton.Span(4, 2), new Proton.Span(0, 360), 'polar'), [new Proton.RandomDrift(5, 0, .35)]);

          // randomized position within canvas //
          car.x = canvas.width/2 - (car.width)/2;
          car.y = canvas.height - car.height;

          return car;
        },
        
        
          //const someAsset = _.extend(draw.circle(5, '#ff0000'), phyz.makeBody('someAsset'));

        //   someAsset.update = updateSomeAsset
        //   someAsset.snapToPixel = true;
        //   someAsset.cache(-projectile.radius, -projectile.radius, projectile.radius * 2, projectile.radius * 2);

        //   return someAsset;
        
        centerOnStage,
      };
    });
}(window, window.opspark, window._));
