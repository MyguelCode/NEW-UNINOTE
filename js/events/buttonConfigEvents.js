/**
 * buttonConfigEvents.js - Event handlers for button configuration UI
 */

import { ButtonConfigService } from '../services/ButtonConfigService.js';
import { NoteRenderer } from '../ui/NoteRenderer.js';
import { STATE } from '../config/state.js';

export function initializeButtonConfigEvents() {
  // Preset mode buttons
  const presetButtons = document.querySelectorAll('.preset-modes button');
  presetButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const preset = btn.dataset.preset;
      await ButtonConfigService.applyPreset(preset);

      // Re-render configuration UI
      renderButtonConfigUI();

      // Re-render all notes to apply new configuration
      if (window.renderAppUI) {
        window.renderAppUI();
      }

      window.NotificationService.showNotification(`Modo ${preset} aplicado`);
    });
  });

  // Numeración radio buttons
  const numeracionRadios = document.querySelectorAll('input[name="numeracion"]');
  numeracionRadios.forEach(radio => {
    radio.addEventListener('change', async (e) => {
      if (e.target.checked) {
        await ButtonConfigService.updateNumeracion(e.target.value);

        // Re-render all notes
        if (window.renderAppUI) {
          window.renderAppUI();
        }

        window.NotificationService.showNotification('Numeración actualizada');
      }
    });
  });

  // Menu show text toggle
  const menuShowTextToggle = document.getElementById('menu-show-text-toggle');
  if (menuShowTextToggle) {
    menuShowTextToggle.addEventListener('change', async () => {
      await ButtonConfigService.toggleMenuShowText();

      // Re-render all notes
      if (window.renderAppUI) {
        window.renderAppUI();
      }

      window.NotificationService.showNotification('Visualización de menú actualizada');
    });
  }

  // Save custom mode button
  const saveCustomModeBtn = document.getElementById('save-custom-mode-btn');
  if (saveCustomModeBtn) {
    saveCustomModeBtn.addEventListener('click', async () => {
      const name = await window.showPromptModal(
        'Guardar Modo Personalizado',
        'Nombre del modo:',
        { defaultValue: 'Mi Configuración' }
      );

      if (name && name.trim()) {
        const description = await window.showPromptModal(
          'Descripción (opcional)',
          'Descripción del modo:',
          { defaultValue: '' }
        );

        const customId = await ButtonConfigService.createCustomMode(
          name.trim(),
          description?.trim() || ''
        );

        window.NotificationService.showNotification(`Modo personalizado "${name}" guardado`);

        // Re-render to show new custom mode button
        renderButtonConfigUI();
      }
    });
  }

  // Initial render of configuration UI
  renderButtonConfigUI();
}

/**
 * Render the button configuration UI
 */
function renderButtonConfigUI() {
  const config = ButtonConfigService.getConfig();

  // Update active preset button
  document.querySelectorAll('.preset-modes button').forEach(btn => {
    if (btn.dataset.preset === config.activeMode) {
      btn.style.fontWeight = 'bold';
      btn.style.backgroundColor = 'var(--accent-color, #4CAF50)';
      btn.style.color = 'white';
    } else {
      btn.style.fontWeight = 'normal';
      btn.style.backgroundColor = '';
      btn.style.color = '';
    }
  });

  // Update numeración radio
  const numeracionValue = config.numeracion || 'antes-contenido';
  document.querySelector(`input[name="numeracion"][value="${numeracionValue}"]`).checked = true;

  // Update menu show text toggle
  const menuShowTextToggle = document.getElementById('menu-show-text-toggle');
  if (menuShowTextToggle) {
    menuShowTextToggle.checked = config.menuShowText || false;
  }

  // Render button lists
  renderButtonList('left', config.leftButtons || []);
  renderButtonList('right', config.rightButtons || []);
}

/**
 * Render button list for a column
 */
function renderButtonList(column, buttonIds) {
  const container = document.getElementById(`${column}-buttons-container`);
  if (!container) return;

  const config = ButtonConfigService.getConfig();
  container.innerHTML = '';

  buttonIds.forEach((btnId, index) => {
    const btnDef = ButtonConfigService.AVAILABLE_BUTTONS[btnId];
    if (!btnDef) return;

    const isVisible = config.visibleButtons.has(btnId);
    const isFunctional = btnDef.functional;

    const btnEl = document.createElement('div');
    btnEl.className = 'config-button-item';
    btnEl.draggable = true;
    btnEl.dataset.buttonId = btnId;
    btnEl.dataset.column = column;
    btnEl.dataset.index = index;

    btnEl.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      margin-bottom: 5px;
      background: var(--note-bg, #fff);
      border: 1px solid var(--border-color, #ddd);
      border-radius: 4px;
      cursor: move;
      user-select: none;
    `;

    // Drag handle
    const dragHandle = document.createElement('span');
    dragHandle.textContent = '⠿';
    dragHandle.style.cursor = 'move';
    dragHandle.style.opacity = '0.5';

    // Button icon
    const icon = document.createElement('span');
    icon.textContent = btnDef.icon;
    icon.style.fontSize = '1.1em';

    // Button label
    const label = document.createElement('span');
    label.textContent = btnDef.label;
    label.style.flex = '1';
    label.style.fontSize = '0.9em';

    // Phase 2 indicator
    if (!isFunctional) {
      const phase2Badge = document.createElement('span');
      phase2Badge.textContent = 'Phase 2';
      phase2Badge.style.cssText = `
        font-size: 0.7em;
        padding: 2px 6px;
        background: var(--warning-color, #ff9800);
        color: white;
        border-radius: 3px;
        margin-left: 5px;
      `;
      label.appendChild(phase2Badge);
    }

    // Visibility toggle
    const visibilityBtn = document.createElement('button');
    visibilityBtn.textContent = '👁️';
    visibilityBtn.title = isVisible ? 'Ocultar en menú ⋮' : 'Mostrar en nota';
    visibilityBtn.style.cssText = `
      background: none;
      border: none;
      font-size: 1.2em;
      cursor: pointer;
      opacity: ${isVisible ? '1' : '0.3'};
      filter: ${isVisible ? 'none' : 'grayscale(100%)'};
      transition: opacity 0.2s, filter 0.2s;
    `;

    visibilityBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      await ButtonConfigService.toggleButtonVisibility(btnId);
      renderButtonConfigUI();

      // Re-render all notes
      if (window.renderAppUI) {
        window.renderAppUI();
      }
    });

    btnEl.appendChild(dragHandle);
    btnEl.appendChild(icon);
    btnEl.appendChild(label);
    btnEl.appendChild(visibilityBtn);

    // Drag events
    btnEl.addEventListener('dragstart', handleDragStart);
    btnEl.addEventListener('dragover', handleDragOver);
    btnEl.addEventListener('drop', handleDrop);
    btnEl.addEventListener('dragend', handleDragEnd);

    container.appendChild(btnEl);
  });

  // Add drop zones for empty containers
  container.addEventListener('dragover', handleContainerDragOver);
  container.addEventListener('drop', handleContainerDrop);
}

/**
 * Drag & Drop handlers
 */
let draggedElement = null;
let draggedButtonId = null;
let draggedFromColumn = null;

function handleDragStart(e) {
  draggedElement = e.currentTarget;
  draggedButtonId = draggedElement.dataset.buttonId;
  draggedFromColumn = draggedElement.dataset.column;

  e.currentTarget.style.opacity = '0.4';
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';

  const target = e.currentTarget;
  if (target !== draggedElement && target.classList.contains('config-button-item')) {
    target.style.borderTop = '2px solid var(--accent-color, #4CAF50)';
  }

  return false;
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  const target = e.currentTarget;
  if (target !== draggedElement && target.classList.contains('config-button-item')) {
    const targetColumn = target.dataset.column;
    const targetIndex = parseInt(target.dataset.index);

    // Move button
    ButtonConfigService.moveButton(draggedButtonId, targetColumn, targetIndex);

    // Re-render
    renderButtonConfigUI();

    // Re-render all notes
    if (window.renderAppUI) {
      window.renderAppUI();
    }
  }

  target.style.borderTop = '';
  return false;
}

function handleDragEnd(e) {
  e.currentTarget.style.opacity = '1';

  // Remove all drag-over indicators
  document.querySelectorAll('.config-button-item').forEach(item => {
    item.style.borderTop = '';
  });

  draggedElement = null;
  draggedButtonId = null;
  draggedFromColumn = null;
}

function handleContainerDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleContainerDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  const container = e.currentTarget;
  const targetColumn = container.dataset.column;

  // If dropped on empty space in container, add to end
  if (draggedButtonId) {
    const config = ButtonConfigService.getConfig();
    const targetList = targetColumn === 'left' ? config.leftButtons : config.rightButtons;
    const targetIndex = targetList.length;

    ButtonConfigService.moveButton(draggedButtonId, targetColumn, targetIndex);

    // Re-render
    renderButtonConfigUI();

    // Re-render all notes
    if (window.renderAppUI) {
      window.renderAppUI();
    }
  }

  return false;
}
