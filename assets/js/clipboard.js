/**
 * Copy-to-clipboard for contact entries marked with `data-copy-email`.
 * Briefly swaps the entry's text to confirm the copy, then restores it.
 */

const CONFIRMATION_TEXT = 'Email copied!';
const RESET_DELAY_MS = 2000;

export function initEmailCopy() {
    document.querySelectorAll('[data-copy-email]').forEach((element) => {
        element.addEventListener('click', async (event) => {
            event.preventDefault();
            const email = element.dataset.copyEmail;
            const paragraph = element.querySelector('p');

            try {
                await navigator.clipboard.writeText(email);
                if (!paragraph) return;

                const originalText = paragraph.textContent;
                paragraph.textContent = CONFIRMATION_TEXT;
                paragraph.style.color = 'var(--matrix-color)';

                setTimeout(() => {
                    paragraph.textContent = originalText;
                    paragraph.style.color = '';
                }, RESET_DELAY_MS);
            } catch (error) {
                console.error('Error copying text: ', error);
            }
        });
    });
}
