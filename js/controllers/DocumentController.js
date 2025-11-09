/**
 * DocumentController - Gestión de documentos (Uninotes)
 */

import { STATE } from '../config/state.js';

export class DocumentController {

  /**
   * Cambiar de documento
   */
  static async switchDocument(docName) {
    if (docName === STATE.currentDocumentName) return;

    // Guardar documento actual
    if (window.saveCurrentDocument) {
      await window.saveCurrentDocument();
    }

    // Verificar si el documento está bloqueado
    if (STATE.appData.documentPasswords[docName] && !STATE.unlockedDocuments.has(docName)) {
      if (window.promptForDocumentPassword) {
        const unlocked = await window.promptForDocumentPassword(docName, 'unlock');
        if (unlocked) {
          STATE.unlockedDocuments.add(docName);
        } else {
          if (window.showNotification) {
            window.showNotification('Acceso al Uninote denegado.', 'error');
          }
          return;
        }
      }
    }

    STATE.sessionUnlockedNotes.clear();
    STATE.currentDocumentName = docName;
    STATE.appData.activeDocument = docName;

    // Cargar desde IndexedDB
    let notesData;
    if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
      notesData = await window.loadDocumentAsync(docName);
      console.log('📖 Cargado desde IndexedDB - Orden:', notesData ? notesData.map((n, idx) => `${idx}: ${n.content.substring(0, 20)}`) : 'Sin datos');
    } else {
      const notesDataRaw = localStorage.getItem(`uninote_doc_${docName}`);
      notesData = notesDataRaw ? JSON.parse(notesDataRaw) : [];
    }

    STATE.currentNotesData = notesData || [];

    // Renderizar UI
    if (window.renderAppUI) {
      window.renderAppUI();
    }

    // Guardar app data
    if (window.saveAppDataAsync) {
      await window.saveAppDataAsync(STATE.appData);
    }
  }

  /**
   * Crear nuevo documento
   */
  static async createNewDocument() {
    if (!window.showPromptModal || !window.showAlertModal) return;

    const docName = await window.showPromptModal(
      "Nuevo Uninote",
      "Introduce el nombre del nuevo Uninote:",
      {defaultValue: "Nuevo Uninote"}
    );

    if (docName && docName.trim() !== '') {
      if (STATE.appData.documents.includes(docName.trim())) {
        await window.showAlertModal("Error", "Ya existe un Uninote con ese nombre.");
        return;
      }

      const newDocName = docName.trim();
      STATE.appData.documents.push(newDocName);

      if (window.saveNotesToStorage) {
        await window.saveNotesToStorage(newDocName, []);
      }

      await this.switchDocument(newDocName);
    }
  }

  /**
   * Guardar documento actual
   */
  static async saveCurrentDocument() {
    if (STATE.isInitializing) return;
    if (!STATE.currentDocumentName ||
        (STATE.appData.documentPasswords[STATE.currentDocumentName] &&
         !STATE.unlockedDocuments.has(STATE.currentDocumentName))) {
      return;
    }

    console.log('💾 Guardando documento:', STATE.currentDocumentName, 'con', STATE.currentNotesData.length, 'notas');

    if (window.saveNotesToStorage) {
      await window.saveNotesToStorage(STATE.currentDocumentName, STATE.currentNotesData);
    }

    if (window.saveAppDataAsync) {
      await window.saveAppDataAsync(STATE.appData);
    }

    console.log('✅ Documento guardado correctamente');
  }
}
