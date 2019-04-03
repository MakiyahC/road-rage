(function(opspark, _) {
  // create a namespace for the playingMediator //
  _.set(opspark, 'playa.playingMediator', 
  /**
   * Creates and returns the playing mediator.
   */
  function(view, game, data) {
    
    const orbManager = opspark.playa.orbManager(game, view.asset).addOrbs(25);

    // handle pause key stroke //
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && (String.fromCharCode(event.which).toLowerCase() === 'p')) {
        event.preventDefault();
        event.stopPropagation();
        window.removeEventListener('keydown', onKeyDown);
        game.pause();
      }
    }

    /*
     * Return the mediator API: Each mediator must expose its view,
     * a liquify() method used for repositioning components on screen 
     * resize, a destroy() method used to clean up any references, and 
     * methods enter(), exit(), which must return a Promise that 
     * resolves when the enter or exit sequence is complete.
     */
    return {
      view,
      liquify() {
        return view.liquify();
      },
      enter() {
        return new Promise(function(resove, reject) {
          window.addEventListener('keydown', onKeyDown);
          
          
          // if we've already entered once, don't add the view's asset again //
          if(!game.view.contains(view.asset)) game.view.addChild(view.asset);
          view.open();
          
          game.addUpdateable(orbManager);
          
          resove();
        });
      },
      exit() {
        return new Promise(function(resove, reject) {
          view.close();
          game.removeUpdateable(orbManager);
          resove();
        });
      },
      destroy() {
        window.removeEventListener('keydown', onKeyDown);
        game.view.removeChild(view.asset);
      }
    };
  });
}(window.opspark, window._));
