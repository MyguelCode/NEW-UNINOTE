/**
 * NoteRenderer - Renderizado completo de notas y UI
 */

import { STATE } from '../config/state.js';
import { StateController } from '../controllers/StateController.js';
import { NoteController } from '../controllers/NoteController.js';

export class NoteRenderer {

  /**
   * Cargar notas desde datos
   */
  static loadNotesFromData(notesData) {
    STATE.currentNotesData = JSON.parse(JSON.stringify(notesData || []));
    STATE.DOM.notesList.innerHTML = '';

    const activeNotes = STATE.currentNotesData.filter(note => !note.isArchived);

    const recursiveLoad = (dataArray, parentList) => {
      dataArray.forEach(noteData => {
        const li = this.createNote(parentList, null, false, noteData);
        if (noteData.children && noteData.children.length > 0) {
          const sublist = document.createElement('ul');
          sublist.className = 'subnotes';

          if (noteData.isCollapsed) {
            sublist.classList.add('hidden');
          }

          li.appendChild(sublist);
          recursiveLoad(noteData.children, sublist);
        }
        this.renderNoteState(li);
      });
    };

    recursiveLoad(activeNotes, STATE.DOM.notesList);
    NoteController.ensureAtLeastOneNote();
    StateController.runUpdates();
  }

  /**
   * Crear nota en DOM
   */
  static createNote(parentList, afterElement = null, shouldFocus = false, data = {}) {
    const li = document.createElement('li');
    li.className = 'note';
    const noteId = data.id || crypto.randomUUID();
    li.dataset.id = noteId;

    const noteData = {
      id: noteId,
      content: '',
      status: 'todo',
      creationDate: new Date().toISOString(),
      children: [],
      ...data
    };

    li.dataset.status = noteData.status;
    li.dataset.creationDate = noteData.creationDate;
    li.dataset.dueDate = noteData.dueDate || '';
    li.dataset.isArchived = String(noteData.isArchived || false);
    li.dataset.archivedTimestamp = noteData.archivedTimestamp || '';

    if (noteData.originalDoc) {
      li.dataset.originalDoc = noteData.originalDoc;
    }

    if (noteData.lockType && noteData.passwordHash) {
      li.dataset.lockType = noteData.lockType;
      li.dataset.lockHint = noteData.lockHint || '';
      li.dataset.passwordHash = JSON.stringify(noteData.passwordHash);
      li.dataset.lockedContent = noteData.content || '';
    }

    li.innerHTML = `
      <div class="note-container">
        <input type="checkbox" class="note-selector" title="Seleccionar nota">
        <button class="drag-handle" data-action="drag" draggable="true" title="Arrastrar para mover">⠿</button>
        <span class="note-icon"></span>
        <button data-action="cycle-status" title="Estado: Sin Hacer">⚪</button>
        <button data-action="set-date" title="Asignar Fecha Límite">🗓️</button>
        <span class="countdown-timer"></span>
        <button data-action="lock" title="Opciones de Bloqueo">🔒</button>
        <button data-action="duplicate" title="Duplicar Nota">⧉</button>
        <button data-action="toggle"></button>
        <span class="note-number" title="Creado el: ${new Date(noteData.creationDate).toLocaleString()}"></span>
        <div class="editable-note" contenteditable="true">${noteData.content || ''}</div>
        <button data-action="add-sibling" title="Añadir Nota Hermana">➕</button>
        <button data-action="add-subnote" title="Añadir Subnota"><sub>➕</sub></button>
        <button data-action="show-menu" title="Más Opciones">⋮</button>
        <button data-action="unarchive" title="Desarchivar Nota">📤</button>
        <button data-action="archive" title="Archivar Nota">📥</button>
        <button data-action="delete" title="Eliminar Nota">🗑️</button>
      </div>
    `;

    const statusBtn = li.querySelector('[data-action="cycle-status"]');
    switch(li.dataset.status) {
      case 'inprogress': statusBtn.textContent = '🟡'; break;
      case 'done': statusBtn.textContent = '🟢'; break;
      default: statusBtn.textContent = '⚪'; break;
    }
    li.querySelector('.note-icon').textContent = noteData.icon || '';

    if (afterElement) {
      parentList.insertBefore(li, afterElement.nextSibling);
    } else {
      parentList.appendChild(li);
    }

    if (shouldFocus) {
      const editable = li.querySelector('.editable-note');
      editable.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editable);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    return li;
  }

  /**
   * Renderizar estado de nota (bloqueada/desbloqueada)
   */
  static renderNoteState(noteLi) {
    const hasLockData = noteLi.dataset.lockType && noteLi.dataset.passwordHash;
    const isTemporarilyUnlocked = STATE.sessionUnlockedNotes.has(noteLi.dataset.id);

    if (hasLockData && !isTemporarilyUnlocked) {
      noteLi.classList.add('is-locked');
      const editable = noteLi.querySelector('.editable-note');
      editable.setAttribute('contenteditable', 'false');
      editable.innerHTML = `🔒 <span class="lock-hint">${noteLi.dataset.lockHint || 'Contenido bloqueado'}</span>`;
    } else {
      noteLi.classList.remove('is-locked');
      const editable = noteLi.querySelector('.editable-note');
      editable.setAttribute('contenteditable', 'true');
      if (hasLockData) {
        editable.innerHTML = noteLi.dataset.lockedContent || '';
      }
      this.linkify(editable);
    }
    StateController.updateToggleVisibilityForNote(noteLi);
  }

  /**
   * Linkificar URLs en contenido
   */
  static linkify(element) {
    if (!element || (element.closest('.note') && element.closest('.note').classList.contains('is-locked'))) return;

    const urlRegex = /(https?:\/\/[^\s"'<>()]+)/g;
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      { acceptNode: (node) => node.parentElement.tagName !== 'A' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT }
    );

    const nodesToProcess = [];
    let node;
    while (node = walker.nextNode()) {
      if (urlRegex.test(node.textContent)) {
        nodesToProcess.push(node);
      }
    }

    if (nodesToProcess.length === 0) return;

    nodesToProcess.forEach((textNode) => {
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match;
      urlRegex.lastIndex = 0;

      while ((match = urlRegex.exec(textNode.textContent)) !== null) {
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(textNode.textContent.substring(lastIndex, match.index)));
        }
        const a = document.createElement('a');
        a.href = match[0];
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = match[0];
        fragment.appendChild(a);
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < textNode.textContent.length) {
        fragment.appendChild(document.createTextNode(textNode.textContent.substring(lastIndex)));
      }

      if (fragment.childNodes.length > 0) {
        textNode.parentNode.replaceChild(fragment, textNode);
      }
    });
  }

  /**
   * Renderizar vista (normal/archivo/bloqueada)
   */
  static renderView() {
    const isDocLocked = STATE.appData.documentPasswords[STATE.currentDocumentName] &&
                        !STATE.unlockedDocuments.has(STATE.currentDocumentName);

    STATE.DOM.relockDocBtn.classList.toggle('hidden',
      isDocLocked ||
      !STATE.appData.documentPasswords[STATE.currentDocumentName] ||
      !STATE.unlockedDocuments.has(STATE.currentDocumentName)
    );

    if (isDocLocked) {
      STATE.DOM.notesList.innerHTML = `
        <div id="doc-locked-message">
          <h2>🔒 Uninote Bloqueado</h2>
          <p>Este Uninote está protegido por contraseña.</p>
          <button id="unlock-doc-btn" class="modal-button confirm-action">Desbloquear Uninote</button>
        </div>`;
      STATE.DOM.archiveViewContainer.classList.add('hidden');
      STATE.DOM.globalSearchResults.classList.add('hidden');
      STATE.DOM.notesCounter.classList.add('hidden');
      return;
    }

    STATE.DOM.notesCounter.classList.remove('hidden');

    if (STATE.isArchiveViewActive) {
      document.body.dataset.viewMode = 'archive';
      STATE.DOM.notesList.classList.add('hidden');
      STATE.DOM.archiveViewContainer.classList.remove('hidden');
      STATE.DOM.globalSearchResults.classList.add('hidden');
      STATE.DOM.toggleArchiveViewBtn.textContent = '📖 Ver Activas';
      STATE.DOM.addMainNoteBtn.classList.add('hidden');
      STATE.DOM.notesCounter.classList.add('hidden');

      if (window.ArchiveService) {
        window.ArchiveService.renderArchiveTimeline();
      }
    } else {
      document.body.dataset.viewMode = 'active';
      STATE.DOM.notesList.classList.remove('hidden');
      STATE.DOM.archiveViewContainer.classList.add('hidden');

      if (!STATE.DOM.searchAllToggle.checked || !STATE.DOM.searchInput.value) {
        STATE.DOM.globalSearchResults.classList.add('hidden');
      }

      STATE.DOM.toggleArchiveViewBtn.textContent = '📦 Archivo';
      STATE.DOM.addMainNoteBtn.classList.remove('hidden');
      STATE.DOM.notesCounter.classList.remove('hidden');
    }

    StateController.runUpdates();
  }

  /**
   * Renderizar UI completa de la app
   */
  static renderAppUI() {
    STATE.DOM.documentTitle.textContent = `${STATE.currentDocumentName} ▾`;
    this.renderDocumentMenu();
    this.renderTabs();
    this.loadNotesFromData(STATE.currentNotesData);
  }

  /**
   * Renderizar menú de documentos
   */
  static renderDocumentMenu() {
    const documentMenu = STATE.DOM.documentMenu;
    documentMenu.innerHTML = '';

    STATE.appData.documents.forEach(docName => {
      const li = document.createElement('li');
      li.dataset.docName = docName;
      const isProtected = STATE.appData.documentPasswords[docName] ? '🔒' : '';
      const isDefault = STATE.appData.defaultDocument === docName ? ' (Principal)' : '';
      li.innerHTML = `
        <span class="doc-name">${docName} ${isProtected}${isDefault}</span>
        <span class="favorite-star ${STATE.appData.favorites.includes(docName) ? 'is-favorite' : ''}" data-action="toggle-favorite">☆</span>
      `;
      if (docName === STATE.currentDocumentName) {
        li.classList.add('active-doc');
      }
      documentMenu.appendChild(li);
    });

    documentMenu.innerHTML += `<hr>`;
    documentMenu.innerHTML += `<li data-action="create">➕ Crear nuevo Uninote</li>`;
    documentMenu.innerHTML += `<li data-action="rename">✏️ Renombrar "${STATE.currentDocumentName}"</li>`;
    documentMenu.innerHTML += `<li data-action="set-default">🏠 Establecer como principal</li>`;
    documentMenu.innerHTML += `<li data-action="set-doc-pass">🔑 Gestionar Contraseña</li>`;
    documentMenu.innerHTML += `<li data-action="delete" style="color: #e53935;">🗑️ Eliminar "${STATE.currentDocumentName}"</li>`;
  }

  /**
   * Renderizar tabs de favoritos
   */
  static renderTabs() {
    const tabsContainer = STATE.DOM.tabsContainer;
    tabsContainer.innerHTML = '';

    STATE.appData.favorites.forEach(favName => {
      const tab = document.createElement('button');
      tab.className = 'tab-button';
      const isProtected = STATE.appData.documentPasswords[favName] ? '🔒' : '';
      tab.textContent = `${favName} ${isProtected}`;
      tab.dataset.docName = favName;
      if (favName === STATE.currentDocumentName) {
        tab.classList.add('active');
      }
      tabsContainer.appendChild(tab);
    });
  }
}

// Exportar globalmente
window.NoteRenderer = NoteRenderer;
window.createNote = NoteRenderer.createNote.bind(NoteRenderer);
window.renderNoteState = NoteRenderer.renderNoteState.bind(NoteRenderer);
window.renderView = NoteRenderer.renderView.bind(NoteRenderer);
window.renderAppUI = NoteRenderer.renderAppUI.bind(NoteRenderer);
window.loadNotesFromData = NoteRenderer.loadNotesFromData.bind(NoteRenderer);
