
import { globals } from '../core/globals';

export function playAnimation(model, clipName, transitionDuration = 0.2) {
    const entry = globals.mixers.find(entry => entry.model === model);
    if (!entry) return;

    const { mixer, animations } = entry;
    const clip = animations.find(a => a.name === clipName);
    if (!clip) return;

    const newAction = mixer.clipAction(clip);

    if (mixer.currentAction && mixer.currentAction !== newAction) {
        mixer.currentAction.fadeOut(transitionDuration);
    }

    newAction.reset().fadeIn(transitionDuration).play();

    mixer.currentAction = newAction;
}

