class FearStressTrackerApp extends Application {
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        id: "fear-stress-tracker",
        title: "Fear and Stress Tracker",
        template: "modules/fear-stress-tracker/templates/ui.html",
        width: 400,
        height: 300,
        resizable: true
      });
    }
  
    getData() {
      return {
        actors: game.actors.contents.map(actor => ({
          id: actor.id,
          name: actor.name,
          fear: actor.system.attributes?.fear?.value || 0,
          stress: actor.system.attributes?.stress?.value || 0
        }))
      };
    }
  }
  
  Hooks.once("init", () => {
    console.log("Fear and Stress Tracker | Initializing module...");
  
    game.fearStressTracker = {
      showTracker: () => {
        if (!game.fearStressTracker.app) {
          game.fearStressTracker.app = new FearStressTrackerApp();
        }
        game.fearStressTracker.app.render(true);
      },
      adjustFear(actorId, amount) {
        const actor = game.actors.get(actorId);
        if (!actor) return;
        const newFear = Math.clamp((actor.system.attributes.fear?.value || 0) + amount, 0, 100);
        actor.update({ "system.attributes.fear.value": newFear });
        ui.notifications.info(`${actor.name} now has fear level: ${newFear}`);
      },
      adjustStress(actorId, amount) {
        const actor = game.actors.get(actorId);
        if (!actor) return;
        const newStress = Math.clamp((actor.system.attributes.stress?.value || 0) + amount, 0, 100);
        actor.update({ "system.attributes.stress.value": newStress });
        ui.notifications.info(`${actor.name} now has stress level: ${newStress}`);
      }
    };
  });
  
  Hooks.on("renderFearStressTrackerApp", (app, html) => {
    html.find(".adjust-fear.increase").click(ev => {
      const actorId = ev.currentTarget.dataset.actorId;
      game.fearStressTracker.adjustFear(actorId, 10);
    });
    html.find(".adjust-fear.decrease").click(ev => {
      const actorId = ev.currentTarget.dataset.actorId;
      game.fearStressTracker.adjustFear(actorId, -10);
    });
    html.find(".adjust-stress.increase").click(ev => {
      const actorId = ev.currentTarget.dataset.actorId;
      game.fearStressTracker.adjustStress(actorId, 10);
    });
    html.find(".adjust-stress.decrease").click(ev => {
      const actorId = ev.currentTarget.dataset.actorId;
      game.fearStressTracker.adjustStress(actorId, -10);
    });
  });
  
  Hooks.once("ready", () => {
    console.log("Fear and Stress Tracker | Module ready to use.");
    game.fearStressTracker.showTracker();
  });
  