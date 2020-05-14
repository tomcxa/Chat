const userList = {
    setup(container, data) {

    },
    bindToDOM(container, html) {

    },
    createEl(data) {
        const users = document.createElement('ul');
        users.classList.add('chat-users', 'unstyle');
        
        return `
        <ul class="chat-users unstyle">
            <li class="chat-users_user">Egorka</li>
            <li class="chat-users_user">Andriysha</li>
        </ul>
        `;
    },
}