/**
 * Loads the project catalog from projects.json and renders one card per entry
 * into its category grid. Also wires the category switcher and the controls of
 * interactive (iframe-based) projects.
 *
 * Interactive projects talk to their iframe through `postMessage` using the
 * `updateVariable` protocol the embedded sketches listen for.
 */

const CATALOG_URL = 'projects.json';
const DEFAULT_FRAME = { width: 800, height: 600 };
const RESTART_MESSAGE = { variable: 'chanceWhite', value: '50' };

export async function initProjectCatalog() {
    setupCategorySwitcher();
    await loadCatalog();
}

function setupCategorySwitcher() {
    const buttons = document.querySelectorAll('.category-btn');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            buttons.forEach((other) => other.classList.remove('active'));
            button.classList.add('active');

            document.querySelectorAll('.project-grid').forEach((grid) => {
                grid.style.display = 'none';
            });

            const target = document.getElementById(button.dataset.category);
            if (target) target.style.display = 'flex';
        });
    });
}

async function loadCatalog() {
    try {
        const response = await fetch(CATALOG_URL);
        const catalog = await response.json();

        Object.entries(catalog).forEach(([category, projects]) => {
            const container = document.getElementById(category);
            if (!container) return;
            container.replaceChildren(...projects.map(createProjectCard));
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    if (project.type === 'page') {
        renderInteractiveCard(card, project);
    } else {
        renderStandardCard(card, project);
    }

    return card;
}

function techStackMarkup(technologies = []) {
    return technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join('');
}

function renderStandardCard(card, project) {
    const imageMarkup = project.image
        ? `<div class="project-image"><img src="${project.image}" alt="${project.title}"></div>`
        : '';

    const linkMarkup = project.no_link
        ? ''
        : `<a href="${project.link}" class="btn" target="_blank" rel="noopener">Visit Project</a>`;

    card.innerHTML = `
        ${imageMarkup}
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-stack">${techStackMarkup(project.technologies)}</div>
            ${linkMarkup}
        </div>
    `;
}

function renderInteractiveCard(card, project) {
    const { width, height } = project.size || DEFAULT_FRAME;
    const variables = Array.isArray(project.variables) ? project.variables : [];

    const controlsMarkup = variables.length
        ? `
            <div class="variable-controls">
                <h4>Controls</h4>
                ${variables.map(controlMarkup).join('')}
            </div>`
        : '';

    card.innerHTML = `
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-stack">${techStackMarkup(project.technologies)}</div>
            <div class="project-frame" style="display: none;">
                <iframe id="frame-${project.id}" src="${project.url}" width="${width}" height="${height}"></iframe>
                ${controlsMarkup}
            </div>
            <div class="project-controls">
                <button class="btn toggle-project"><i class="fas fa-play"></i> See Project</button>
                <button class="btn restart-project" style="display: none;"><i class="fas fa-redo"></i> Restart</button>
            </div>
        </div>
    `;

    wireInteractiveCard(card, project);
}

function controlMarkup(variable) {
    const stepAttribute = variable.step ? `step="${variable.step}"` : '';
    const valueDisplay = variable.type === 'range'
        ? `<div class="value-display">Value: ${variable.initialValue}</div>`
        : '';

    return `
        <div class="control-group">
            <label>${variable.label}</label>
            <input type="${variable.type}" value="${variable.initialValue}"
                   min="${variable.min}" max="${variable.max}" ${stepAttribute}
                   data-variable="${variable.name}">
            ${valueDisplay}
        </div>
    `;
}

function wireInteractiveCard(card, project) {
    const frame = card.querySelector(`#frame-${project.id}`);
    const frameContainer = card.querySelector('.project-frame');
    const toggleButton = card.querySelector('.toggle-project');
    const restartButton = card.querySelector('.restart-project');

    toggleButton.addEventListener('click', () => {
        const isHidden = frameContainer.style.display === 'none';
        frameContainer.style.display = isHidden ? 'block' : 'none';
        toggleButton.innerHTML = isHidden
            ? '<i class="fas fa-stop"></i> Hide Project'
            : '<i class="fas fa-play"></i> See Project';
        restartButton.style.display = isHidden ? 'inline-block' : 'none';
    });

    restartButton.addEventListener('click', () => {
        postVariable(frame, RESTART_MESSAGE.variable, RESTART_MESSAGE.value);
    });

    card.querySelectorAll('.variable-controls input').forEach((input) => {
        input.addEventListener('change', () => {
            postVariable(frame, input.dataset.variable, input.value);
            if (input.type === 'range') {
                const display = input.nextElementSibling;
                if (display) display.textContent = `Value: ${input.value}`;
            }
        });
    });
}

function postVariable(frame, variable, value) {
    frame?.contentWindow?.postMessage({ type: 'updateVariable', variable, value }, '*');
}
