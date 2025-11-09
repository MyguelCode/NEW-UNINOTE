/**
 * securityEvents.js - Security and password management event handlers
 */

import { STATE } from '../config/state.js';
import { StateController } from '../controllers/StateController.js';
import { NoteRenderer } from '../ui/NoteRenderer.js';
import { SecurityService } from '../services/SecurityService.js';
import { NoteController } from '../controllers/NoteController.js';

export function initializeSecurityEvents() {
  const lockMenu = document.getElementById('lock-menu');
  const unlockModalOverlay = document.getElementById('unlock-modal-overlay');
  const unlockPasswordInput = document.getElementById('unlock-password-input');
  const unlockConfirmBtn = document.getElementById('unlock-confirm-btn');
  const unlockCancelBtn = document.getElementById('unlock-cancel-btn');
  const appSettingsBtn = document.getElementById('app-settings-btn');
  const appLockEnableToggle = document.getElementById('app-lock-enable-toggle');

  // Lock menu click handler
  lockMenu.addEventListener('click', async (e) => {
    if (!STATE.activeNoteForLock) return;

    const noteToProcess = STATE.activeNoteForLock;
    const action = e.target.dataset.action;
    STATE.activeNoteForLock = null;
    lockMenu.style.display = 'none';

    // Unlock or remove lock - show password modal
    if (action === 'unlock' || action === 'remove-lock') {
      STATE.activeNoteForLock = noteToProcess;
      const title = action === 'unlock' ? 'Desbloquear Nota' : 'Confirmar para quitar bloqueo';
      unlockModalOverlay.querySelector('h2').textContent = title;
      unlockPasswordInput.value = '';
      unlockModalOverlay.classList.remove('hidden');
      unlockPasswordInput.focus();
      return;
    }

    // Relock note
    if (action === 'relock') {
      STATE.sessionUnlockedNotes.delete(noteToProcess.dataset.id);
      NoteRenderer.renderNoteState(noteToProcess);
      StateController.runUpdates();
      return;
    }

    // Apply lock with specific type
    const lockType = action.split('-')[1];

    const applyLock = (hash, type) => {
      const editable = noteToProcess.querySelector('.editable-note');
      noteToProcess.dataset.lockedContent = editable.innerHTML;
      noteToProcess.dataset.lockType = type;
      noteToProcess.dataset.lockHint = editable.textContent.substring(0, 30).trim() || "Nota bloqueada";
      noteToProcess.dataset.passwordHash = JSON.stringify(hash);
      NoteRenderer.renderNoteState(noteToProcess);
      StateController.runUpdates();
      window.NotificationService.showNotification('Nota bloqueada.');
    };

    if (lockType === 'universal') {
      applyLock(STATE.appData.universalPasswordHash, 'universal');
    } else if (lockType === 'document') {
      applyLock(STATE.appData.documentPasswords[STATE.currentDocumentName], 'document');
    } else if (lockType === 'exclusive') {
      const { newPass, newHint } = await SecurityService.showSetPasswordModal('Crear Bloqueo Exclusivo', true);
      if (newPass) {
        const hashData = await SecurityService.hashPasswordWithSalt(newPass);
        const noteToLock = noteToProcess;
        noteToLock.dataset.lockedContent = noteToLock.querySelector('.editable-note').innerHTML;
        noteToLock.dataset.lockType = 'exclusive';
        noteToLock.dataset.lockHint = newHint || 'Contenido bloqueado';
        noteToLock.dataset.passwordHash = JSON.stringify(hashData);
        NoteRenderer.renderNoteState(noteToLock);
        StateController.runUpdates();
        window.NotificationService.showNotification('Nota bloqueada con contraseña exclusiva.');
      }
    }
  });

  // Unlock confirm button
  unlockConfirmBtn.addEventListener('click', async () => {
    if (!STATE.activeNoteForLock) return;

    const noteToProcess = STATE.activeNoteForLock;
    const actionTitle = unlockModalOverlay.querySelector('h2').textContent;
    const isRemovingLock = actionTitle.includes('quitar');

    const pass = unlockPasswordInput.value;
    const hashData = JSON.parse(noteToProcess.dataset.passwordHash);

    const isCorrect = await SecurityService.verifyPassword(pass, hashData);
    unlockPasswordInput.value = '';

    if (isCorrect) {
      unlockModalOverlay.classList.add('hidden');

      if (isRemovingLock) {
        window.permanentlyRemoveLock(noteToProcess);
        window.NotificationService.showNotification('Bloqueo de nota eliminado permanentemente.');
      } else {
        STATE.sessionUnlockedNotes.add(noteToProcess.dataset.id);

        // Upgrade old password format
        if (typeof hashData === 'string') {
          const { note } = NoteController.findNoteData(STATE.currentNotesData, noteToProcess.dataset.id);
          if (note) {
            note.passwordHash = await SecurityService.hashPasswordWithSalt(pass);
            StateController.runUpdates();
            window.NotificationService.showNotification('Contraseña de nota actualizada a nuevo formato de seguridad.');
          }
        }

        NoteRenderer.renderNoteState(noteToProcess);
        StateController.runUpdates();
        window.NotificationService.showNotification('Nota desbloqueada.');
        noteToProcess.querySelector('.editable-note').focus();
      }

      STATE.activeNoteForLock = null;
    } else {
      window.NotificationService.showNotification('Contraseña incorrecta.', 'error');
      unlockPasswordInput.style.animation = 'shake 0.5s';
      setTimeout(() => { unlockPasswordInput.style.animation = '' }, 500);
    }
  });

  // Unlock cancel button
  unlockCancelBtn.addEventListener('click', () => {
    unlockModalOverlay.classList.add('hidden');
    STATE.activeNoteForLock = null;
  });

  // App settings button
  appSettingsBtn.addEventListener('click', () => {
    document.getElementById('app-settings-modal-overlay').classList.remove('hidden');
  });

  // Cancel app settings button
  document.getElementById('cancel-app-settings-btn').addEventListener('click', () => {
    document.getElementById('app-settings-modal-overlay').classList.add('hidden');
  });

  // App lock enable toggle
  appLockEnableToggle.addEventListener('change', async function (e) {
    const isChecked = e.target.checked;
    const appLockControls = document.getElementById('app-lock-controls');

    if (isChecked) {
      if (!STATE.appData.masterPasswordHash) {
        const { newPass } = await SecurityService.showSetPasswordModal('Crear Contraseña Maestra', false);
        if (newPass) {
          STATE.appData.masterPasswordHash = await SecurityService.hashPasswordWithSalt(newPass);
          if (window.saveAppDataAsync) {
            await window.saveAppDataAsync(STATE.appData);
          }
          appLockControls.classList.remove('hidden');
          window.NotificationService.showNotification('Bloqueo de aplicación activado.');
        } else {
          e.target.checked = false;
        }
      } else {
        appLockControls.classList.remove('hidden');
      }
    } else {
      const confirmed = await window.NotificationService.showConfirmationModal(
        'Desactivar Bloqueo de Aplicación',
        '¿Deseas desactivar completamente el bloqueo de aplicación? Esta acción NO eliminará la contraseña maestra.'
      );

      if (confirmed) {
        appLockControls.classList.add('hidden');
        window.NotificationService.showNotification('Bloqueo de aplicación desactivado.');
      } else {
        e.target.checked = true;
      }
    }
  });

  // Password management buttons
  document.getElementById('app-lock-create-btn').addEventListener('click', () => SecurityService.managePassword('master', 'create'));
  document.getElementById('app-lock-change-btn').addEventListener('click', () => SecurityService.managePassword('master', 'change'));
  document.getElementById('app-lock-remove-btn').addEventListener('click', () => SecurityService.managePassword('master', 'remove'));
  document.getElementById('universal-create-btn').addEventListener('click', () => SecurityService.managePassword('universal', 'create'));
  document.getElementById('universal-change-btn').addEventListener('click', () => SecurityService.managePassword('universal', 'change'));
  document.getElementById('universal-remove-btn').addEventListener('click', () => SecurityService.managePassword('universal', 'remove'));
}
