    document.addEventListener('DOMContentLoaded', () => {
      // --- Declaración de constantes de elementos del DOM ---
      const documentTitle = document.getElementById('document-title');
      const documentMenu = document.getElementById('document-menu');
      const tabsContainer = document.getElementById('tabs-container');
      const notesList = document.getElementById('notes-list');
      const searchInput = document.getElementById('search-input');
      const searchAllToggle = document.getElementById('search-all-toggle');
      const globalSearchResults = document.getElementById('global-search-results');
      const addMainNoteBtn = document.getElementById('add-main-note-btn');
      const relockDocBtn = document.getElementById('relock-doc-btn');
      const iconPicker = document.getElementById('icon-picker');
      const contextMenu = document.getElementById('context-menu');
      const removeIconBtn = document.getElementById('remove-icon-btn');
      const lockMenu = document.getElementById('lock-menu');
      const formattingToolbar = document.getElementById('formatting-toolbar');
      const fontSizeInput = document.getElementById('font-size-input');
      const importFileInput = document.getElementById('import-file-input');
      const importNotionInput = document.getElementById('import-notion-input'); 
      const notificationArea = document.getElementById('notification-area');
      const confirmationModalOverlay = document.getElementById('confirmation-modal-overlay');
      const importModalOverlay = document.getElementById('import-modal-overlay');
      const toggleAllBtn = document.getElementById('toggle-all-btn');
      const bulkActionsBar = document.getElementById('bulk-actions-bar');
      const selectionCounter = document.getElementById('selection-counter');
      const deleteSelectedBtn = document.getElementById('delete-selected-btn');
      const deselectAllBtn = document.getElementById('deselect-all-btn');
      const scrollButtons = document.getElementById('scroll-buttons');
      const scrollTopBtn = document.getElementById('scroll-top-btn');
      const scrollBottomBtn = document.getElementById('scroll-bottom-btn');
      const themeToggleBtn = document.getElementById('theme-toggle-btn');
      const helpBtn = document.getElementById('help-btn');
      const helpModalOverlay = document.getElementById('help-modal-overlay');
      const helpCloseBtn = document.getElementById('help-close-btn');
      const indentSelectedBtn = document.getElementById('indent-selected-btn');
      const outdentSelectedBtn = document.getElementById('outdent-selected-btn');
      const selectChildrenBtn = document.getElementById('select-children-btn');
      const datePickerModalOverlay = document.getElementById('date-picker-modal-overlay');
      const dateTimeInput = document.getElementById('date-time-input');
      const saveDateBtn = document.getElementById('save-date-btn');
      const removeDateBtn = document.getElementById('remove-date-btn');
      const cancelDateBtn = document.getElementById('cancel-date-btn');
      const notificationCenterBtn = document.getElementById('notification-center-btn');
      const notificationDot = document.getElementById('notification-dot');
      const notificationCenterOverlay = document.getElementById('notification-center-overlay');
      const notificationCenterCloseBtn = document.getElementById('notification-center-close-btn');
      const notificationList = document.getElementById('notification-list');
      const toggleArchiveViewBtn = document.getElementById('toggle-archive-view-btn');
      const archiveViewContainer = document.getElementById('archive-view-container');
      const archiveControls = document.getElementById('archive-controls');
      const archiveSortSelect = document.getElementById('archive-sort-select');
      const archiveTimelineContainer = document.getElementById('archive-timeline-container');
      const appSettingsBtn = document.getElementById('app-settings-btn');
      const appLockOverlay = document.getElementById('app-lock-overlay');
      const appLockPasswordInput = document.getElementById('app-lock-password-input');
      const appLockUnlockBtn = document.getElementById('app-lock-unlock-btn');
      const transferBtn = document.getElementById('transfer-btn');
      const transferMenu = document.getElementById('transfer-menu');
      const appLockEnableToggle = document.getElementById('app-lock-enable-toggle');
      const notesCounter = document.getElementById('notes-counter');
      const unarchiveModalOverlay = document.getElementById('unarchive-modal-overlay');
      const unarchiveToOriginalBtn = document.getElementById('unarchive-to-original-btn');
      const unarchiveToOtherBtn = document.getElementById('unarchive-to-other-btn');
      const unarchiveOptionsList = document.getElementById('unarchive-options-list');
      const unarchiveCancelBtn = document.getElementById('unarchive-cancel-btn');


      // --- Variables de Estado Global ---
      let appData = {};
      let currentDocumentName = '';
      let currentNotesData = [];
      let unlockedDocuments = new Set();
      let sessionUnlockedNotes = new Set();
      let isArchiveViewActive = false;
      let draggedElement = null, dropTarget = null, activeNoteForMenu = null, lastSelectionRange = null;
      let activeNoteForDatePicker = null; 
      let saveTimeout;
      let selectedNotes = new Set();
      let activeNoteForLock = null;
      let activeNoteForUnarchive = null;
      let isInitializing = true; 
      const commonEmojis = ["⭐", "👍", "👎", "🚨", "💡", "😀", "❤️", "💲", "✈️", "📌", "🔑", "✏️", "🎈", "🔍", "⏰", "💻", "📱", "🏠", "📧", "🔒", "📞", "❗", "🚫", "💯", "🔥", "✅"];
      const emojis = {
          smileys: ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "?", "😘", "🥰", "😗", "😙", "😚", "🙂", "🤗", "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "🤯", "😬", "😰", "😱", "🥵", "🥶", "😳", "🤪", "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "😇", "🤠", "🤡", "🥳", "🥴", "🥺", "🤥", "🤫", "🤭", "🧐", "🤓", "👤", "👥"],
          animals: ["🙈", "🙉", "🙊", "🐵", "🐶", "🐺", "🐱", "🦁", "🐯", "🦒", "🦊", "🦝", "🐮", "🐷", "🐗", "🐭", "🐹", "🐰", "🐻", "🐨", "🐼", "🐸", "🦓", "🐴", "🦄", "🐔", "🐲", "🐢", "🐍", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦍", "🦧", "🐘", "🦛", "🦏", "🐪", "🐫", "🦘", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🐕", "🐩", "🦮", "🐕‍🦺", "🐈", "🐓", "🦃", "𦚰", "🦜", "🦢", "🦩", "🕊️", "🐇", "🦨", "🦡", "🦦", "🦥", "🐁", "🐀", "🐿️", "🦔", "🐾", "🌲", "🌳", "🌴", "🌵", "🌾", "🌿", "☘️", "🍀", "🍁", "🍂", "🍃"],
          food: ["🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🥝", "🍅", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶️", "🥒", "🥬", "🥦", "🧄", "🧅", "🍄", "🥜", "🌰", "🍞", "🥐", "🥖", "🥨", "🥯", "🥞", "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🥙", "🧆", "🥚", "🍳", "🥘", "🍲", "🥣", "🥗", "🍿", "🧈", "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🦀", "🦞", "🦐", "🦑", "🦪", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃"],
          activities: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🥅", "⛳", "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛷", "⛸️", "🥌", "🎿", "⛷️", "🏂", "🪂", "🏋️", "🤼", "🤸", "🤺", "🏇", "🏄", "🏊", "🤽", "🚣", "🧗", "🚵", "🚴", "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "🏵️", "🎗️", "🎫", "🎟️", "🎪", "🤹", "🎭", "🎬", "🎨", "🎤", "🎧", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🪕", "🎻", "🎲", "♟️", "🎯", "🎳", "🎮", "🎰"],
          objects: ["💡", "💻", "📱", "⌚", "⏰", "⏳", "⌛", "📞", "📧", "💰", "💲", "📈", "📉", "🔑", "🔒", "🔓", "🔎", "🚗", "✈️", "🏠", "🏢", "🍽️", "☕", "📸", "📹", "🎥", "📽️", "🎞️", "📟", "📠", "📺", "📻", "🎙️", "🎚️", "🎛️", "🧭", "⏱️", "⏲️", "🕰️", "🌡️", "⚖️", "🔧", "🔨", "⚒️", "🛠️", "⛏️", "🔩", "⚙️", "🧱", "⛓️", "🧰", "🧲", "🔫", "💣", "🔪", "🗡️", "🛡️", "🚬", "⚰️", "⚱️", "🏺", "🔮", "📿", "🧿", "💈", "⚗️", "🔭", "🔬", "🕳️", "💊", "💉", "🩸", "🧬", "🦠", "🧫", "🧪", "🧹", "🧺", "🧻", "🚽", "🚰", "🚿", "🛁", "🧼", "🪒", "🧽", "🧴", "🛎️", "🗝️", "🚪", "🛋️", "🛏️", "🛌", "🧸", "🖼️", "🛍️", "🛒", "🎁", "🎈", "🎏", "🎀", "🎊", "🎉", "🎎", "🏮", "🎐", "🧧", "✉️", "📩", "📨", "💌", "📮", "📪", "📫", "📬", "📭", "📦", "📊", "📄", "📃", "📑", "🧾", "🗓️", "📆", "📅", "🗑️", "🗒️", "📇", "🗃️", "🗳️", "🗄️", "📋", "📁", "📂", "🗂️", "🗞️", "📰", "📓", "📔", "📒", "📕", "📗", "📘", "📙", "📚", "📖", "🔖", "🧷", "🔗", "📎", "🖇️", "📐", "📏", "🧮", "📌", "📍", "✂️", "🖊️", "🖋️", "✒️", "🖌️", "🖍️", "📝"],
          symbols: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉️", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓", "🆔", "⚛️", "🉑", "☢️", "☣️", "📴", "📳", "🈶", "🈚", "🈸", "🈺", "🈷️", "✴️", "🆚", "💮", "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈹", "🈲", "🅰️", "🅱️", "🆎", "🆑", "🅾️", "🆘", "❌", "⭕", "🛑", "⛔", "📛", "🚫", "💯", "💢", "♨️", "🚷", "🚯", "🚳", "🚱", "🔞", "📵", "🚭", "❗", "❕", "❓", "❔", "‼️", "⁉️", "🔅", "🔆", "〽️", "⚠️", "🚸", "🔱", "⚜️", "🔰", "♻️", "✅", "🈯", "💹", "❇️", "✳️", "❎", "🌐", "💠", "Ⓜ️", "🌀", "💤", "🏧", "🚾", "♿", "🅿️", "🈳", "🈂️", "🛂", "🛃", "🛄", "🛅", "🚹", "🚺", "🚼", "🚻", "🚮", "🎦", "📶", "🈁", "🔣", "ℹ️", "🔤", "🔡", "🔠", "🆖", "🆗", "🆙", "🆒", "🆕", "🆓", "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟", "🔢", "#️⃣", "*️⃣", "⏏️", "▶️", "⏸️", "⏯️", "⏹️", "⏺️", "⏭️", "⏮️", "⏩", "⏪", "⏫", "⏬", "◀️", "🔼", "🔽", "➡️", "⬅️", "⬆️", "⬇️", "↗️", "↘️", "↙️", "↖️", "↕️", "↔️", "↪️", "↩️", "⤴️", "⤵️", "🔀", "🔁", "🔂", "🔄", "🔃", "🎵", "🎶", "➕", "➖", "➗", "✖️", "♾️", "💲", "💱", "™️", "©️", "®️", "〰️", "➰", "➿", "🔚", "🔙", "🔛", "🔝", "🔜", "✔️", "☑️", "🔘", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤", "🔺", "🔻", "⬜", "⬛", "◼️", "◻️", "◾", "◽", "▪️", "▫️", "🔶", "🔷", "🔸", "🔹", "🔼", "🔽"]
      };
      // recentEmojis se cargará desde IndexedDB en initializeAppLogic()
      let recentEmojis = [];

      // --- Sección de Declaración de Funciones ---

      // --- Security Functions (Upgraded to PBKDF2) ---
      function bufferToHex(buffer) {
          return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      }

      function hexToBuffer(hex) {
          const bytes = new Uint8Array(hex.length / 2);
          for (let i = 0; i < hex.length; i += 2) {
              bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
          }
          return bytes.buffer;
      }
      
      async function hashPasswordWithSalt(password) {
        if (!password) return null;
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iterations = 100000;
        const encoder = new TextEncoder();
        
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            { name: 'PBKDF2' },
            false,
            ['deriveBits']
        );
        
        const derivedBits = await crypto.subtle.deriveBits(
            { name: 'PBKDF2', salt: salt, iterations: iterations, hash: 'SHA-256' },
            keyMaterial,
            256
        );
        
        return {
            hash: bufferToHex(derivedBits),
            salt: bufferToHex(salt),
            iterations: iterations
        };
      }
      
      async function verifyPassword(password, storedHashData) {
        if (!password || !storedHashData) return false;

        // --- Backward compatibility for old simple SHA-256 hashes ---
        if (typeof storedHashData === 'string') {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashHex = bufferToHex(hashBuffer);
            return hashHex === storedHashData;
        }
        // --- End of backward compatibility ---

        const { hash, salt, iterations } = storedHashData;
        const encoder = new TextEncoder();

        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            { name: 'PBKDF2' },
            false,
            ['deriveBits']
        );

        const derivedBits = await crypto.subtle.deriveBits(
            { name: 'PBKDF2', salt: hexToBuffer(salt), iterations: iterations, hash: 'SHA-256' },
            keyMaterial,
            256
        );
        
        return bufferToHex(derivedBits) === hash;
      }
      
      function renderNoteState(noteLi) {
        const hasLockData = noteLi.dataset.lockType && noteLi.dataset.passwordHash;
        const isTemporarilyUnlocked = sessionUnlockedNotes.has(noteLi.dataset.id);

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
            linkify(editable);
        }
        updateToggleVisibilityForNote(noteLi);
      }
      
      function permanentlyRemoveLock(noteLi) {
        const originalContent = noteLi.dataset.lockedContent || '';
        noteLi.removeAttribute('data-lock-type');
        noteLi.removeAttribute('data-password-hash');
        noteLi.removeAttribute('data-lock-hint');
        noteLi.removeAttribute('data-locked-content');
        sessionUnlockedNotes.delete(noteLi.dataset.id);
        
        const editable = noteLi.querySelector('.editable-note');
        editable.innerHTML = originalContent;
        renderNoteState(noteLi); 
        runUpdates();
      }

      function showAlertModal(title, message) {
        return new Promise(resolve => {
            document.getElementById('alert-title').textContent = title;
            document.getElementById('alert-message').textContent = message;
            const alertOverlay = document.getElementById('alert-modal-overlay');
            alertOverlay.classList.remove('hidden');
            const okBtn = document.getElementById('alert-ok-btn');
            okBtn.onclick = () => { alertOverlay.classList.add('hidden'); resolve(); };
        });
      }

      function showPromptModal(title, message, options = {}) {
        return new Promise(resolve => {
            document.getElementById('prompt-title').textContent = title;
            document.getElementById('prompt-message').textContent = message;
            const input = document.getElementById('prompt-input');
            input.value = options.defaultValue || '';
            input.type = options.type || 'text';
            input.placeholder = options.placeholder || '';

            const promptOverlay = document.getElementById('prompt-modal-overlay');
            promptOverlay.classList.remove('hidden');
            input.focus();
            input.select();
            const confirmBtn = document.getElementById('prompt-confirm-btn');
            const cancelBtn = document.getElementById('prompt-cancel-btn');
            const cleanup = () => {
                promptOverlay.classList.add('hidden');
                confirmBtn.onclick = null;
                cancelBtn.onclick = null;
                input.onkeydown = null;
            };
            confirmBtn.onclick = () => { cleanup(); resolve(input.value); };
            cancelBtn.onclick = () => { cleanup(); resolve(null); };
            input.onkeydown = (e) => {
                if (e.key === 'Enter') { e.preventDefault(); confirmBtn.click(); }
                else if (e.key === 'Escape') cancelBtn.click();
            };
        });
      }
      
      function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notificationArea.appendChild(notification);
        if(type === 'error'){
            notification.style.animationPlayState = 'running, running';
        }
        setTimeout(() => { notification.remove(); }, 3900);
      }

      function showConfirmationModal(title, message, options = {}) {
        return new Promise(resolve => {
            document.getElementById('confirmation-title').textContent = title;
            document.getElementById('confirmation-message').innerHTML = message;
            const confirmBtn = document.getElementById('confirmation-confirm-btn');
            const cancelBtn = document.getElementById('confirmation-cancel-btn');
            confirmBtn.textContent = options.confirmText || 'Confirmar';
            cancelBtn.textContent = options.cancelText || 'Cancelar';
            
            confirmationModalOverlay.classList.remove('hidden');
            const cleanup = () => {
                confirmationModalOverlay.classList.add('hidden');
                confirmBtn.onclick = null;
                cancelBtn.onclick = null;
            };
            confirmBtn.onclick = () => { cleanup(); resolve(true); };
            cancelBtn.onclick = () => { cleanup(); resolve(false); };
        });
      }

      function promptImportOption(importType) {
        return new Promise(resolve => {
            const importTitle = document.getElementById('import-title');
            const importMessage = document.getElementById('import-message');
            const replaceBtn = document.getElementById('import-action-replace');
            const appendBtn = document.getElementById('import-action-append');
            const mergeBtn = document.getElementById('import-action-merge');
            
            [replaceBtn, appendBtn, mergeBtn].forEach(btn => btn.style.display = 'none');

            if (importType === 'total') {
                importTitle.textContent = "Importar Backup Total";
                importMessage.innerHTML = "Este es un <strong>Backup Total</strong>. ¿Cómo deseas proceder?";
                replaceBtn.textContent = "Reemplazar Todo";
                mergeBtn.textContent = "Fusionar con Existente";
                replaceBtn.style.display = 'inline-block';
                mergeBtn.style.display = 'inline-block';
            } else { // 'legacy'
                importTitle.textContent = "Importar Notas";
                importMessage.textContent = `¿Cómo deseas importar estas notas al Uninote actual ("${currentDocumentName}")?`;
                replaceBtn.textContent = "Reemplazar notas actuales";
                appendBtn.textContent = "Agregar al final";
                replaceBtn.style.display = 'inline-block';
                appendBtn.style.display = 'inline-block';
            }

            importModalOverlay.classList.remove('hidden');
            
            const handleChoice = (choice) => {
                importModalOverlay.classList.add('hidden');
                resolve(choice);
            };
            
            replaceBtn.onclick = () => handleChoice('replace');
            appendBtn.onclick = () => handleChoice('append');
            mergeBtn.onclick = () => handleChoice('merge');
            document.getElementById('import-action-cancel').onclick = () => handleChoice('cancel');
        });
      }

      function showDuplicateModal() {
        return new Promise(resolve => {
            const duplicateOverlay = document.getElementById('duplicate-modal-overlay');
            const onlyNoteBtn = document.getElementById('duplicate-only-note-btn');
            const withChildrenBtn = document.getElementById('duplicate-with-children-btn');
            const cancelBtn = document.getElementById('duplicate-cancel-btn');

            duplicateOverlay.classList.remove('hidden');

            const cleanup = () => {
                duplicateOverlay.classList.add('hidden');
                onlyNoteBtn.onclick = null;
                withChildrenBtn.onclick = null;
                cancelBtn.onclick = null;
            };

            onlyNoteBtn.onclick = () => { cleanup(); resolve('only'); };
            withChildrenBtn.onclick = () => { cleanup(); resolve('with-children'); };
            cancelBtn.onclick = () => { cleanup(); resolve(null); };
        });
      }

      function linkify(element) {
        if (!element || (element.closest('.note') && element.closest('.note').classList.contains('is-locked'))) return;
        const urlRegex = /(https?:\/\/[^\s"'<>()]+)/g;
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, { acceptNode: (node) => node.parentElement.tagName !== 'A' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT });
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

      function populateEmojiPicker() {
          const commonPanel = document.getElementById('panel-common');
          commonPanel.innerHTML = '';
          commonEmojis.forEach(emoji => {
              const btn = document.createElement('button');
              btn.textContent = emoji;
              commonPanel.appendChild(btn);
          });
          for (const category in emojis) {
              const panel = document.getElementById(`panel-${category}`);
              if(!panel) continue;
              panel.innerHTML = '';
              emojis[category].forEach(emoji => {
                  const btn = document.createElement('button');
                  btn.textContent = emoji;
                  panel.appendChild(btn);
              });
          }
          updateRecentEmojis();
      }

      function updateRecentEmojis() {
          const panel = document.getElementById('panel-recents');
          if(!panel) return;
          panel.innerHTML = '';
          recentEmojis.forEach(emoji => {
              const btn = document.createElement('button');
              btn.textContent = emoji;
              panel.appendChild(btn);
          });
      }
      
      async function addEmojiToRecents(emoji) {
          recentEmojis = recentEmojis.filter(e => e !== emoji);
          recentEmojis.unshift(emoji);
          if (recentEmojis.length > 24) recentEmojis.pop();

          // Guardar en IndexedDB
          if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
              await window.saveSettingAsync('Recents', recentEmojis);
          } else {
              localStorage.setItem('uninoteRecents', JSON.stringify(recentEmojis));
          }
          updateRecentEmojis();
      }
      
      function showFormattingToolbar() {
        setTimeout(() => {
          const selection = window.getSelection();
          if (!selection.rangeCount || selection.isCollapsed) {
            formattingToolbar.style.display = 'none';
            return;
          }
          const range = selection.getRangeAt(0);
          const parentEditable = range.commonAncestorContainer.parentElement.closest('.editable-note');
          if (parentEditable && !parentEditable.closest('.note.is-locked')) {
            lastSelectionRange = range.cloneRange();
            const rect = range.getBoundingClientRect();
            formattingToolbar.style.display = 'flex';
            const toolbarHeight = formattingToolbar.offsetHeight;
            const topPos = rect.top + window.scrollY - toolbarHeight - 5;
            formattingToolbar.style.top = `${topPos}px`;
            const leftPos = rect.left + window.scrollX + (rect.width / 2) - (formattingToolbar.offsetWidth / 2);
            formattingToolbar.style.left = `${Math.max(5, leftPos)}px`;
            
            updateToolbarState();
          } else {
              formattingToolbar.style.display = 'none';
          }
        }, 10);
      }

      function updateToolbarState() {
          if (!lastSelectionRange) return;
          const isBold = document.queryCommandState('bold');
          document.querySelector('[data-command="bold"]').classList.toggle('active', isBold);
          const container = lastSelectionRange.startContainer.nodeType === 1 ? lastSelectionRange.startContainer : lastSelectionRange.startContainer.parentElement;
          const sizeSpan = container.closest('span[style*="font-size"]');
          fontSizeInput.value = sizeSpan && sizeSpan.style.fontSize ? parseInt(sizeSpan.style.fontSize, 10) || 16 : 16;
      }
      
      function restoreSelection() {
          const selection = window.getSelection();
          if (lastSelectionRange) {
              selection.removeAllRanges();
              selection.addRange(lastSelectionRange);
          }
      }

      function applyStyle(command, value = null) {
          restoreSelection();
          try {
            document.execCommand(command, false, value);
          } catch (e) {
            console.error(`Error al ejecutar el comando ${command}:`, e);
          }
          const activeEditable = document.activeElement.closest('.editable-note');
          if (activeEditable && window.getSelection().rangeCount > 0) {
               lastSelectionRange = window.getSelection().getRangeAt(0).cloneRange();
               updateToolbarState();
          }
      }
      
      function changeFontSize(direction) {
        restoreSelection(); 
        if (!lastSelectionRange || lastSelectionRange.collapsed) return; 
        let currentSize = parseInt(fontSizeInput.value, 10);
        let newSize = direction === 'input' ? parseInt(fontSizeInput.value, 10) : (direction === 'increase' ? currentSize + 1 : currentSize - 1);
        newSize = Math.max(12, Math.min(24, newSize)); 
        const span = document.createElement('span');
        span.style.fontSize = `${newSize}px`;
        try {
            lastSelectionRange.surroundContents(span);
            const selection = window.getSelection();
            selection.removeAllRanges(); 
            const newRange = document.createRange();
            newRange.selectNodeContents(span); 
            selection.addRange(newRange); 
            lastSelectionRange = newRange.cloneRange(); 
        } catch (e) {
            console.warn("surroundContents falló.", e);
            restoreSelection();
        }
        updateToolbarState(); 
        const editable = span.closest('.editable-note');
        if (editable) editable.focus();
      }
      
      async function saveCurrentDocument() {
        if (isInitializing) return;
        if (!currentDocumentName || (appData.documentPasswords[currentDocumentName] && !unlockedDocuments.has(currentDocumentName))) {
            return;
        }

        console.log('💾 Guardando documento:', currentDocumentName, 'con', currentNotesData.length, 'notas');
        await saveNotesToStorage(currentDocumentName, currentNotesData);
        await saveAppData();
        console.log('✅ Documento guardado correctamente');
      }

      async function saveNotesToStorage(docName, notesData) {
          try {
              console.log('💿 Guardando en IndexedDB - Orden:', notesData.map((n, idx) => `${idx}: ${n.content.substring(0, 20)}`));
              // Usar StorageService en lugar de localStorage
              if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
                  await window.saveDocumentAsync(docName, notesData);
              } else {
                  // Fallback a localStorage
                  localStorage.setItem(`uninote_doc_${docName}`, JSON.stringify(notesData));
              }
          } catch(e) {
              console.error("Error al guardar notas:", e);
              showNotification("Error: No se pudieron guardar los cambios. El almacenamiento puede estar lleno.", 'error');
          }
      }

      async function saveAppData() {
          try {
              // Usar StorageService en lugar de localStorage
              if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
                  await window.saveAppDataAsync(appData);
              } else {
                  // Fallback a localStorage
                  localStorage.setItem('uninote_app_data', JSON.stringify(appData));
              }
          } catch(e) {
              console.error("Error al guardar configuración de la app:", e);
          }
      }

      function loadNotesFromData(notesData) {
        currentNotesData = JSON.parse(JSON.stringify(notesData || [])); 
        notesList.innerHTML = ''; 

        const activeNotes = currentNotesData.filter(note => !note.isArchived);

        const recursiveLoad = (dataArray, parentList) => {
            dataArray.forEach(noteData => {
                const li = createNote(parentList, null, false, noteData);
                if (noteData.children && noteData.children.length > 0) {
                    const sublist = document.createElement('ul');
                    sublist.className = 'subnotes';

                    // Restaurar estado de colapsado si existe
                    if (noteData.isCollapsed) {
                        sublist.classList.add('hidden');
                    }

                    li.appendChild(sublist);
                    recursiveLoad(noteData.children, sublist);
                }
                renderNoteState(li);
            });
        };

        recursiveLoad(activeNotes, notesList);
        ensureAtLeastOneNote();
        runUpdates(); 
      }

      const createNote = (parentList, afterElement = null, shouldFocus = false, data = {}) => {
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
      };

      const ensureAtLeastOneNote = () => {
        const isDocLocked = appData.documentPasswords[currentDocumentName] && !unlockedDocuments.has(currentDocumentName);
        if (!isDocLocked && !isArchiveViewActive) {
            const activeNotes = currentNotesData.filter(n => !n.isArchived);
            if(activeNotes.length === 0) {
              const newNoteData = { id: crypto.randomUUID(), content: '', status: 'todo', creationDate: new Date().toISOString(), children: [] };
              currentNotesData.push(newNoteData);
              const newNoteLi = createNote(notesList, null, true, newNoteData);
              renderNoteState(newNoteLi);
              runUpdates();
            }
        }
      };
      
      const updateToggleVisibilityForNote = (noteLi) => {
          const toggleBtn = noteLi.querySelector('[data-action="toggle"]');
          if (noteLi.classList.contains('is-locked')) {
            toggleBtn.classList.remove('toggle-visible');
            return;
          }
          const sublist = noteLi.querySelector('ul.subnotes');
          const hasChildren = sublist && sublist.children.length > 0;
          toggleBtn.classList.toggle('toggle-visible', hasChildren);
          if (hasChildren) {
              toggleBtn.textContent = sublist.classList.contains('hidden') ? '▶' : '▼';
              toggleBtn.title = 'Expandir/Colapsar';
          }
      };
      const updateToggleVisibility = () => document.querySelectorAll('.note').forEach(updateToggleVisibilityForNote);
      
      const updateIconVisibility = () => {
        document.querySelectorAll('.note-icon').forEach(icon => {
            icon.classList.toggle('icon-visible', icon.textContent.trim() !== '');
        });
      };

      const updateNumbers = () => {
        if (isArchiveViewActive) return;
        const recursiveUpdate = (list) => {
          const items = Array.from(list.children).filter(child => child.tagName === 'LI' && !child.classList.contains('is-locked'));
          items.forEach((li, index) => {
            const numberSpan = li.querySelector('.note-number');
            if (numberSpan) {
                numberSpan.textContent = `${index + 1}.`;
            }
            const sublist = li.querySelector('ul.subnotes');
            if (sublist) {
                recursiveUpdate(sublist);
            }
          });
        };
        recursiveUpdate(notesList);
      };

      const updateNotesCounter = () => {
        let mainCount = 0;
        let totalCount = 0;
        
        const countRecursive = (notes) => {
            let count = notes.length;
            notes.forEach(note => {
                if(note.children) {
                    count += countRecursive(note.children);
                }
            });
            return count;
        };

        if (currentNotesData) {
            const activeNotes = currentNotesData.filter(n => !n.isArchived);
            mainCount = activeNotes.length;
            totalCount = countRecursive(activeNotes);
        }

        notesCounter.textContent = `Principales: ${mainCount} / Total: ${totalCount}`;
      };

      function updateBulkActionsBar() {
        const count = selectedNotes.size;
        if (count > 0) {
            selectionCounter.textContent = `${count} nota${count > 1 ? 's' : ''} seleccionada${count > 1 ? 's' : ''}`;
            bulkActionsBar.classList.add('visible');
        } else {
            bulkActionsBar.classList.remove('visible');
        }
      }

      const updateAllCountdowns = () => {
        const now = new Date();
        document.querySelectorAll('.note:not(.is-locked)').forEach(note => {
          const timerSpan = note.querySelector('.countdown-timer');
          const dueDateString = note.dataset.dueDate;
          const creationDateString = note.dataset.creationDate;
          note.classList.remove('alert-early', 'alert-urgent', 'overdue');
          if (!dueDateString) {
            timerSpan.textContent = '';
            timerSpan.classList.add('hidden');
            return;
          }
          const dueDate = new Date(dueDateString);
          let text = '';
          if (note.dataset.status === 'done') {
            timerSpan.textContent = `Completada`;
            timerSpan.classList.remove('hidden');
            return; 
          }
          const diff = dueDate - now;
          if (diff < 0) {
             text = 'Vencido';
             note.classList.add('overdue');
          } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor(diff / (1000 * 60));
            if (days > 0) text = `Faltan ${days} día${days > 1 ? 's' : ''}`;
            else if (hours > 0) text = `Faltan ${hours} hora${hours > 1 ? 's' : ''}`;
            else if (minutes >= 0) text = `Faltan ${minutes} min`;
            const creationDate = new Date(creationDateString);
            const totalTime = dueDate - creationDate;
            const elapsedTime = now - creationDate;
            if (totalTime > 0) {
              const percentage = (elapsedTime / totalTime) * 100;
              if (percentage >= 76) note.classList.add('alert-urgent');
              else if (percentage >= 51) note.classList.add('alert-early');
            }
          }
          timerSpan.textContent = text;
          timerSpan.classList.remove('hidden');
        });
      };

      // seenNotifications se cargará desde IndexedDB en initializeAppLogic()
      let seenNotifications = new Set();
      
      function showNativeNotification(title, options) {
          if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(title, options);
          }
      }

      async function checkAndTriggerNotifications() {
        const now = new Date();
        const todayStr = now.toISOString().slice(0, 10);
        let urgentNotes = [];
        
        const findUrgentRecursive = (notes) => {
            notes.forEach(note => {
                const isNoteLocked = note.lockType && !sessionUnlockedNotes.has(note.id);
                if (isNoteLocked || note.status === 'done' || !note.dueDate || note.isArchived) return;

                const dueDate = new Date(note.dueDate);
                const diffMinutes = (dueDate - now) / (1000 * 60);
                if (diffMinutes <= 60) { 
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = note.content;
                    urgentNotes.push({
                        id: note.id,
                        text: (tempDiv.textContent || tempDiv.innerText || "").substring(0, 100),
                        dueDate: dueDate,
                        isOverdue: diffMinutes < 0
                    });
                }
                if (note.children) {
                    findUrgentRecursive(note.children);
                }
            });
        };
        findUrgentRecursive(currentNotesData);

        populateNotificationCenter(urgentNotes);
        const hasUnseen = urgentNotes.some(n => !seenNotifications.has(n.id));
        notificationDot.classList.toggle('hidden', !hasUnseen);

        // Cargar desde IndexedDB o localStorage
        let lastMorningReport, lastNoonReport, lastEveningReport;
        if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
            [lastMorningReport, lastNoonReport, lastEveningReport] = await Promise.all([
                window.loadSettingAsync('LastMorningReport'),
                window.loadSettingAsync('LastNoonReport'),
                window.loadSettingAsync('LastEveningReport')
            ]);
        } else {
            lastMorningReport = localStorage.getItem('uninoteLastMorningReport');
            lastNoonReport = localStorage.getItem('uninoteLastNoonReport');
            lastEveningReport = localStorage.getItem('uninoteLastEveningReport');
        }

        const shouldShowPopup = ( (now.getHours() >= 7 && lastMorningReport !== todayStr) || (now.getHours() >= 12 && lastNoonReport !== todayStr) || (now.getHours() >= 18 && lastEveningReport !== todayStr) );

        if (urgentNotes.length > 0 && shouldShowPopup) {
            notificationCenterOverlay.classList.remove('hidden');
            showNativeNotification(`Uninote: Tienes ${urgentNotes.length} tarea(s) urgente(s)`, { body: "Revisa tu centro de notificaciones para más detalles." });

            // Guardar en IndexedDB o localStorage
            if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
                if (now.getHours() >= 18) await window.saveSettingAsync('LastEveningReport', todayStr);
                else if (now.getHours() >= 12) await window.saveSettingAsync('LastNoonReport', todayStr);
                else if (now.getHours() >= 7) await window.saveSettingAsync('LastMorningReport', todayStr);
            } else {
                if (now.getHours() >= 18) localStorage.setItem('uninoteLastEveningReport', todayStr);
                else if (now.getHours() >= 12) localStorage.setItem('uninoteLastNoonReport', todayStr);
                else if (now.getHours() >= 7) localStorage.setItem('uninoteLastMorningReport', todayStr);
            }
        }
      }

      function populateNotificationCenter(notes) {
          notificationList.innerHTML = '';
          if (notes.length === 0) {
              notificationList.innerHTML = '<li class="notif-empty">¡Todo en orden! No hay tareas urgentes.</li>';
              return;
          }
          notes.sort((a,b) => a.dueDate - b.dueDate); 
          notes.forEach(note => {
              const li = document.createElement('li');
              li.dataset.noteId = note.id;
              li.classList.add(note.isOverdue ? 'notif-overdue' : 'notif-urgent');
              li.innerHTML = `<span class="notif-text">${note.text || '(Nota sin texto)'}</span><span class="notif-due">${note.isOverdue ? `Venció: ${note.dueDate.toLocaleString()}` : `Vence: ${note.dueDate.toLocaleString()}`}</span>`;
              notificationList.appendChild(li);
          });
      }
      
      function renderView() {
        const isDocLocked = appData.documentPasswords[currentDocumentName] && !unlockedDocuments.has(currentDocumentName);
        relockDocBtn.classList.toggle('hidden', isDocLocked || !appData.documentPasswords[currentDocumentName] || !unlockedDocuments.has(currentDocumentName));
        
        if (isDocLocked) {
            notesList.innerHTML = `
                <div id="doc-locked-message">
                    <h2>🔒 Uninote Bloqueado</h2>
                    <p>Este Uninote está protegido por contraseña.</p>
                    <button id="unlock-doc-btn" class="modal-button confirm-action">Desbloquear Uninote</button>
                </div>`;
            archiveViewContainer.classList.add('hidden');
            globalSearchResults.classList.add('hidden');
            notesCounter.classList.add('hidden');
            return;
        }
        
        notesCounter.classList.remove('hidden');

        if (isArchiveViewActive) {
            document.body.dataset.viewMode = 'archive';
            notesList.classList.add('hidden');
            archiveViewContainer.classList.remove('hidden');
            globalSearchResults.classList.add('hidden');
            toggleArchiveViewBtn.textContent = '📖 Ver Activas';
            addMainNoteBtn.classList.add('hidden');
            notesCounter.classList.add('hidden');
            renderArchiveTimeline();
        } else {
            document.body.dataset.viewMode = 'active';
            notesList.classList.remove('hidden');
            archiveViewContainer.classList.add('hidden');
            if (!searchAllToggle.checked || !searchInput.value) {
                globalSearchResults.classList.add('hidden');
            }
            toggleArchiveViewBtn.textContent = '📦 Archivo';
            addMainNoteBtn.classList.remove('hidden');
            notesCounter.classList.remove('hidden');
        }
        runUpdates();
      }
      
      function renderAppUI() {
          documentTitle.textContent = `${currentDocumentName} ▾`;
          renderDocumentMenu();
          renderTabs();
          loadNotesFromData(currentNotesData);
      }

      const runUpdates = () => {
        if (searchAllToggle.checked && searchInput.value) return; 
        updateNumbers();
        updateNotesCounter();
        updateToggleVisibility();
        updateIconVisibility();
        updateAllCountdowns();
        if (!isInitializing) {
            if (!isArchiveViewActive) checkAndTriggerNotifications();
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(saveCurrentDocument, 500);
        }
      };

      // --- Search functions ---
      function hideGlobalSearchResults() {
          globalSearchResults.classList.add('hidden');
          renderView();
      }

      function performLocalSearch(searchTerm) {
          notesList.querySelectorAll('.note').forEach(n => n.classList.remove('is-filtered'));
          if (!searchTerm) return;
          const notesToShow = new Set();
          const searchLower = searchTerm.toLowerCase();

          const recursiveSearch = (list) => {
            list.querySelectorAll(':scope > .note').forEach(note => {
              let isMatch = false;
              if (note.dataset.isArchived === 'true') return;
              
              let noteText;
              const isNoteLocked = note.dataset.lockType && !sessionUnlockedNotes.has(note.dataset.id);
              if (isNoteLocked) {
                  noteText = (note.dataset.lockHint || '').toLowerCase();
              } else {
                  noteText = note.querySelector('.editable-note').textContent.toLowerCase();
              }
              
              if (noteText.includes(searchLower)) {
                  isMatch = true;
                  notesToShow.add(note);
                  let parent = note.parentElement.closest('.note');
                  while (parent) {
                      notesToShow.add(parent);
                      parent = parent.parentElement.closest('.note');
                  }
              }

              const sublist = note.querySelector('.subnotes');
              if (sublist && recursiveSearch(sublist)) {
                isMatch = true;
                notesToShow.add(note); // Ensure parent is shown if a child matches
              }
            });
          };

          recursiveSearch(notesList);

          notesList.querySelectorAll('.note').forEach(note => {
            if (note.dataset.isArchived === 'true') return;
            note.classList.toggle('is-filtered', !notesToShow.has(note));
          });
      }

      async function performGlobalSearch(searchTerm) {
          notesList.classList.add('hidden');
          archiveViewContainer.classList.add('hidden');
          globalSearchResults.classList.remove('hidden');
          globalSearchResults.innerHTML = '<li class="search-no-results">Buscando en todos los Uninotes accesibles...</li>';
          let allResults = [];
          const tempDiv = document.createElement('div');
          const searchLower = searchTerm.toLowerCase();

          for (const docName of appData.documents) {
              if (appData.documentPasswords[docName] && !unlockedDocuments.has(docName)) {
                  continue;
              }

              // Cargar desde IndexedDB
              let notesData;
              if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
                  notesData = await window.loadDocumentAsync(docName);
              } else {
                  const notesDataRaw = localStorage.getItem(`uninote_doc_${docName}`);
                  notesData = notesDataRaw ? JSON.parse(notesDataRaw) : null;
              }
              if (!notesData) continue;
              const recursiveSearch = (notes) => {
                  for (const note of notes) {
                      if (note.isArchived) continue;
                      const isNoteLocked = note.lockType && !sessionUnlockedNotes.has(note.id);
                      let textToSearch = isNoteLocked ? (note.lockHint || '') : note.content;
                      tempDiv.innerHTML = textToSearch;
                      textToSearch = (tempDiv.textContent || tempDiv.innerText || "").toLowerCase();
                      if (textToSearch.includes(searchLower)) {
                          allResults.push({ note, docName });
                      }
                      if (note.children && !isNoteLocked) {
                          recursiveSearch(note.children);
                      }
                  }
              };
              recursiveSearch(notesData);
          }
          renderGlobalResults(allResults, searchTerm);
      }

      function renderGlobalResults(results, searchTerm) {
          globalSearchResults.innerHTML = '';
          if (results.length === 0) {
              globalSearchResults.innerHTML = '<li class="search-no-results">No se encontraron resultados.</li>';
              return;
          }
          const regex = new RegExp(`(${searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
          const tempDiv = document.createElement('div');
          results.forEach(result => {
              const li = document.createElement('li');
              li.className = 'search-result-item';
              li.dataset.docName = result.docName;
              li.dataset.noteId = result.note.id;
              tempDiv.innerHTML = result.note.content;
              let plainText = tempDiv.textContent || tempDiv.innerText || "";
              let highlightedText = plainText.replace(regex, '<mark>$1</mark>');
              li.innerHTML = `
                  <p class="result-content">${highlightedText}</p>
                  <p class="result-location">en: ${result.docName}</p>
              `;
              globalSearchResults.appendChild(li);
          });
      }
      
      const handleSearch = () => {
          const searchTerm = searchInput.value.trim();
          const searchAll = searchAllToggle.checked;
          if (searchAll && searchTerm) {
              performGlobalSearch(searchTerm);
          } else {
              hideGlobalSearchResults();
              performLocalSearch(searchTerm);
          }
      };
      
      function parseNotionMarkdown(markdown) {
        const lines = markdown.split('\n');
        const root = { children: [] };
        const stack = [root]; 
        function getIndentLevel(line) {
            const match = line.match(/^(\s*)/);
            return match[1].replace(/\t/g, '    ').length / 4;
        }
        function convertMarkdownToHtml(text) {
            return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>').replace(/`(.*?)`/g, '<code>$1</code>').replace(/~~(.*?)~~/g, '<s>$1</s>');
        }
        for (const line of lines) {
            if (line.trim() === '') continue;
            const level = getIndentLevel(line);
            let content = line.trim().replace(/^-/, '').trim();
            let status = 'todo';
            if (content.startsWith('[x] ')) {
                status = 'done';
                content = content.substring(4);
            } else if (content.startsWith('[ ] ')) {
                status = 'todo';
                content = content.substring(4);
            }
            const newNode = { content: convertMarkdownToHtml(content), status: status, icon: '', children: [] };
            while (level < stack.length - 1) {
                stack.pop();
            }
            stack[stack.length - 1].children.push(newNode);
            stack.push(newNode);
        }
        return root.children;
      }
      
      function checkParentStatus(parentNote) {
        if (!parentNote || (parentNote.dataset.lockType && !sessionUnlockedNotes.has(parentNote.dataset.id))) return;
        const sublist = parentNote.querySelector('ul.subnotes');
        if (!sublist || sublist.children.length === 0) return;
        const siblings = Array.from(sublist.children);
        const allDone = siblings.every(sibling => sibling.dataset.status === 'done' || (sibling.dataset.lockType && !sessionUnlockedNotes.has(sibling.dataset.id)));
        if (allDone) {
            parentNote.dataset.status = 'done';
            parentNote.querySelector('[data-action="cycle-status"]').textContent = '🟢';
            runUpdates();
            const grandParentNote = parentNote.parentElement.closest('.note');
            if (grandParentNote) {
                checkParentStatus(grandParentNote);
            }
        }
      }
        
        async function renderArchiveTimeline() {
            archiveTimelineContainer.innerHTML = '';
            const allArchivedNotes = [];

            for (const docName of appData.documents) {
                if (appData.documentPasswords[docName] && !unlockedDocuments.has(docName)) {
                    continue;
                }

                // Cargar desde IndexedDB
                let notesData;
                if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
                    notesData = await window.loadDocumentAsync(docName);
                } else {
                    const notesDataRaw = localStorage.getItem(`uninote_doc_${docName}`);
                    notesData = notesDataRaw ? JSON.parse(notesDataRaw) : null;
                }
                if (!notesData) continue;

                function findArchivedRecursive(notes) {
                    for (const note of notes) {
                        if (note.isArchived) {
                            allArchivedNotes.push({ ...note, originalDoc: docName });
                        } else if (note.children) {
                            findArchivedRecursive(note.children);
                        }
                    }
                }
                findArchivedRecursive(notesData);
            }

            if (allArchivedNotes.length === 0) {
                archiveTimelineContainer.innerHTML = '<p style="text-align: center; color: var(--locked-text-color);">No hay notas archivadas en los Uninotes accesibles.</p>';
                return;
            }

            const viewMode = document.querySelector('input[name="archive-view"]:checked').value;
            const sortKey = archiveSortSelect.value;
            allArchivedNotes.sort((a, b) => new Date(b[sortKey]) - new Date(a[sortKey]));
            
            if (viewMode === 'groupByUninote') {
                renderGroupedByUninote(allArchivedNotes);
            } else { // 'groupByDate'
                renderGroupedByDate(allArchivedNotes);
            }
        }

        function renderGroupedByUninote(notes) {
            const grouped = notes.reduce((acc, note) => {
                const docName = note.originalDoc;
                if (!acc[docName]) acc[docName] = [];
                acc[docName].push(note);
                return acc;
            }, {});

            for (const docName in grouped) {
                const uninoteGroup = document.createElement('div');
                uninoteGroup.className = 'archive-uninote-group';
                uninoteGroup.innerHTML = `<h3 class="group-header">${docName}</h3>`;
                archiveTimelineContainer.appendChild(uninoteGroup);
                renderTimelineForNotes(grouped[docName], uninoteGroup);
            }
        }

        function renderGroupedByDate(notes) {
            renderTimelineForNotes(notes, archiveTimelineContainer);
        }

        function renderTimelineForNotes(notes, container) {
            const groupedByMonth = notes.reduce((acc, note) => {
                const timestamp = new Date(note.archivedTimestamp);
                const monthKey = `${timestamp.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}`;
                if (!acc[monthKey]) acc[monthKey] = [];
                acc[monthKey].push(note);
                return acc;
            }, {});

            for (const month in groupedByMonth) {
                const monthGroup = document.createElement('div');
                monthGroup.className = 'archive-month-group collapsed';
                monthGroup.innerHTML = `<div class="group-header">${month.charAt(0).toUpperCase() + month.slice(1)}</div>`;
                container.appendChild(monthGroup);

                const groupedByDay = groupedByMonth[month].reduce((acc, note) => {
                    const timestamp = new Date(note.archivedTimestamp);
                    const dayKey = timestamp.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' });
                    if (!acc[dayKey]) acc[dayKey] = [];
                    acc[dayKey].push(note);
                    return acc;
                }, {});
                
                for (const day in groupedByDay) {
                    const dayGroup = document.createElement('div');
                    dayGroup.className = 'archive-day-group collapsed';
                    dayGroup.innerHTML = `<div class="group-header">${day}</div>`;
                    monthGroup.appendChild(dayGroup);
                    
                    const groupedByUninoteInDay = groupedByDay[day].reduce((acc, note) => {
                        const docName = note.originalDoc;
                        if (!acc[docName]) acc[docName] = [];
                        acc[docName].push(note);
                        return acc;
                    }, {});

                    for(const docName in groupedByUninoteInDay) {
                        if (document.querySelector('input[name="archive-view"]:checked').value === 'groupByDate') {
                            const uninoteHeader = document.createElement('h4');
                            uninoteHeader.className = 'archive-day-uninote-header';
                            uninoteHeader.textContent = `en: ${docName}`;
                            dayGroup.appendChild(uninoteHeader);
                        }
                        const dayNoteContainer = document.createElement('ul');
                        dayNoteContainer.className = 'notes-container';
                        dayGroup.appendChild(dayNoteContainer);
                        groupedByUninoteInDay[docName].forEach(noteData => createArchivedNoteDOM(noteData, dayNoteContainer));
                    }
                }
            }
        }

        function createArchivedNoteDOM(noteData, parentElement) {
            const li = createNote(parentElement, null, false, noteData);
            renderNoteState(li);
            
            const metaContainer = document.createElement('div');
            metaContainer.className = 'note-meta';
            if (noteData.creationDate) metaContainer.innerHTML += `<span>Creado: ${new Date(noteData.creationDate).toLocaleDateString()}</span>`;
            if (noteData.dueDate) metaContainer.innerHTML += `<span>Límite: ${new Date(noteData.dueDate).toLocaleDateString()}</span>`;
            li.querySelector('.note-container').appendChild(metaContainer);

            if (noteData.children && noteData.children.length > 0) {
                const sublist = document.createElement('ul');
                sublist.className = 'subnotes';
                li.appendChild(sublist);
                noteData.children.forEach(child => createArchivedNoteDOM(child, sublist));
            }
        }
      
      async function promptForDocumentPassword(docName, purpose = 'unlock') {
         return new Promise(async (resolve) => {
            const modal = document.getElementById('unlock-modal-overlay');
            const title = purpose === 'unlock' ? `Desbloquear Uninote "${docName}"` : `Confirmar para quitar contraseña`;
            modal.querySelector('h2').textContent = title;
            const passInput = document.getElementById('unlock-password-input');
            passInput.value = '';
            modal.classList.remove('hidden');
            passInput.focus();
            const confirmBtn = document.getElementById('unlock-confirm-btn');
            const cancelBtn = document.getElementById('unlock-cancel-btn');

            const cleanup = (result) => {
                modal.classList.add('hidden');
                confirmBtn.onclick = null;
                cancelBtn.onclick = null;
                passInput.onkeydown = null;
                resolve(result);
            };
            const handleConfirm = async () => {
                const hashData = appData.documentPasswords[docName];
                const isCorrect = await verifyPassword(passInput.value, hashData);
                if (isCorrect) {
                    if(typeof hashData === 'string'){
                        appData.documentPasswords[docName] = await hashPasswordWithSalt(passInput.value);
                        saveAppData();
                    }
                    cleanup(true);
                } else {
                    showNotification('Contraseña incorrecta', 'error');
                    cleanup(false);
                }
            };
            confirmBtn.onclick = handleConfirm;
            cancelBtn.onclick = () => cleanup(false);
            passInput.onkeydown = (e) => { if (e.key === 'Enter') handleConfirm(); else if (e.key === 'Escape') cancelBtn.click(); };
        });
      }

      async function switchDocument(docName) {
        if (docName === currentDocumentName) return;

        await saveCurrentDocument();  // Await aquí

        if (appData.documentPasswords[docName] && !unlockedDocuments.has(docName)) {
            const unlocked = await promptForDocumentPassword(docName, 'unlock');
            if (unlocked) {
                unlockedDocuments.add(docName);
            } else {
                showNotification('Acceso al Uninote denegado.', 'error');
                return;
            }
        }

        sessionUnlockedNotes.clear();
        currentDocumentName = docName;
        appData.activeDocument = docName;

        // Cargar desde IndexedDB en lugar de localStorage
        let notesData;
        if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
            notesData = await window.loadDocumentAsync(docName);
            console.log('📖 Cargado desde IndexedDB - Orden:', notesData ? notesData.map((n, idx) => `${idx}: ${n.content.substring(0, 20)}`) : 'Sin datos');
        } else {
            const notesDataRaw = localStorage.getItem(`uninote_doc_${docName}`);
            notesData = notesDataRaw ? JSON.parse(notesDataRaw) : [];
        }

        currentNotesData = notesData || [];

        renderAppUI();
        await saveAppData();  // Await aquí
      }

      async function createNewDocument() {
        const docName = await showPromptModal("Nuevo Uninote", "Introduce el nombre del nuevo Uninote:", {defaultValue: "Nuevo Uninote"});
        if (docName && docName.trim() !== '') {
          if (appData.documents.includes(docName.trim())) {
            await showAlertModal("Error", "Ya existe un Uninote con ese nombre.");
            return;
          }
          const newDocName = docName.trim();
          appData.documents.push(newDocName);
          saveNotesToStorage(newDocName, []);
          await switchDocument(newDocName);
        }
      }

      async function renameCurrentDocument() {
        const oldName = currentDocumentName;
        const newName = await showPromptModal("Renombrar Uninote", "Introduce el nuevo nombre para el Uninote:", {defaultValue: oldName});
        
        if (newName && newName.trim() !== '' && newName.trim() !== oldName) {
          const newDocName = newName.trim();
          if (appData.documents.includes(newDocName)) {
            await showAlertModal("Error", "Ya existe un Uninote con ese nombre.");
            return;
          }
          
          appData.documents = appData.documents.map(d => d === oldName ? newDocName : d);
          if(appData.documentPasswords[oldName]) {
              appData.documentPasswords[newDocName] = appData.documentPasswords[oldName];
              delete appData.documentPasswords[oldName];
          }
          if (unlockedDocuments.has(oldName)) {
              unlockedDocuments.delete(oldName);
              unlockedDocuments.add(newDocName);
          }
          if (appData.favorites.includes(oldName)) {
            appData.favorites = appData.favorites.map(f => f === oldName ? newDocName : f);
          }
          if (appData.defaultDocument === oldName) {
            appData.defaultDocument = newDocName;
          }

          // Renombrar en IndexedDB
          if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
              const docData = await window.loadDocumentAsync(oldName);
              if (docData) {
                  await window.saveDocumentAsync(newDocName, docData);
                  await StorageService.deleteDocument(oldName);
              }
          } else {
              const data = localStorage.getItem(`uninote_doc_${oldName}`);
              localStorage.setItem(`uninote_doc_${newDocName}`, data);
              localStorage.removeItem(`uninote_doc_${oldName}`);
          }

          currentDocumentName = newDocName;
          appData.activeDocument = newDocName;

          renderAppUI();
          await saveAppData();
        }
      }

      async function deleteCurrentDocument() {
        if (appData.documents.length <= 1) {
          await showAlertModal("Acción no permitida", "No puedes eliminar el último Uninote.");
          return;
        }
        const confirmed = await showConfirmationModal(
            `Eliminar "${currentDocumentName}"`, 
            `¿Estás seguro? Esta acción es permanente y no se puede deshacer.`
        );
        if (confirmed) {
          const docToDelete = currentDocumentName;
          
          appData.documents = appData.documents.filter(d => d !== docToDelete);
          appData.favorites = appData.favorites.filter(f => f !== docToDelete);
          delete appData.documentPasswords[docToDelete];
          unlockedDocuments.delete(docToDelete);
          if (appData.defaultDocument === docToDelete) {
            appData.defaultDocument = null;
          }

          // Eliminar de IndexedDB
          if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
              await StorageService.deleteDocument(docToDelete);
          } else {
              localStorage.removeItem(`uninote_doc_${docToDelete}`);
          }

          const nextDoc = appData.defaultDocument || appData.documents[0];
          await switchDocument(nextDoc);
        }
      }

      function toggleFavorite(docName) {
        if (appData.favorites.includes(docName)) {
          appData.favorites = appData.favorites.filter(f => f !== docName);
        } else {
          appData.favorites.push(docName);
        }
        renderTabs();
        renderDocumentMenu();
        saveAppData();
      }

      function renderDocumentMenu() {
        documentMenu.innerHTML = '';
        appData.documents.forEach(docName => {
          const li = document.createElement('li');
          li.dataset.docName = docName;
          const isProtected = appData.documentPasswords[docName] ? '🔒' : '';
          const isDefault = appData.defaultDocument === docName ? ' (Principal)' : '';
          li.innerHTML = `
            <span class="doc-name">${docName} ${isProtected}${isDefault}</span>
            <span class="favorite-star ${appData.favorites.includes(docName) ? 'is-favorite' : ''}" data-action="toggle-favorite">☆</span>
          `;
          if (docName === currentDocumentName) {
            li.classList.add('active-doc');
          }
          documentMenu.appendChild(li);
        });
        documentMenu.innerHTML += `<hr>`;
        documentMenu.innerHTML += `<li data-action="create">➕ Crear nuevo Uninote</li>`;
        documentMenu.innerHTML += `<li data-action="rename">✏️ Renombrar "${currentDocumentName}"</li>`;
        documentMenu.innerHTML += `<li data-action="set-default">🏠 Establecer como principal</li>`;
        documentMenu.innerHTML += `<li data-action="set-doc-pass">🔑 Gestionar Contraseña</li>`;
        documentMenu.innerHTML += `<li data-action="delete" style="color: #e53935;">🗑️ Eliminar "${currentDocumentName}"</li>`;
      }
      
      function renderTabs() {
        tabsContainer.innerHTML = '';
        appData.favorites.forEach(favName => {
          const tab = document.createElement('button');
          tab.className = 'tab-button';
          const isProtected = appData.documentPasswords[favName] ? '🔒' : '';
          tab.textContent = `${favName} ${isProtected}`;
          tab.dataset.docName = favName;
          if (favName === currentDocumentName) {
            tab.classList.add('active');
          }
          tabsContainer.appendChild(tab);
        });
      }

      const findNoteData = (notes, id) => {
          for (let i = 0; i < notes.length; i++) {
              const note = notes[i];
              if (note.id === id) {
                  return { note, parentArray: notes, index: i };
              }
              if (note.children) {
                  const found = findNoteData(note.children, id);
                  if (found) return found;
              }
          }
          return null;
      };
            
      // --- Sección de Asignación de Eventos ---
      searchInput.addEventListener('input', handleSearch);
      searchAllToggle.addEventListener('change', handleSearch);

      globalSearchResults.addEventListener('click', async (e) => {
          const resultItem = e.target.closest('.search-result-item');
          if (!resultItem) return;

          const targetDocName = resultItem.dataset.docName;
          const targetNoteId = resultItem.dataset.noteId;
          
          searchInput.value = '';
          searchAllToggle.checked = false;
          hideGlobalSearchResults();

          if (currentDocumentName !== targetDocName) {
              await switchDocument(targetDocName);
          }
          
          setTimeout(() => {
              const noteToFocus = document.querySelector(`.note[data-id="${targetNoteId}"]`);
              if (noteToFocus) {
                  noteToFocus.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  noteToFocus.classList.add('highlight');
                  setTimeout(() => noteToFocus.classList.remove('highlight'), 2000);
              }
          }, 100);
      });

      addMainNoteBtn.addEventListener('click', () => {
          const newNoteData = { id: crypto.randomUUID(), content: '', status: 'todo', creationDate: new Date().toISOString(), children: [] };
          currentNotesData.push(newNoteData);
          const newLi = createNote(notesList, null, true, newNoteData);
          renderNoteState(newLi);
          runUpdates();
      });

      archiveViewContainer.addEventListener('click', async (e) => {
          const target = e.target.closest('button');
          const noteLi = e.target.closest('.note');

          if (noteLi && noteLi.classList.contains('is-locked')) {
              activeNoteForLock = noteLi;
              document.getElementById('unlock-modal-overlay').querySelector('h2').textContent = 'Desbloquear Nota Archivada';
              document.getElementById('unlock-password-input').value = '';
              document.getElementById('unlock-modal-overlay').classList.remove('hidden');
              document.getElementById('unlock-password-input').focus();
              return;
          }

          if (!target || !target.dataset.action) return;
          const action = target.dataset.action;
          
          if (!noteLi) return;
          
          if(action === 'unarchive'){
              activeNoteForUnarchive = {
                  id: noteLi.dataset.id,
                  originalDoc: noteLi.dataset.originalDoc,
              };
              unarchiveToOriginalBtn.textContent = `Desarchivar en "${activeNoteForUnarchive.originalDoc}"`;
              unarchiveOptionsList.classList.add('hidden');
              unarchiveToOtherBtn.classList.remove('hidden');
              unarchiveModalOverlay.classList.remove('hidden');
          }
      });
      
      unarchiveToOtherBtn.addEventListener('click', () => {
          unarchiveOptionsList.innerHTML = '';
          appData.documents.forEach(docName => {
              if (docName !== activeNoteForUnarchive.originalDoc) {
                  const li = document.createElement('li');
                  li.textContent = docName;
                  li.dataset.docName = docName;
                  unarchiveOptionsList.appendChild(li);
              }
          });
          unarchiveToOtherBtn.classList.add('hidden');
          unarchiveOptionsList.classList.remove('hidden');
      });
      
      unarchiveCancelBtn.addEventListener('click', () => {
        unarchiveModalOverlay.classList.add('hidden');
        activeNoteForUnarchive = null;
      });

      unarchiveOptionsList.addEventListener('click', (e) => {
          const targetLi = e.target.closest('li');
          if (targetLi) {
              handleUnarchive(targetLi.dataset.docName);
          }
      });
      unarchiveToOriginalBtn.addEventListener('click', () => {
          handleUnarchive(activeNoteForUnarchive.originalDoc);
      });
      
      async function handleUnarchive(targetDocName) {
          if (!activeNoteForUnarchive) return;

          const { id, originalDoc } = activeNoteForUnarchive;

          // Cargar desde IndexedDB
          let originalNotes;
          if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
              originalNotes = await window.loadDocumentAsync(originalDoc) || [];
          } else {
              const originalNotesRaw = localStorage.getItem(`uninote_doc_${originalDoc}`);
              originalNotes = originalNotesRaw ? JSON.parse(originalNotesRaw) : [];
          }
          
          let foundNote = null;
          function findAndRemoveArchived(notes) {
              for (let i = 0; i < notes.length; i++) {
                  if (notes[i].id === id) {
                      foundNote = notes[i];
                      notes.splice(i, 1);
                      return true;
                  }
                  if (notes[i].children && findAndRemoveArchived(notes[i].children)) {
                      return true;
                  }
              }
              return false;
          }

          if (findAndRemoveArchived(originalNotes)) {
              await saveNotesToStorage(originalDoc, originalNotes);

              foundNote.isArchived = false;
              delete foundNote.archivedTimestamp;
              delete foundNote.originalDoc;

              // Cargar desde IndexedDB
              let targetNotes;
              if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
                  targetNotes = await window.loadDocumentAsync(targetDocName) || [];
              } else {
                  const targetNotesRaw = localStorage.getItem(`uninote_doc_${targetDocName}`);
                  targetNotes = targetNotesRaw ? JSON.parse(targetNotesRaw) : [];
              }
              targetNotes.push(foundNote);
              await saveNotesToStorage(targetDocName, targetNotes);

              unarchiveModalOverlay.classList.add('hidden');
              isArchiveViewActive = false;
              await switchDocument(targetDocName);
              showNotification(`Nota desarchivada y movida a "${targetDocName}".`);
          } else {
              showNotification('Error: no se encontró la nota original para desarchivar.', 'error');
          }
          activeNoteForUnarchive = null;
      }
      
      
      document.querySelector('main').addEventListener('click', async (e) => {
          const unlockDocBtn = e.target.closest('#unlock-doc-btn');
          if (unlockDocBtn) {
              await switchDocument(currentDocumentName);
              return;
          }

          const noteLi = e.target.closest('.note');
          if (noteLi && noteLi.classList.contains('is-locked')) {
              activeNoteForLock = noteLi;
              document.getElementById('unlock-modal-overlay').querySelector('h2').textContent = 'Desbloquear Nota';
              document.getElementById('unlock-password-input').value = '';
              document.getElementById('unlock-modal-overlay').classList.remove('hidden');
              document.getElementById('unlock-password-input').focus();
              return;
          }

          const link = e.target.closest('a');
          if (link && link.href) {
              e.preventDefault();
              window.open(link.href, '_blank', 'noopener,noreferrer');
              return;
          }
          if (e.target.matches('.note-selector')) {
              const noteLiCheckbox = e.target.closest('.note');
              if (e.target.checked) selectedNotes.add(noteLiCheckbox);
              else selectedNotes.delete(noteLiCheckbox);
              noteLiCheckbox.classList.toggle('selected');
              updateBulkActionsBar();
              return;
          }
          const groupHeader = e.target.closest('.group-header');
          if (groupHeader) {
              const groupContainer = groupHeader.parentElement;
              groupContainer.classList.toggle('collapsed');
              return;
          }
          const target = e.target.closest('button');
          if (!target || !target.dataset.action) return;
          const action = target.dataset.action;
          if (action === 'drag' || action === 'unarchive') return;
          
          if(!noteLi) return; 
          
          const noteId = noteLi.dataset.id;
          const { note: noteData, parentArray, index } = findNoteData(currentNotesData, noteId) || {};
          
          switch (action) {
            case 'lock': 
                e.stopPropagation(); 
                activeNoteForLock = noteLi; 
                const rect = target.getBoundingClientRect();
                lockMenu.style.display = 'block';
                lockMenu.style.top = `${rect.bottom + 5}px`;
                let leftPos = rect.left - lockMenu.offsetWidth + rect.width;
                lockMenu.style.left = `${Math.max(5, leftPos)}px`;
                
                const hasLockData = noteLi.dataset.lockType && noteLi.dataset.passwordHash;
                const isTemporarilyUnlocked = sessionUnlockedNotes.has(noteId);

                lockMenu.querySelector('[data-action="lock-universal"]').style.display = hasLockData ? 'none' : 'block';
                lockMenu.querySelector('[data-action="lock-document"]').style.display = hasLockData ? 'none' : 'block';
                lockMenu.querySelector('[data-action="lock-exclusive"]').style.display = hasLockData ? 'none' : 'block';
                lockMenu.querySelector('[data-action="unlock"]').style.display = hasLockData && !isTemporarilyUnlocked ? 'block' : 'none';
                lockMenu.querySelector('[data-action="relock"]').style.display = isTemporarilyUnlocked ? 'block' : 'none';
                lockMenu.querySelector('[data-action="remove-lock"]').style.display = hasLockData ? 'block' : 'none';
                lockMenu.querySelector('hr').style.display = hasLockData ? 'block' : 'none';

                lockMenu.querySelector('[data-action="lock-universal"]').disabled = !appData.universalPasswordHash;
                lockMenu.querySelector('[data-action="lock-document"]').disabled = !appData.documentPasswords[currentDocumentName];
                break;
            case 'archive':
                if (!noteData) return;
                noteData.isArchived = true;
                noteData.archivedTimestamp = new Date().toISOString();
                
                noteLi.remove();
                if(notesList.children.length === 0) {
                  isArchiveViewActive = true;
                  renderView();
                } else {
                  runUpdates();
                }
                break;
            case 'set-date': activeNoteForDatePicker = noteLi; const currentDueDate = noteLi.dataset.dueDate; if (currentDueDate) dateTimeInput.value = currentDueDate.slice(0, 16); else dateTimeInput.value = ''; datePickerModalOverlay.classList.remove('hidden'); break;
            case 'show-menu': e.stopPropagation(); const menuRect = target.getBoundingClientRect(); iconPicker.style.display = 'block'; iconPicker.style.top = `${menuRect.bottom + 5}px`; let menuLeftPos = menuRect.left - iconPicker.offsetWidth + menuRect.width; if (menuLeftPos < 0) menuLeftPos = 5; iconPicker.style.left = `${menuLeftPos}px`; activeNoteForMenu = noteLi; document.querySelector('.picker-tabs button[data-tab="common"]').click(); break;
            case 'duplicate':
                if (!noteData) return;

                // Mostrar modal para elegir tipo de duplicación
                const duplicateChoice = await showDuplicateModal();
                if (!duplicateChoice) return; // Usuario canceló

                let noteDataToDup;

                if (duplicateChoice === 'only') {
                    // Duplicar solo esta nota (sin sub-notas)
                    noteDataToDup = {
                        id: crypto.randomUUID(),
                        content: noteData.content,
                        status: noteData.status,
                        creationDate: new Date().toISOString(),
                        icon: noteData.icon,
                        dueDate: noteData.dueDate,
                        children: [] // Sin hijos
                    };
                } else if (duplicateChoice === 'with-children') {
                    // Duplicar nota con todas sus sub-notas
                    noteDataToDup = JSON.parse(JSON.stringify(noteData));
                    const assignNewIds = (note) => {
                        note.id = crypto.randomUUID();
                        note.creationDate = new Date().toISOString();
                        if (note.children) {
                            note.children.forEach(assignNewIds);
                        }
                    };
                    assignNewIds(noteDataToDup);
                }

                parentArray.splice(index + 1, 0, noteDataToDup);
                const newLi = createNote(noteLi.parentElement, noteLi, true, noteDataToDup);

                // Si tiene hijos, renderizarlos
                if (noteDataToDup.children && noteDataToDup.children.length > 0) {
                    const sublist = document.createElement('ul');
                    sublist.className = 'subnotes';
                    newLi.appendChild(sublist);

                    const renderChildren = (childrenArray, parentList) => {
                        childrenArray.forEach(childData => {
                            const childLi = createNote(parentList, null, false, childData);
                            if (childData.children && childData.children.length > 0) {
                                const childSublist = document.createElement('ul');
                                childSublist.className = 'subnotes';
                                childLi.appendChild(childSublist);
                                renderChildren(childData.children, childSublist);
                            }
                            renderNoteState(childLi);
                        });
                    };

                    renderChildren(noteDataToDup.children, sublist);
                }

                renderNoteState(newLi);
                runUpdates();
                await saveCurrentDocument(); // Guardar cambios inmediatamente
                break;
            case 'cycle-status': 
                const currentStatus = noteLi.dataset.status; 
                let nextStatus, nextIcon, nextTitle; 
                if (currentStatus === 'todo') { nextStatus = 'inprogress'; nextIcon = '🟡'; nextTitle = 'Estado: En Proceso'; } 
                else if (currentStatus === 'inprogress') { nextStatus = 'done'; nextIcon = '🟢'; nextTitle = 'Estado: Hecho'; } 
                else { nextStatus = 'todo'; nextIcon = '⚪'; nextTitle = 'Estado: Sin Hacer'; } 
                noteLi.dataset.status = nextStatus;
                if (noteData) noteData.status = nextStatus;
                target.textContent = nextIcon; target.title = nextTitle; 
                const parentNote = noteLi.parentElement.closest('.note'); 
                checkParentStatus(parentNote); 
                runUpdates(); 
                break;
            case 'toggle':
                const subnotes = noteLi.querySelector('.subnotes');
                if (subnotes) {
                    const isHidden = subnotes.classList.contains('hidden');
                    subnotes.classList.toggle('hidden');
                    // Guardar estado de colapsado en los datos
                    if (noteData) {
                        noteData.isCollapsed = !isHidden; // Si lo estamos escondiendo, isCollapsed = true
                    }
                    updateToggleVisibilityForNote(noteLi);
                    await saveCurrentDocument(); // Guardar cambios
                }
                break;
            case 'add-sibling': 
                if(!parentArray) return;
                const newSiblingData = { id: crypto.randomUUID(), content: '', status: 'todo', creationDate: new Date().toISOString(), children: [] };
                parentArray.splice(index + 1, 0, newSiblingData);
                const newSiblingLi = createNote(noteLi.parentElement, noteLi, true, newSiblingData);
                renderNoteState(newSiblingLi);
                runUpdates();
                break;
            case 'add-subnote': 
                if(!noteData) return;
                const newSubnoteData = { id: crypto.randomUUID(), content: '', status: 'todo', creationDate: new Date().toISOString(), children: [] };
                if (!noteData.children) noteData.children = [];
                noteData.children.push(newSubnoteData);

                let sublist = noteLi.querySelector('.subnotes');
                if(!sublist) {
                  sublist = document.createElement('ul');
                  sublist.className = 'subnotes';
                  noteLi.appendChild(sublist);
                }
                const newSubnoteLi = createNote(sublist, null, true, newSubnoteData);
                renderNoteState(newSubnoteLi);
                sublist.classList.remove('hidden');
                runUpdates();
                break;
            case 'delete': 
              if (noteLi.dataset.lockType) {
                  const confirmed = await showConfirmationModal('Eliminar Nota Bloqueada', 'Esta nota está bloqueada. ¿Estás seguro de que quieres eliminarla permanentemente?');
                  if (!confirmed) return;
              }
              if (parentArray) {
                  parentArray.splice(index, 1);
              }
              noteLi.remove();
              ensureAtLeastOneNote();
              runUpdates();
              break;
          }
      });
      
      notesList.addEventListener('contextmenu', e => {
        const targetElement = e.target.closest('.note-container');
        if (targetElement && !targetElement.closest('.note.is-locked')) {
            e.preventDefault();
            activeNoteForMenu = targetElement.closest('.note');
            contextMenu.style.display = 'block';
            contextMenu.style.top = `${e.clientY}px`;
            contextMenu.style.left = `${e.clientX}px`;
        }
      });
      
      removeIconBtn.addEventListener('click', () => {
          if (activeNoteForMenu) {
              activeNoteForMenu.querySelector('.note-icon').textContent = '';
              runUpdates(); 
          }
          contextMenu.style.display = 'none';
          activeNoteForMenu = null;
      });
      
      notesList.addEventListener('keydown', (e) => {
        if(isArchiveViewActive) return; 
        const editableDiv = e.target.closest('.editable-note');
        if (!editableDiv) return;
        const noteLi = editableDiv.closest('.note');
        if (!noteLi || noteLi.classList.contains('is-locked')) return;

        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          const { note: noteData, parentArray, index } = findNoteData(currentNotesData, noteLi.dataset.id) || {};
          if (!parentArray) return;
          const newSiblingData = { id: crypto.randomUUID(), content: '', status: 'todo', creationDate: new Date().toISOString(), children: [] };
          parentArray.splice(index + 1, 0, newSiblingData);
          const newLi = createNote(noteLi.parentElement, noteLi, true, newSiblingData);
          renderNoteState(newLi);
          runUpdates();
          return;
        }
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            document.execCommand('insertLineBreak');
            return;
        }

        if (e.key === 'Tab') {
          e.preventDefault();
          const { note: noteToMove, parentArray: originalParentArray, index: originalIndex } = findNoteData(currentNotesData, noteLi.dataset.id) || {};
          if (!noteToMove) return;

          if (e.shiftKey) { // Outdent
              const parentNoteLi = noteLi.parentElement.closest('.note');
              if(!parentNoteLi) return;
              const { note: parentNoteData, parentArray: grandParentArray, index: parentIndex } = findNoteData(currentNotesData, parentNoteLi.dataset.id) || {};
              if(parentNoteData) {
                originalParentArray.splice(originalIndex, 1); // Remove from old location in data
                grandParentArray.splice(parentIndex + 1, 0, noteToMove); // Add to new location in data
                
                parentNoteLi.parentElement.insertBefore(noteLi, parentNoteLi.nextSibling); // Move in DOM
                noteLi.querySelector('.editable-note').focus();
              }
          } else { // Indent
              if (originalIndex > 0) {
                  const newParentData = originalParentArray[originalIndex - 1];
                  const newParentLi = noteLi.previousElementSibling;
                  if (newParentLi && !newParentLi.classList.contains('is-locked')) {
                    originalParentArray.splice(originalIndex, 1); // Remove from data
                    if (!newParentData.children) newParentData.children = [];
                    newParentData.children.push(noteToMove); // Add to new parent's children in data
                    
                    let sublist = newParentLi.querySelector('.subnotes');
                    if(!sublist) {
                        sublist = document.createElement('ul');
                        sublist.className = 'subnotes';
                        newParentLi.appendChild(sublist);
                    }
                    sublist.appendChild(noteLi); // Move in DOM
                    sublist.classList.remove('hidden');
                    noteLi.querySelector('.editable-note').focus();
                  }
              }
          }
          runUpdates();
          return;
        }
        if (e.ctrlKey && e.key.toLowerCase() === 'b') {
            e.preventDefault();
            applyStyle('bold');
            updateToolbarState();
        }
      });
      
      formattingToolbar.addEventListener('mousedown', e => e.preventDefault());
      formattingToolbar.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;
        const command = button.dataset.command;
        if (command === 'increaseFontSize' || command === 'decreaseFontSize') changeFontSize(command === 'increaseFontSize' ? 'increase' : 'decrease');
        else if (command) applyStyle(command);
      });
      fontSizeInput.addEventListener('keydown', e => { e.stopPropagation(); if(e.key === 'Enter') { e.preventDefault(); changeFontSize('input'); } });
      formattingToolbar.querySelector('input[type="color"]').addEventListener('input', (e) => { if (e.target.dataset.command === 'foreColor') applyStyle(e.target.dataset.command, e.target.value); });
      
      iconPicker.addEventListener('click', (e) => {
          e.stopPropagation();
          const target = e.target.closest('button');
          if (!target) return;
          if (target.parentElement.classList.contains('picker-tabs')) {
              document.querySelectorAll('.picker-tabs button').forEach(b => b.classList.remove('active'));
              target.classList.add('active');
              document.querySelectorAll('.picker-panel').forEach(p => p.classList.remove('active'));
              document.getElementById(`panel-${target.dataset.tab}`).classList.add('active');
              return;
          }
          if (target.parentElement.classList.contains('picker-panel')) {
              if (activeNoteForMenu) {
                  activeNoteForMenu.querySelector('.note-icon').textContent = target.textContent;
                  addEmojiToRecents(target.textContent);
                  runUpdates(); 
              }
              iconPicker.style.display = 'none';
              activeNoteForMenu = null;
          }
      });
      
      document.addEventListener('mouseup', showFormattingToolbar);
      window.addEventListener('click', (e) => {
          if (!e.target.closest('.picker') && !e.target.closest('[data-action="show-menu"]') && !e.target.closest('[data-action="lock"]') && !e.target.closest('#transfer-btn')) {
              document.querySelectorAll('.picker').forEach(p => p.style.display = 'none');
              activeNoteForMenu = null;
          }
          if (!e.target.closest('#formatting-toolbar') && !e.target.closest('.editable-note')) {
            formattingToolbar.style.display = 'none';
          }
          if (!document.getElementById('document-title').contains(e.target) && !documentMenu.contains(e.target)) {
            documentMenu.classList.add('hidden');
          }
          if (!transferBtn.contains(e.target) && !transferMenu.contains(e.target)) {
            transferMenu.classList.add('hidden');
          }
      });
      
      notesList.addEventListener('focusout', (e) => {
          const editableDiv = e.target.closest('.editable-note');
          if (editableDiv) {
              const noteLi = editableDiv.closest('.note');
              if (noteLi && !noteLi.classList.contains('is-locked')) {
                  const noteData = findNoteData(currentNotesData, noteLi.dataset.id)?.note;
                  if(noteData) {
                      noteData.content = editableDiv.innerHTML;
                      linkify(editableDiv);
                  }
              }
              runUpdates();
          }
          if (!formattingToolbar.matches(':hover') && !e.target.closest('#formatting-toolbar')) {
              formattingToolbar.style.display = 'none';
          }
      });

      // --- Drag and Drop (Optimized) ---
      notesList.addEventListener('dragstart', (e) => { if (isArchiveViewActive) return; if (e.target.classList.contains('drag-handle')) { draggedElement = e.target.closest('.note'); setTimeout(() => draggedElement.classList.add('dragging'), 0); } });
      notesList.addEventListener('dragover', (e) => { if (isArchiveViewActive) return; e.preventDefault(); if (!draggedElement) return; const targetNote = e.target.closest('.note'); if (targetNote && (draggedElement.contains(targetNote) || (targetNote.dataset.lockType && !sessionUnlockedNotes.has(targetNote.dataset.id)))) return; document.querySelectorAll('.drop-indicator').forEach(i => i.remove()); document.querySelectorAll('.drop-target-nest').forEach(el => el.classList.remove('drop-target-nest')); if (targetNote) { const rect = targetNote.getBoundingClientRect(); const noteContainer = targetNote.querySelector('.note-container'); const dropZoneHeight = rect.height / 3; if (e.clientY < rect.top + dropZoneHeight) { const indicator = document.createElement('div'); indicator.className = 'drop-indicator'; targetNote.parentElement.insertBefore(indicator, targetNote); } else if (e.clientY > rect.bottom - dropZoneHeight) { const indicator = document.createElement('div'); indicator.className = 'drop-indicator'; targetNote.parentElement.insertBefore(indicator, targetNote.nextSibling); } else { noteContainer.classList.add('drop-target-nest'); } } });
      notesList.addEventListener('drop', async (e) => { if (isArchiveViewActive) return; e.preventDefault(); if (!draggedElement) return;
        console.log('🎯 DROP: Iniciando reordenamiento...');
        const {note: noteData, parentArray: originalParent, index: originalIndex} = findNoteData(currentNotesData, draggedElement.dataset.id);
        if(!noteData) return;

        console.log('📝 Nota:', noteData.content.substring(0, 30), '| Índice original:', originalIndex);

        originalParent.splice(originalIndex, 1); // Remove from data model first

        const indicator = document.querySelector('.drop-indicator');
        const nestTarget = document.querySelector('.drop-target-nest');

        if (indicator) {
            const beforeElement = indicator.nextElementSibling;
            const list = indicator.parentElement;
            let targetParentArray;
            let targetIndex = -1;

            if (list === notesList) {
                targetParentArray = currentNotesData;
            } else {
                const parentLi = list.closest('.note');
                targetParentArray = findNoteData(currentNotesData, parentLi.dataset.id).note.children;
            }

            if (beforeElement) {
                // Buscar el beforeElement en el targetParentArray por ID (no por posición DOM)
                const beforeElementId = beforeElement.dataset.id;
                targetIndex = targetParentArray.findIndex(note => note.id === beforeElementId);

                // Si no se encuentra (puede pasar si beforeElement ya fue removido), insertar al final
                if (targetIndex === -1) {
                    targetIndex = targetParentArray.length;
                }

                console.log('🔍 beforeElement ID:', beforeElementId, '| Índice en array:', targetIndex);
            } else {
                targetIndex = targetParentArray.length;
            }

            console.log('📍 Nuevo índice calculado:', targetIndex, '| Total elementos:', targetParentArray.length);

            targetParentArray.splice(targetIndex, 0, noteData);
            indicator.parentElement.insertBefore(draggedElement, beforeElement);

        } else if (nestTarget) {
            const parentLi = nestTarget.closest('.note');
            const {note: parentData} = findNoteData(currentNotesData, parentLi.dataset.id);
            if(!parentData.children) parentData.children = [];
            parentData.children.push(noteData);

            let sublist = parentLi.querySelector('.subnotes');
            if(!sublist) {
                sublist = document.createElement('ul');
                sublist.className = 'subnotes';
                parentLi.appendChild(sublist);
            }
            sublist.appendChild(draggedElement);
            sublist.classList.remove('hidden');
        } else {
            // Dropped in empty space, put it back
            originalParent.splice(originalIndex, 0, noteData);
        }

        document.querySelectorAll('.drop-indicator').forEach(i => i.remove());
        document.querySelectorAll('.drop-target-nest').forEach(el => el.classList.remove('drop-target-nest'));
        runUpdates();

        // Mostrar el orden final de las notas en currentNotesData
        console.log('📋 Orden final en currentNotesData:', currentNotesData.map((n, idx) => `${idx}: ${n.content.substring(0, 20)}`));

        // Cancelar el guardado programado con delay y guardar inmediatamente
        clearTimeout(saveTimeout);
        console.log('🔄 Nota reordenada, guardando inmediatamente...');
        await saveCurrentDocument();
        console.log('✅ Orden guardado en IndexedDB');
      });
      notesList.addEventListener('dragend', () => { if (isArchiveViewActive) return; if (draggedElement) { draggedElement.classList.remove('dragging'); } draggedElement = null; document.querySelectorAll('.drop-indicator').forEach(i => i.remove()); document.querySelectorAll('.drop-target-nest').forEach(el => el.classList.remove('drop-target-nest')); });
      
      importFileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                
                if (importedData.appData && importedData.allNotesData) {
                    const choice = await promptImportOption('total');
                    if (choice === 'replace') {
                        localStorage.clear();
                        localStorage.setItem('uninote_app_data', JSON.stringify(importedData.appData));
                        for (const docName in importedData.allNotesData) {
                            saveNotesToStorage(docName, importedData.allNotesData[docName]);
                        }
                        showNotification('Backup total restaurado. Recargando...', 'success');
                        setTimeout(() => window.location.reload(), 1500);
                    } else if (choice === 'merge') {
                        const currentAppData = JSON.parse(localStorage.getItem('uninote_app_data') || '{}');
                        const backupAppData = importedData.appData;

                        backupAppData.documents.forEach(doc => { if (!currentAppData.documents.includes(doc)) currentAppData.documents.push(doc); });
                        backupAppData.favorites.forEach(fav => { if (!currentAppData.favorites.includes(fav)) currentAppData.favorites.push(fav); });
                        Object.assign(currentAppData.documentPasswords, backupAppData.documentPasswords);

                        saveAppData(currentAppData);

                        for (const docName in importedData.allNotesData) {
                            if (!localStorage.getItem(`uninote_doc_${docName}`)) {
                                saveNotesToStorage(docName, importedData.allNotesData[docName]);
                            }
                        }
                        showNotification('Datos fusionados. Recargando...', 'success');
                        setTimeout(() => window.location.reload(), 1500);
                    } else {
                        showNotification('Importación cancelada.', 'error');
                    }
                } 
                else if (Array.isArray(importedData)) {
                    const choice = await promptImportOption('legacy');
                    if (choice === 'replace') {
                        loadNotesFromData(importedData);
                        showNotification('Notas reemplazadas con éxito.');
                    } else if (choice === 'append') {
                        const newLis = [];
                        importedData.forEach(noteData => {
                           currentNotesData.push(noteData);
                           newLis.push(createNote(notesList, null, false, noteData));
                        });
                        newLis.forEach(renderNoteState);
                        runUpdates();
                        showNotification('Notas agregadas con éxito.');
                    } else {
                        showNotification('Importación cancelada.', 'error');
                    }
                } else {
                   throw new Error('Formato de archivo no reconocido.');
                }
            } catch (error) { showNotification('Error: El archivo no es un backup válido o está corrupto.', 'error'); console.error("Error al procesar el archivo JSON:", error); }
        };
        reader.readAsText(file);
        event.target.value = '';
      });

      importNotionInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const markdownText = e.target.result;
                const notesData = parseNotionMarkdown(markdownText);
                if (notesData.length === 0) { showNotification('No se encontraron notas válidas.', 'error'); return; }
                const choice = await promptImportOption('legacy');
                switch (choice) {
                    case 'replace': loadNotesFromData(notesData); showNotification('Notas de Notion importadas.'); break;
                    case 'append': 
                        notesData.forEach(noteData => {
                           currentNotesData.push(noteData);
                           const newLi = createNote(notesList, null, false, noteData);
                           renderNoteState(newLi);
                        });
                        runUpdates();
                        showNotification('Notas de Notion agregadas.'); 
                        break;
                    case 'cancel': showNotification('Importación cancelada.', 'error'); break;
                }
            } catch (error) { showNotification('Error al procesar el archivo de Notion.', 'error'); console.error("Error al procesar Markdown:", error); }
        };
        reader.readAsText(file);
        event.target.value = '';
      });
      
      toggleAllBtn.addEventListener('click', () => { const isCollapsed = toggleAllBtn.textContent === 'Contraer Todo'; document.querySelectorAll('.note:not([data-is-archived="true"]):not(.is-locked) > .subnotes').forEach(sublist => { sublist.classList.toggle('hidden', isCollapsed); }); toggleAllBtn.textContent = isCollapsed ? 'Expandir Todo' : 'Contraer Todo'; runUpdates(); });
      deselectAllBtn.addEventListener('click', () => { selectedNotes.forEach(note => { note.classList.remove('selected'); note.querySelector('.note-selector').checked = false; }); selectedNotes.clear(); updateBulkActionsBar(); });
      deleteSelectedBtn.addEventListener('click', async () => { if (selectedNotes.size === 0) return; const confirmed = await showConfirmationModal('Eliminar Notas', `¿Estás seguro de que quieres eliminar ${selectedNotes.size} nota(s) permanentemente? Esto incluye notas bloqueadas.`); if (confirmed) { selectedNotes.forEach(note => { const {parentArray, index} = findNoteData(currentNotesData, note.dataset.id) || {}; if(parentArray) parentArray.splice(index, 1); note.remove(); }); selectedNotes.clear(); updateBulkActionsBar(); ensureAtLeastOneNote(); runUpdates(); showNotification('Notas eliminadas.'); } else { showNotification('Eliminación cancelada.', 'error'); } });
      scrollTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
      scrollBottomBtn.addEventListener('click', () => { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); });
      themeToggleBtn.addEventListener('click', async () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
          document.body.removeAttribute('data-theme');
          themeToggleBtn.textContent = '🌙';

          // Remover de IndexedDB o localStorage
          if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
            await window.saveSettingAsync('Theme', null);
          } else {
            localStorage.removeItem('uninoteTheme');
          }
        } else {
          document.body.setAttribute('data-theme', 'dark');
          themeToggleBtn.textContent = '☀️';

          // Guardar en IndexedDB o localStorage
          if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
            await window.saveSettingAsync('Theme', 'dark');
          } else {
            localStorage.setItem('uninoteTheme', 'dark');
          }
        }
      });
      helpBtn.addEventListener('click', () => { helpModalOverlay.classList.remove('hidden'); });
      helpCloseBtn.addEventListener('click', () => { helpModalOverlay.classList.add('hidden'); });
      helpModalOverlay.addEventListener('click', (e) => { if (e.target === helpModalOverlay) helpModalOverlay.classList.add('hidden'); });
      indentSelectedBtn.addEventListener('click', () => { const notesToProcess = Array.from(selectedNotes).sort((a, b) => Array.from(notesList.querySelectorAll('.note')).indexOf(b) - Array.from(notesList.querySelectorAll('.note')).indexOf(a)); notesToProcess.forEach(noteLi => { const prevSibling = noteLi.previousElementSibling; if (prevSibling && prevSibling.classList.contains('note') && !prevSibling.classList.contains('is-locked')) { let sublist = prevSibling.querySelector('.subnotes'); if (!sublist) { sublist = document.createElement('ul'); sublist.className = 'subnotes'; prevSibling.appendChild(sublist); } sublist.appendChild(noteLi); } }); deselectAllBtn.click(); runUpdates(); });
      outdentSelectedBtn.addEventListener('click', () => { const notesToProcess = Array.from(selectedNotes).sort((a, b) => Array.from(notesList.querySelectorAll('.note')).indexOf(b) - Array.from(notesList.querySelectorAll('.note')).indexOf(a)); notesToProcess.forEach(noteLi => { const currentList = noteLi.parentElement; const parentNote = currentList.closest('.note'); if (parentNote) { const grandParentList = parentNote.parentElement; grandParentList.insertBefore(noteLi, parentNote.nextSibling); if (currentList.children.length === 0) currentList.remove(); } }); deselectAllBtn.click(); runUpdates(); });
      selectChildrenBtn.addEventListener('click', () => { const descendantsToSelect = new Set(); selectedNotes.forEach(note => { note.querySelectorAll('.note').forEach(descendant => { descendantsToSelect.add(descendant); }); }); descendantsToSelect.forEach(note => { selectedNotes.add(note); note.classList.add('selected'); note.querySelector('.note-selector').checked = true; }); updateBulkActionsBar(); });
      saveDateBtn.addEventListener('click', () => { if(activeNoteForDatePicker && dateTimeInput.value) { const date = new Date(dateTimeInput.value); activeNoteForDatePicker.dataset.dueDate = date.toISOString(); } else if (activeNoteForDatePicker) { activeNoteForDatePicker.dataset.dueDate = ''; } datePickerModalOverlay.classList.add('hidden'); runUpdates(); });
      removeDateBtn.addEventListener('click', () => { if(activeNoteForDatePicker) { activeNoteForDatePicker.dataset.dueDate = ''; datePickerModalOverlay.classList.add('hidden'); runUpdates(); } });
      cancelDateBtn.addEventListener('click', () => { datePickerModalOverlay.classList.add('hidden'); activeNoteForDatePicker = null; });
      datePickerModalOverlay.addEventListener('click', (e) => { if (e.target === datePickerModalOverlay) datePickerModalOverlay.classList.add('hidden'); });
      notificationCenterBtn.addEventListener('click', async () => {
        notificationCenterOverlay.classList.remove('hidden');
        notificationDot.classList.add('hidden');
        document.querySelectorAll('#notification-list li').forEach(li => {
          seenNotifications.add(li.dataset.noteId);
        });

        // Guardar en IndexedDB o localStorage
        if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
          await window.saveSettingAsync('SeenNotifications', [...seenNotifications]);
        } else {
          localStorage.setItem('uninoteSeenNotifications', JSON.stringify([...seenNotifications]));
        }
      });
      notificationCenterCloseBtn.addEventListener('click', () => { notificationCenterOverlay.classList.add('hidden'); });
      notificationCenterOverlay.addEventListener('click', (e) => { if (e.target === notificationCenterOverlay) notificationCenterOverlay.classList.add('hidden'); });
      toggleArchiveViewBtn.addEventListener('click', () => { isArchiveViewActive = !isArchiveViewActive; renderView(); });
      archiveControls.addEventListener('change', renderArchiveTimeline);
      
      documentTitle.addEventListener('click', () => {
          documentMenu.classList.toggle('hidden');
      });
      documentMenu.addEventListener('click', async (e) => {
        const targetLi = e.target.closest('li');
        const star = e.target.closest('.favorite-star');

        if(star) {
            e.stopPropagation();
            toggleFavorite(star.parentElement.dataset.docName);
            return;
        }

        if(targetLi) {
            const action = targetLi.dataset.action;
            const docName = targetLi.dataset.docName;
            documentMenu.classList.add('hidden');
            if(action) {
                if (action === 'create') await createNewDocument();
                else if (action === 'rename') await renameCurrentDocument();
                else if (action === 'delete') await deleteCurrentDocument();
                else if (action === 'set-default') {
                    appData.defaultDocument = currentDocumentName;
                    saveAppData();
                    renderDocumentMenu();
                    showNotification(`"${currentDocumentName}" es ahora el Uninote principal.`);
                }
                else if (action === 'set-doc-pass') {
                   if (appData.documentPasswords[currentDocumentName]) {
                     const choice = await showConfirmationModal('Gestionar Contraseña', '¿Deseas cambiar la contraseña o quitarla permanentemente?', { confirmText: 'Cambiar', cancelText: 'Quitar' });
                     if (choice) {
                        document.getElementById('set-password-modal-overlay').classList.remove('hidden');
                     } else {
                        const confirmed = await promptForDocumentPassword(currentDocumentName, 'remove');
                        if (confirmed) {
                           delete appData.documentPasswords[currentDocumentName];
                           unlockedDocuments.delete(currentDocumentName);
                           saveAppData();
                           renderAppUI();
                           showNotification(`Contraseña eliminada del Uninote "${currentDocumentName}".`);
                        }
                     }
                   } else {
                     document.getElementById('set-password-modal-overlay').classList.remove('hidden');
                   }
                   document.getElementById('set-password-title').textContent = `Contraseña para el Uninote "${currentDocumentName}"`;
                   document.getElementById('set-password-hint-container').style.display = 'none';
                   document.getElementById('set-password-input').value = '';
                   document.getElementById('set-password-confirm-input').value = '';
                }
            } else if (docName) {
                await switchDocument(docName);
            }
        }
      });
      tabsContainer.addEventListener('click', async (e) => {
          const tab = e.target.closest('.tab-button');
          if (tab && tab.dataset.docName !== currentDocumentName) {
              await switchDocument(tab.dataset.docName);
          }
      });
      
      // Security event listeners
      relockDocBtn.addEventListener('click', async () => {
        unlockedDocuments.delete(currentDocumentName);
        renderView();
      });

      appSettingsBtn.addEventListener('click', () => {
        document.getElementById('app-settings-modal-overlay').classList.remove('hidden');
        renderAppSettings();
      });

      function renderAppSettings() {
        appLockEnableToggle.checked = appData.isAppLockEnabled;
        document.getElementById('app-lock-master-password-input').value = appData.appLockPasswordHash ? '********' : '';
        document.getElementById('universal-password-input').value = appData.universalPasswordHash ? '********' : '';
        
        document.getElementById('app-lock-create-btn').classList.toggle('hidden', !!appData.appLockPasswordHash);
        document.getElementById('app-lock-change-btn').classList.toggle('hidden', !appData.appLockPasswordHash);
        document.getElementById('app-lock-remove-btn').classList.toggle('hidden', !appData.appLockPasswordHash);
        
        document.getElementById('universal-create-btn').classList.toggle('hidden', !!appData.universalPasswordHash);
        document.getElementById('universal-change-btn').classList.toggle('hidden', !appData.universalPasswordHash);
        document.getElementById('universal-remove-btn').classList.toggle('hidden', !appData.universalPasswordHash);
      }
      
      document.getElementById('cancel-app-settings-btn').addEventListener('click', () => {
        document.getElementById('app-settings-modal-overlay').classList.add('hidden');
      });

      appLockEnableToggle.addEventListener('change', async function(e) {
          e.preventDefault();
          const isEnabling = e.target.checked;
          const originalState = !isEnabling;

          if (isEnabling && !appData.appLockPasswordHash) {
              showAlertModal('Acción Requerida', 'Primero debes establecer y guardar una contraseña de bloqueo total para poder activar esta función.');
              e.target.checked = false;
              return;
          }
          
          const password = await showPromptModal('Verificación de Seguridad', `Introduce tu contraseña de bloqueo total para ${isEnabling ? 'activar' : 'desactivar'} el bloqueo:`, {type: 'password'});
          if (password && await verifyPassword(password, appData.appLockPasswordHash)) {
              appData.isAppLockEnabled = isEnabling;
              saveAppData();
              e.target.checked = isEnabling;
              showNotification(`Bloqueo total de la app ${isEnabling ? 'activado' : 'desactivado'}.`, 'success');
              if (typeof appData.appLockPasswordHash === 'string') {
                  appData.appLockPasswordHash = await hashPasswordWithSalt(password);
                  saveAppData();
                  showNotification('Contraseña maestra actualizada al nuevo formato de seguridad.');
              }
          } else {
              if (password !== null) {
                showNotification('Contraseña incorrecta. El cambio no se ha aplicado.', 'error');
              }
              e.target.checked = originalState;
          }
      });

      async function managePassword(type, action) {
        const isMaster = type === 'master';
        const currentHash = isMaster ? appData.appLockPasswordHash : appData.universalPasswordHash;
        const passwordName = isMaster ? 'de bloqueo total' : 'universal';
        
        if (action === 'create' || action === 'change') {
            if (action === 'change') {
                const oldPass = await showPromptModal('Verificación de Seguridad', `Introduce tu contraseña ${passwordName} ACTUAL:`, {type: 'password'});
                if (!oldPass || !(await verifyPassword(oldPass, currentHash))) {
                    showNotification('Contraseña de verificación incorrecta.', 'error');
                    return;
                }
            }
            const { newPass } = await showSetPasswordModal(`Nueva Contraseña ${passwordName}`);
            if (newPass) {
                const newHash = await hashPasswordWithSalt(newPass);
                if (isMaster) appData.appLockPasswordHash = newHash;
                else appData.universalPasswordHash = newHash;
                saveAppData();
                showNotification(`Contraseña ${passwordName} ${action === 'create' ? 'creada' : 'cambiada'} con éxito.`);
                renderAppSettings();
            }
        } else if (action === 'remove') {
            const oldPass = await showPromptModal('Verificación de Seguridad', `Introduce tu contraseña ${passwordName} ACTUAL para quitarla:`, {type: 'password'});
            if (!oldPass || !(await verifyPassword(oldPass, currentHash))) {
                showNotification('Contraseña de verificación incorrecta.', 'error');
                return;
            }
            const confirmed = await showConfirmationModal('Quitar Contraseña', `¿Estás seguro de que quieres quitar la contraseña ${passwordName}?`);
            if (confirmed) {
                if (isMaster) {
                    appData.appLockPasswordHash = null;
                    appData.isAppLockEnabled = false;
                } else {
                    appData.universalPasswordHash = null;
                }
                saveAppData();
                showNotification(`Contraseña ${passwordName} eliminada.`);
                renderAppSettings();
            }
        }
      }

      document.getElementById('app-lock-create-btn').addEventListener('click', () => managePassword('master', 'create'));
      document.getElementById('app-lock-change-btn').addEventListener('click', () => managePassword('master', 'change'));
      document.getElementById('app-lock-remove-btn').addEventListener('click', () => managePassword('master', 'remove'));
      document.getElementById('universal-create-btn').addEventListener('click', () => managePassword('universal', 'create'));
      document.getElementById('universal-change-btn').addEventListener('click', () => managePassword('universal', 'change'));
      document.getElementById('universal-remove-btn').addEventListener('click', () => managePassword('universal', 'remove'));

      lockMenu.addEventListener('click', async (e) => {
          if (!activeNoteForLock) return;
          const noteToProcess = activeNoteForLock;
          const action = e.target.dataset.action;
          activeNoteForLock = null; 
          lockMenu.style.display = 'none';

          if (action === 'unlock' || action === 'remove-lock') {
              activeNoteForLock = noteToProcess;
              const title = action === 'unlock' ? 'Desbloquear Nota' : 'Confirmar para quitar bloqueo';
              document.getElementById('unlock-modal-overlay').querySelector('h2').textContent = title;
              document.getElementById('unlock-password-input').value = '';
              document.getElementById('unlock-modal-overlay').classList.remove('hidden');
              document.getElementById('unlock-password-input').focus();
              return;
          }
          if (action === 'relock') {
              sessionUnlockedNotes.delete(noteToProcess.dataset.id);
              renderNoteState(noteToProcess);
              runUpdates();
              return;
          }
          
          const lockType = action.split('-')[1];

          const applyLock = (hash, type) => {
            const editable = noteToProcess.querySelector('.editable-note');
            noteToProcess.dataset.lockedContent = editable.innerHTML;
            noteToProcess.dataset.lockType = type;
            noteToProcess.dataset.lockHint = editable.textContent.substring(0, 30).trim() || "Nota bloqueada";
            noteToProcess.dataset.passwordHash = JSON.stringify(hash);
            renderNoteState(noteToProcess);
            runUpdates();
            showNotification(`Nota bloqueada.`);
          };

          if (lockType === 'universal') {
              applyLock(appData.universalPasswordHash, 'universal');
          } else if (lockType === 'document') {
              applyLock(appData.documentPasswords[currentDocumentName], 'document');
          } else if (lockType === 'exclusive') {
              const {newPass, newHint} = await showSetPasswordModal('Crear Bloqueo Exclusivo', true);
              if(newPass){
                const hashData = await hashPasswordWithSalt(newPass);
                const noteToLock = noteToProcess;
                noteToLock.dataset.lockedContent = noteToLock.querySelector('.editable-note').innerHTML;
                noteToLock.dataset.lockType = 'exclusive';
                noteToLock.dataset.lockHint = newHint || 'Contenido bloqueado';
                noteToLock.dataset.passwordHash = JSON.stringify(hashData);
                renderNoteState(noteToLock);
                runUpdates();
                showNotification('Nota bloqueada con contraseña exclusiva.');
              }
          }
      });

      function showSetPasswordModal(title, showHint = false) {
        return new Promise(resolve => {
            const modal = document.getElementById('set-password-modal-overlay');
            modal.querySelector('#set-password-title').textContent = title;
            modal.querySelector('#set-password-hint-container').style.display = showHint ? 'block' : 'none';
            const passInput = modal.querySelector('#set-password-input');
            const confirmInput = modal.querySelector('#set-password-confirm-input');
            const hintInput = modal.querySelector('#set-password-hint-input');
            [passInput.value, confirmInput.value, hintInput.value] = ['', '', ''];

            modal.classList.remove('hidden');
            passInput.focus();

            const saveBtn = modal.querySelector('#save-password-btn');
            const cancelBtn = modal.querySelector('#cancel-password-btn');

            const cleanupAndResolve = (result) => {
                modal.classList.add('hidden');
                saveBtn.onclick = null;
                cancelBtn.onclick = null;
                resolve(result);
            };

            saveBtn.onclick = () => {
                if (passInput.value !== confirmInput.value) {
                    showAlertModal('Error', 'Las contraseñas no coinciden.');
                    return;
                }
                if (!passInput.value) {
                    showAlertModal('Error', 'La contraseña no puede estar vacía.');
                    return;
                }
                cleanupAndResolve({newPass: passInput.value, newHint: hintInput.value});
            };
            cancelBtn.onclick = () => cleanupAndResolve({});
        });
      }

      document.getElementById('unlock-confirm-btn').addEventListener('click', async () => {
          if (!activeNoteForLock) return;
          const noteToProcess = activeNoteForLock;
          const actionTitle = document.getElementById('unlock-modal-overlay').querySelector('h2').textContent;
          const isRemovingLock = actionTitle.includes('quitar');

          const passInput = document.getElementById('unlock-password-input');
          const pass = passInput.value;
          const hashData = JSON.parse(noteToProcess.dataset.passwordHash);

          const isCorrect = await verifyPassword(pass, hashData);
          passInput.value = '';
          
          if (isCorrect) {
              document.getElementById('unlock-modal-overlay').classList.add('hidden');
              if (isRemovingLock) {
                  permanentlyRemoveLock(noteToProcess);
                  showNotification('Bloqueo de nota eliminado permanentemente.');
              } else {
                  sessionUnlockedNotes.add(noteToProcess.dataset.id);
                  if(typeof hashData === 'string'){
                      const {note} = findNoteData(currentNotesData, noteToProcess.dataset.id);
                      if(note) {
                        note.passwordHash = await hashPasswordWithSalt(pass);
                        runUpdates();
                        showNotification('Contraseña de nota actualizada a nuevo formato de seguridad.');
                      }
                  }
                  renderNoteState(noteToProcess);
                  runUpdates();
                  showNotification('Nota desbloqueada.');
                  noteToProcess.querySelector('.editable-note').focus();
              }
              activeNoteForLock = null; // Clear on success
          } else {
              showNotification('Contraseña incorrecta.', 'error');
              passInput.style.animation = 'shake 0.5s';
              setTimeout(() => { passInput.style.animation = '' }, 500);
          }
      });
       document.getElementById('unlock-cancel-btn').addEventListener('click', () => {
          document.getElementById('unlock-modal-overlay').classList.add('hidden');
          activeNoteForLock = null;
      });
      
      transferBtn.addEventListener('click', () => transferMenu.classList.toggle('hidden'));
      transferMenu.addEventListener('click', async (e) => {
        const li = e.target.closest('li');
        if (!li) return;
        const action = li.dataset.action;
        if (action === 'export-current') await exportCurrentUninote();
        else if (action === 'export-total') await exportTotalBackup();
        transferMenu.classList.add('hidden');
      });

      async function exportCurrentUninote() {
          await saveCurrentDocument();
          const dataStr = JSON.stringify(currentNotesData, null, 2);
          const blob = new Blob([dataStr], {type: "application/json"});
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `uninote_${currentDocumentName.replace(/ /g, '_')}.json`;
          a.click();
          URL.revokeObjectURL(url);
      }

      async function exportTotalBackup() {
          await saveCurrentDocument();
          const allNotesData = {};

          // Cargar todos los documentos desde IndexedDB
          if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
              for (const docName of appData.documents) {
                  allNotesData[docName] = await window.loadDocumentAsync(docName) || [];
              }
          } else {
              appData.documents.forEach(docName => {
                  allNotesData[docName] = JSON.parse(localStorage.getItem(`uninote_doc_${docName}`) || '[]');
              });
          }

          const totalBackup = {
              appData: appData,
              allNotesData: allNotesData
          };
          const dataStr = JSON.stringify(totalBackup, null, 2);
          const blob = new Blob([dataStr], {type: "application/json"});
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          const date = new Date().toISOString().slice(0, 10);
          a.href = url;
          a.download = `uninote_backup_total_${date}.json`;
          a.click();
          URL.revokeObjectURL(url);
      }

      async function initializeAppLogic() {
        isInitializing = true;

        // Cargar tema (ya se hace en initialization.js, pero por si acaso)
        let savedTheme;
        if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
            savedTheme = await window.loadSettingAsync('Theme');
        } else {
            savedTheme = localStorage.getItem('uninoteTheme');
        }
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        }

        // Cargar emojis recientes desde IndexedDB o localStorage
        if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
            recentEmojis = await window.loadSettingAsync('Recents') || [];
        } else {
            recentEmojis = JSON.parse(localStorage.getItem('uninoteRecents')) || [];
        }

        // Cargar notificaciones vistas desde IndexedDB o localStorage
        if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
            const seenArray = await window.loadSettingAsync('SeenNotifications') || [];
            seenNotifications = new Set(seenArray);
        } else {
            seenNotifications = new Set(JSON.parse(localStorage.getItem('uninoteSeenNotifications')) || []);
        }

        // Cargar appData desde IndexedDB o localStorage
        let savedAppData;
        if (window.isUsingIndexedDB && window.isUsingIndexedDB()) {
            savedAppData = await window.loadAppDataAsync();
        } else {
            const savedAppDataStr = localStorage.getItem('uninote_app_data');
            savedAppData = savedAppDataStr ? JSON.parse(savedAppDataStr) : null;
        }

        if (savedAppData) {
          appData = savedAppData;
          appData.documentPasswords = appData.documentPasswords || {};
          appData.universalPasswordHash = appData.universalPasswordHash || null;
          appData.defaultDocument = appData.defaultDocument || null;
          appData.isAppLockEnabled = appData.isAppLockEnabled || false;
          appData.appLockPasswordHash = appData.appLockPasswordHash || null;
        } else {
          const defaultDocName = "Mi Primer Uninote";
          appData = {
            documents: [defaultDocName],
            favorites: [],
            activeDocument: defaultDocName,
            universalPasswordHash: null,
            documentPasswords: {},
            defaultDocument: null,
            isAppLockEnabled: false,
            appLockPasswordHash: null,
          };
          await saveNotesToStorage(defaultDocName, []);
        }

        let docToLoad = appData.defaultDocument;
        if (!docToLoad || !appData.documents.includes(docToLoad)) {
            docToLoad = appData.activeDocument;
        }
        if (appData.documentPasswords[docToLoad]) {
            const firstUnlocked = appData.documents.find(doc => !appData.documentPasswords[doc]);
            if (firstUnlocked) docToLoad = firstUnlocked;
        }
        if (!docToLoad || !appData.documents.includes(docToLoad)) {
            docToLoad = appData.documents[0] || "Mi Primer Uninote";
            if (!appData.documents.includes(docToLoad)) {
                appData.documents.push(docToLoad);
                await saveNotesToStorage(docToLoad, []);
            }
        }

        await switchDocument(docToLoad);

        populateEmojiPicker();

        setInterval(() => {
            updateAllCountdowns();
            if(!isArchiveViewActive) checkAndTriggerNotifications();
        }, 30000);

        isInitializing = false;
        runUpdates();
      }

      function initialize() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }

        const appDataRaw = localStorage.getItem('uninote_app_data');
        const localAppData = appDataRaw ? JSON.parse(appDataRaw) : {};
        
        if (localAppData.isAppLockEnabled && localAppData.appLockPasswordHash) {
          appLockOverlay.classList.remove('hidden');
          appLockPasswordInput.focus();

          const handleUnlock = async () => {
            const enteredPass = appLockPasswordInput.value;
            const isCorrect = await verifyPassword(enteredPass, localAppData.appLockPasswordHash);
            if (isCorrect) {
              appLockOverlay.classList.add('hidden');
              if(typeof localAppData.appLockPasswordHash === 'string') {
                  localAppData.appLockPasswordHash = await hashPasswordWithSalt(enteredPass);
                  saveAppData(localAppData);
                  showNotification('Contraseña maestra actualizada al nuevo formato de seguridad.');
              }
              initializeAppLogic();
            } else {
              showNotification('Contraseña de la aplicación incorrecta.', 'error');
              appLockPasswordInput.style.animation = 'shake 0.5s';
              setTimeout(() => { appLockPasswordInput.style.animation = '' }, 500);
              appLockPasswordInput.value = '';
              appLockPasswordInput.focus();
            }
          };

          appLockUnlockBtn.onclick = handleUnlock;
          appLockPasswordInput.onkeydown = (e) => {
            if (e.key === 'Enter') handleUnlock();
          }
        } else {
          initializeAppLogic();
        }
      }
      
      initialize();

    });
