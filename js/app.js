// === UNINOTE - APLICACIÓN PRINCIPAL ===

import { STATE } from './config/state.js';
import { initDOMReferences } from './init/domReferences.js';
import { initialize } from './init/initialization.js';
import './core/storageHelper.js'; // Expone funciones globales para legacy

// IMPORTANTE: Este archivo carga los módulos base
// El código funcional completo está en uninote-legacy.js
// que se ejecuta automáticamente al final

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 Uninote iniciando (modo híbrido)...');

  try {
    // 1. Inicializar referencias DOM
    initDOMReferences();

    // 2. Inicializar aplicación (tema, datos básicos)
    await initialize();

    // 3. El resto del código se ejecuta desde uninote-legacy.js
    console.log('✅ Uninote cargado correctamente');
    console.log('📦 Módulos base: Config, Core, Models, Services (parcial)');
    console.log('⚙️ Lógica principal: uninote-legacy.js');

  } catch (error) {
    console.error('❌ Error al inicializar Uninote:', error);
  }
});

// Exportar STATE para uso global (compatible con legacy)
window.UNINOTE_STATE = STATE;

// Cargar el código legacy funcional
import './uninote-legacy.js';
