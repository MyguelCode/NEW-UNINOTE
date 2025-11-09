// === UNINOTE - APLICACIÓN PRINCIPAL (REFACTORIZADO) ===

import { STATE } from './config/state.js';
import { initDOMReferences } from './init/domReferences.js';
import { initialize } from './init/initialization.js';
import './core/storageHelper.js'; // Expone funciones globales para legacy

// === SERVICIOS ===
import { NotificationService } from './services/NotificationService.js';
import { SearchService } from './services/SearchService.js';
import { ArchiveService } from './services/ArchiveService.js';
import { ExportImportService } from './services/ExportImportService.js';
import { SecurityService } from './services/SecurityService.js';

// === CONTROLADORES ===
import { NoteController } from './controllers/NoteController.js';
import { DocumentController } from './controllers/DocumentController.js';
import { StateController } from './controllers/StateController.js';
import { ArchiveController } from './controllers/ArchiveController.js';

// === CORE ===
import { eventBus } from './core/eventBus.js';

// IMPORTANTE: Este archivo carga los módulos refactorizados
// El código funcional completo está en uninote-legacy.js
// que se ejecuta automáticamente al final

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 Uninote iniciando (modo híbrido refactorizado)...');

  try {
    // 1. Inicializar referencias DOM
    initDOMReferences();

    // 2. Inicializar aplicación (tema, datos básicos)
    await initialize();

    // 3. El resto del código se ejecuta desde uninote-legacy.js
    console.log('✅ Uninote cargado correctamente');
    console.log('📦 Módulos refactorizados: Services, Controllers, Core');
    console.log('⚙️ Lógica principal: uninote-legacy.js');

  } catch (error) {
    console.error('❌ Error al inicializar Uninote:', error);
  }
});

// === EXPORTAR PARA COMPATIBILIDAD GLOBAL ===
window.UNINOTE_STATE = STATE;

// Servicios
window.NotificationService = NotificationService;
window.SearchService = SearchService;
window.ArchiveService = ArchiveService;
window.ExportImportService = ExportImportService;
window.SecurityService = SecurityService;

// Controladores
window.NoteController = NoteController;
window.DocumentController = DocumentController;
window.StateController = StateController;
window.ArchiveController = ArchiveController;

// Core
window.eventBus = eventBus;

// Helpers para legacy (delegación a nuevos servicios)
window.showNotification = NotificationService.showNotification.bind(NotificationService);
window.showAlertModal = NotificationService.showAlertModal.bind(NotificationService);
window.showConfirmationModal = NotificationService.showConfirmationModal.bind(NotificationService);
window.showPromptModal = NotificationService.showPromptModal.bind(NotificationService);
window.showDuplicateModal = NotificationService.showDuplicateModal.bind(NotificationService);

window.performLocalSearch = SearchService.performLocalSearch.bind(SearchService);
window.performGlobalSearch = SearchService.performGlobalSearch.bind(SearchService);

window.promptForDocumentPassword = SecurityService.promptForDocumentPassword.bind(SecurityService);

window.saveCurrentDocument = DocumentController.saveCurrentDocument.bind(DocumentController);

// Cargar el código legacy funcional
import './uninote-legacy.js';
