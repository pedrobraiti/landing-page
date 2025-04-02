/**
 * Loads projects from the JSON file and populates the project grid sections
 */
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        
        // Process each category of projects
        Object.keys(projects).forEach(category => {
            const container = document.getElementById(category);
            if (!container) return; // Skip if container doesn't exist
            
            container.innerHTML = ''; // Clear existing content
            
            // Create and append project cards for this category
            projects[category].forEach(project => {
                const projectCard = createProjectCard(project);
                container.appendChild(projectCard);
            });
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

/**
 * Creates a project card element based on project data
 * @param {Object} project - Project data object
 * @returns {HTMLElement} - The created project card element
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    let projectContent = '';
    
    // Interactive project with iframe
    if (project.type === 'page') {
        const controls = project.variables ? createVariableControls(project) : '';
        
        projectContent = `
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-frame" style="display: none;">
                    <iframe
                        id="frame-${project.id}"
                        src="${project.url}"
                        width="${project.size?.width || 800}"
                        height="${project.size?.height || 600}"
                        style="border: 1px solid var(--matrix-color); border-radius: 8px;"
                    ></iframe>
                    
                    ${controls ? `
                    <div class="variable-controls" style="margin-top: 1rem; padding: 1rem; background: rgba(0, 0, 0, 0.2); border-radius: 8px;">
                        <h4 style="color: var(--matrix-color); margin-bottom: 1rem;">Controls</h4>
                        ${controls}
                    </div>
                    ` : ''}
                </div>
                <div class="project-controls">
                    <button class="btn toggle-project" onclick="toggleProject('${project.id}')">
                        <i class="fas fa-play"></i> See Project
                    </button>
                    <button class="btn restart-project" onclick="restartProject('${project.id}')" style="display: none;">
                        <i class="fas fa-redo"></i> Restart
                    </button>
                </div>
            </div>
        `;
    } 
    // Standard project with image and link
    else {
        projectContent = `
            ${project.image ? `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" 
                        style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px 8px 0 0;">
                </div>
            ` : ''}
            <div class="project-content" style="padding: 1.5rem;">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                ${project.no_link ? '' : `<a href="${project.link}" class="btn" target="_blank">Visit Project</a>`}
            </div>
        `;
    }
    
    card.innerHTML = projectContent;
    return card;
}

/**
 * Creates control elements for interactive projects
 * @param {Object} project - Project data with variables
 * @returns {string} - HTML string for variable controls
 */
function createVariableControls(project) {
    return project.variables.map(variable => `
        <div class="control-group" style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-color);">
                ${variable.label}
            </label>
            <input 
                type="${variable.type}"
                value="${variable.initialValue}"
                min="${variable.min}"
                max="${variable.max}"
                ${variable.step ? `step="${variable.step}"` : ''}
                onchange="updateProjectVariable('${project.id}', '${variable.name}', this.value)"
                style="background: rgba(0, 255, 149, 0.1); 
                       border: 1px solid var(--matrix-color);
                       color: var(--text-color);
                       padding: 0.5rem;
                       border-radius: 4px;
                       width: 100%;"
            />
            ${variable.type === 'range' ? `
                <div class="value-display" style="text-align: right; font-size: 0.8rem; color: var(--text-color);">
                    Value: ${variable.initialValue}
                </div>
            ` : ''}
        </div>
    `).join('');
}

/**
 * Updates a project variable and sends the update to the iframe
 * @param {string} projectId - ID of the project
 * @param {string} variableName - Name of the variable to update
 * @param {string} value - New value for the variable
 */
window.updateProjectVariable = function(projectId, variableName, value) {
    const frame = document.querySelector(`#frame-${projectId}`);
    if (frame) {
        // Send message to iframe with new variable
        frame.contentWindow.postMessage({
            type: 'updateVariable',
            variable: variableName,
            value: value
        }, '*');
        
        // Update value display if it's a range
        const input = event.target;
        if (input.type === 'range') {
            const displayDiv = input.nextElementSibling;
            if (displayDiv) {
                displayDiv.textContent = `Value: ${value}`;
            }
        }
    }
}

/**
 * Toggles the visibility of a project's iframe
 * @param {string} projectId - ID of the project to toggle
 */
window.toggleProject = function(projectId) {
    const frame = document.querySelector(`#frame-${projectId}`).parentElement;
    const button = frame.nextElementSibling.querySelector('.toggle-project');
    const restartButton = frame.nextElementSibling.querySelector('.restart-project');
    
    if (frame.style.display === 'none') {
        frame.style.display = 'block';
        button.innerHTML = '<i class="fas fa-stop"></i> Hide Project';
        restartButton.style.display = 'inline-block';
    } else {
        frame.style.display = 'none';
        button.innerHTML = '<i class="fas fa-play"></i> See Project';
        restartButton.style.display = 'none';
    }
}

/**
 * Restarts a project by sending a reset message to the iframe
 * @param {string} projectId - ID of the project to restart
 */
window.restartProject = function(projectId) {
    const frame = document.querySelector(`#frame-${projectId}`);
    if (frame) {
        // Send just one variable update to trigger reset
        frame.contentWindow.postMessage({
            type: 'updateVariable',
            variable: 'chanceWhite',
            value: '50'
        }, '*');
    }
}

// Load projects when the document is ready
document.addEventListener('DOMContentLoaded', loadProjects);