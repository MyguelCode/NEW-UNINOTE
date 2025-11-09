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

// Cargar UI y Features
import { NoteRenderer } from './ui/NoteRenderer.js';
import { Features } from './features/Features.js';

// Exportar UI y Features globalmente
window.NoteRenderer = NoteRenderer;
window.Features = Features;

// IMPORTANTE: uninote-legacy.js ha sido renombrado a uninote-legacy-BACKUP.js
// La aplicación ahora usa completamente los módulos refactorizados
// Si necesitas referencia al código original, consulta uninote-legacy-BACKUP.js

// El código legacy funcional ahora está en módulos separados:
// - Services: NotificationService, SearchService, ArchiveService, etc.
// - Controllers: StateController, NoteController, DocumentController, etc.
// - UI: NoteRenderer
// - Features: Features (emoji, formatting, notifications, bulk actions)

console.log('📦 Arquitectura modular cargada completamente');
console.log('✨ Legacy code respaldado en: uninote-legacy-BACKUP.js');

// NOTA: El código legacy (2,746 líneas) ha sido refactorizado en 13 módulos
// Ver REFACTORIZATION.md para detalles completos
