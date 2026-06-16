/**
 * Mouse-driven 3D tilt effects.
 *
 * Two consumers share the same idea (rotate an element toward the cursor and
 * paint a directional gradient) but differ enough in structure that they are
 * kept as two focused initializers:
 *   - initHeroTilt: the large hero card, tracked through a global pointer test.
 *   - initContactTilt: each contact card, tracked locally on hover.
 */

export function initHeroTilt() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'tilt-wrapper';

    const originalRect = heroContent.getBoundingClientRect();

    const hitArea = document.createElement('div');
    hitArea.className = 'tilt-hit-area';

    heroContent.parentNode.insertBefore(wrapper, heroContent);
    wrapper.appendChild(heroContent);
    wrapper.appendChild(hitArea);

    wrapper.style.width = `${originalRect.width}px`;
    wrapper.style.height = `${originalRect.height}px`;

    Object.assign(heroContent.style, {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'all 0.2s linear',
        transformStyle: 'preserve-3d',
        background: 'var(--overlay-color)'
    });

    const profileImage = heroContent.querySelector('.profile-image');
    const heroText = heroContent.querySelector('.hero-text');

    if (profileImage) {
        Object.assign(profileImage.style, {
            transform: 'translateZ(50px)',
            transition: 'transform 0.2s linear'
        });
    }
    if (heroText) {
        Object.assign(heroText.style, {
            transform: 'translateZ(30px)',
            transition: 'transform 0.2s linear'
        });
    }

    let isCalculating = false;

    function handleMouseMove(event) {
        if (isCalculating) return;
        isCalculating = true;

        const rect = wrapper.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((mouseY - centerY) / centerY) * -10;
        const rotateY = ((mouseX - centerX) / centerX) * 10;

        const gradientX = (mouseX / rect.width) * 100;
        const gradientY = (mouseY / rect.height) * 100;

        heroContent.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.02, 1.02, 1.02)
        `;

        heroContent.style.background = `
            linear-gradient(
                ${gradientY}deg,
                rgba(0, 255, 149, 0.15) 0%,
                rgba(10, 10, 10, 0.95) ${gradientX}%
            )
        `;

        requestAnimationFrame(() => {
            isCalculating = false;
        });
    }

    function handleMouseLeave() {
        heroContent.style.transition = 'all 0.2s linear';
        heroContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        heroContent.style.background = 'var(--overlay-color)';

        if (profileImage) {
            profileImage.style.transition = 'transform 0.2s linear';
            profileImage.style.transform = 'translateZ(50px)';
        }
        if (heroText) {
            heroText.style.transition = 'transform 0.2s linear';
            heroText.style.transform = 'translateZ(30px)';
        }
    }

    let isInside = false;
    let areaRect = null;

    function updateDetectArea() {
        const heroRect = heroContent.getBoundingClientRect();
        areaRect = {
            left: heroRect.left,
            top: heroRect.top,
            right: heroRect.left + heroRect.width,
            bottom: heroRect.top + heroRect.height
        };
    }

    document.addEventListener('mousemove', (event) => {
        if (!areaRect) updateDetectArea();

        const isMouseInside =
            event.clientX >= areaRect.left &&
            event.clientX <= areaRect.right &&
            event.clientY >= areaRect.top &&
            event.clientY <= areaRect.bottom;

        if (isMouseInside) {
            if (!isInside) {
                isInside = true;
                heroContent.style.transform =
                    'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                heroContent.offsetHeight; // force reflow before tilting
            }
            handleMouseMove(event);
        } else if (isInside) {
            isInside = false;
            handleMouseLeave();
        }
    });

    window.addEventListener('scroll', updateDetectArea);
    window.addEventListener('resize', updateDetectArea);
}

const CONTACT_CARD_COLORS = {
    github: '75, 97, 222',
    linkedin: '10, 102, 194',
    gmail: '234, 67, 53',
    artstation: '13, 180, 245',
    instagram: '225, 70, 130',
    linktree: '43, 183, 96'
};

const CONTACT_CARD_ICON_TYPES = [
    ['.fa-github', 'github'],
    ['.fa-linkedin', 'linkedin'],
    ['.fa-envelope', 'gmail'],
    ['.fa-artstation', 'artstation'],
    ['.fa-instagram', 'instagram'],
    ['.fa-tree', 'linktree']
];

function resolveCardType(card) {
    for (const [selector, type] of CONTACT_CARD_ICON_TYPES) {
        if (card.querySelector(selector)) return type;
    }
    return 'github';
}

export function initContactTilt() {
    const cards = document.querySelectorAll('.contact-card');

    cards.forEach((card) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'tilt-wrapper-contact';

        const hitArea = document.createElement('div');
        hitArea.className = 'tilt-hit-area-contact';

        card.parentNode.insertBefore(wrapper, card);
        wrapper.appendChild(card);
        wrapper.appendChild(hitArea);

        Object.assign(card.style, {
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: 'all 0.2s linear',
            transformStyle: 'preserve-3d',
            position: 'relative'
        });

        let isCalculating = false;

        function handleMouseMove(event) {
            if (isCalculating) return;
            isCalculating = true;

            const rect = wrapper.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((mouseY - centerY) / centerY) * -15;
            const rotateY = ((mouseX - centerX) / centerX) * 15;

            const gradientX = (mouseX / rect.width) * 100;
            const gradientY = (mouseY / rect.height) * 100;

            const color = CONTACT_CARD_COLORS[resolveCardType(card)];

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.02, 1.02, 1.02)
            `;

            card.style.background = `
                linear-gradient(
                    ${gradientY}deg,
                    rgba(${color}, 0.20) 0%,
                    rgba(10, 10, 10, 0.95) ${gradientX}%
                )
            `;

            requestAnimationFrame(() => {
                isCalculating = false;
            });
        }

        function handleMouseLeave() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            card.style.background = 'rgba(0, 0, 0, 0.3)';
        }

        wrapper.addEventListener('mousemove', handleMouseMove);
        wrapper.addEventListener('mouseleave', handleMouseLeave);
    });
}
