/**
 * Top navigation behaviour.
 *
 * "About" and "Links" open as full-screen dropdown panels (toggle on repeat
 * click); every other link smooth-scrolls to its section and closes any open
 * panel. Close buttons dismiss the panel they belong to.
 */

const DROPDOWN_TARGETS = new Set(['about', 'contact']);

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-section').forEach((section) => {
        section.classList.remove('active');
    });
}

export function initNavigation() {
    document.querySelectorAll('nav a').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            if (DROPDOWN_TARGETS.has(targetId)) {
                const targetSection = document.getElementById(targetId);
                const wasActive = targetSection.classList.contains('active');
                closeAllDropdowns();
                if (!wasActive) targetSection.classList.add('active');
                return;
            }

            closeAllDropdowns();
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.querySelectorAll('.close-btn').forEach((button) => {
        button.addEventListener('click', () => {
            button.closest('.dropdown-section')?.classList.remove('active');
        });
    });
}
