Hooks.once("init", () => {
    console.log("Fear and Stress Tracker | Initializing module...");
  
    Actors.registerSheet("fear-stress-tracker", class extends ActorSheet {
        getData() {
            const data = super.getData();
            if (!data.actor.data.data.attributes) {
                data.actor.data.data.attributes = {};
            }
            if (!data.actor.data.data.attributes.fear) {
                data.actor.data.data.attributes.fear = { value: 0, max: 100 };
            }
            if (!data.actor.data.data.attributes.stress) {
                data.actor.data.data.attributes.stress = { value: 0, max: 100 };
            }
            return data;
        }
    });

    game.fearStressTracker = {
        adjustFear(actorId, amount) {
            const actor = game.actors.get(actorId);
            if (!actor) return;
            let newFear = Math.clamp(actor.data.data.attributes.fear.value + amount, 0, 100);
            actor.update({ "data.attributes.fear.value": newFear });
            ui.notifications.info(`${actor.name} now has fear level: ${newFear}`);
        },
        adjustStress(actorId, amount) {
            const actor = game.actors.get(actorId);
            if (!actor) return;
            let newStress = Math.clamp(actor.data.data.attributes.stress.value + amount, 0, 100);
            actor.update({ "data.attributes.stress.value": newStress });
            ui.notifications.info(`${actor.name} now has stress level: ${newStress}`);
        }
    };
});

Hooks.once("renderApplication", (app, html, data) => {
    html.find(".adjust-fear.increase").click(() => {
        const actorId = data.actor._id;
        game.fearStressTracker.adjustFear(actorId, 10);
    });

    html.find(".adjust-fear.decrease").click(() => {
        const actorId = data.actor._id;
        game.fearStressTracker.adjustFear(actorId, -10);
    });

    html.find(".adjust-stress.increase").click(() => {
        const actorId = data.actor._id;
        game.fearStressTracker.adjustStress(actorId, 10);
    });

    html.find(".adjust-stress.decrease").click(() => {
        const actorId = data.actor._id;
        game.fearStressTracker.adjustStress(actorId, -10);
    });
});

Hooks.on("ready", () => {
    console.log("Fear and Stress Tracker | Module ready to use.");
});
