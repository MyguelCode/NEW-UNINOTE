// === UNINOTE - Storage Helper ===
// Helper global para que uninote-legacy.js pueda usar StorageService sin modificar mucho código

import { StorageService } from '../services/StorageService.js';

/**
 * Funciones globales para compatibilidad con código legacy
 * Estas funciones son wrappers síncronos que llaman a StorageService
 */

/**
 * Guarda appData (asíncrono)
 */
window.saveAppDataAsync = async function(appData) {
  return await StorageService.saveAppData(appData);
};

/**
 * Carga appData (asíncrono)
 */
window.loadAppDataAsync = async function() {
  return await StorageService.loadAppData();
};

/**
 * Guarda un documento (asíncrono)
 */
window.saveDocumentAsync = async function(docName, notesData) {
  return await StorageService.saveDocument(docName, notesData);
};

/**
 * Carga un documento (asíncrono)
 */
window.loadDocumentAsync = async function(docName) {
  return await StorageService.loadDocument(docName);
};

/**
 * Guarda una configuración (asíncrono)
 */
window.saveSettingAsync = async function(key, value) {
  return await StorageService.saveSetting(key, value);
};

/**
 * Carga una configuración (asíncrono)
 */
window.loadSettingAsync = async function(key) {
  return await StorageService.loadSetting(key);
};

/**
 * Verifica si estamos usando IndexedDB
 */
window.isUsingIndexedDB = function() {
  return StorageService.useIndexedDB;
};

/**
 * Obtiene estadísticas de almacenamiento
 */
window.getStorageStats = async function() {
  return await StorageService.getStats();
};

// Exportar StorageService para uso en módulos
export { StorageService };
export default StorageService;
