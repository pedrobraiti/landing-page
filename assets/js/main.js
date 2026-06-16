/**
 * Application entry point. Wires every feature module once the DOM is ready.
 */

import { initMatrixBackground } from './matrixBackground.js';
import { initHeroTilt, initContactTilt } from './tiltEffect.js';
import { initNavigation } from './navigation.js';
import { initEmailCopy } from './clipboard.js';
import { initProjectCatalog } from './projectCatalog.js';

function init() {
    initMatrixBackground();
    initHeroTilt();
    initContactTilt();
    initNavigation();
    initEmailCopy();
    initProjectCatalog();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
