import { getContext } from '../../../extensions.js';

(function () {
    const inputForm = document.querySelector('#send_form');
    const groupMembersContainer = document.querySelector('#rm_group_members');

    if (!inputForm || !(inputForm instanceof HTMLDivElement)) {
        console.warn('ECJ Character ShortCut: #send_form not found.');
        return;
    }

    if (!groupMembersContainer || !(groupMembersContainer instanceof HTMLDivElement)) {
        console.warn('ECJ Character ShortCut: #rm_group_members not found.');
        return;
    }

    // 1️⃣ Create shortcut container
    let shortcutContainer = document.querySelector('#ECJ_char_shortcut');
    if (!shortcutContainer) {
        shortcutContainer = document.createElement('div');
        shortcutContainer.id = 'ECJ_char_shortcut';
        shortcutContainer.style.display = 'flex';
        shortcutContainer.style.flexWrap = 'wrap';
        shortcutContainer.style.gap = '8px';
        shortcutContainer.style.marginBottom = '8px';
        shortcutContainer.style.marginLeft = '5px';

        inputForm.parentElement.insertBefore(shortcutContainer, inputForm);
    }

    // 2️⃣ Function to copy all group_member DIVs
    function refreshShortcut() {
        shortcutContainer.innerHTML = '';
        const members = groupMembersContainer.querySelectorAll('.group_member');
        members.forEach(member => {
            const memberDiv = document.createElement('div');
            console.log("ECJ Character Shortcut: ", memberDiv.classList.contains("is_fav"));
            const avatar = member.querySelector(".avatar").cloneNode(true);
            member.classList.contains("is_fav") ? avatar.classList.add("is_fav") : null;
            memberDiv.style.cursor = 'pointer';
            memberDiv.appendChild(avatar);


            memberDiv.addEventListener('click', () => {
            member.querySelector("[data-action='speak']").click();});

            shortcutContainer.appendChild(memberDiv);
        });
    }

    // Initial copy
    refreshShortcut();

    // 3️⃣ MutationObserver to watch for added/removed children
    const observer = new MutationObserver((mutations) => {
        let shouldRefresh = false;
        for (const mutation of mutations) {
            if (mutation.type === 'childList' && (mutation.addedNodes.length || mutation.removedNodes.length)) {
                shouldRefresh = true;
                break;
            }
        }
        if (shouldRefresh) {
            refreshShortcut();
        }
    });

    observer.observe(groupMembersContainer, { childList: true, subtree: false });
})();
