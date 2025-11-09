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
    console.log('🔍 window.isUsingIndexedDB:', typeof window.isUsingIndexedDB);
    console.log('🔍 window.isUsingIndexedDB():', window.isUsingIndexedDB ? window.isUsingIndexedDB() : 'UNDEFINED');
    console.log('🔍 window.loadDocumentAsync:', typeof window.loadDocumentAsync);

    let notesData;
    if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
      console.log('✅ Usando IndexedDB para cargar documento');
      notesData = await window.loadDocumentAsync(docName);
      console.log('📖 Cargado desde IndexedDB - Orden:', notesData ? notesData.map((n, idx) => `${idx}: ${n.content.substring(0, 20)}`) : 'Sin datos');
    } else {
      console.log('⚠️ Usando localStorage como fallback');
      const notesDataRaw = localStorage.getItem(`uninote_doc_${docName}`);
      notesData = notesDataRaw ? JSON.parse(notesDataRaw) : [];
    }

    console.log('📊 Notas cargadas:', notesData.length);
    STATE.currentNotesData = notesData || [];

    // Renderizar UI
    console.log('🎨 Renderizando UI...');
    console.log('🔍 window.renderAppUI:', typeof window.renderAppUI);
    if (window.renderAppUI) {
      window.renderAppUI();
      console.log('✅ UI renderizada');
    } else {
      console.error('❌ window.renderAppUI NO ESTÁ DEFINIDO');
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
