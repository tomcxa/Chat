import API from './API';

export default class Messanger {
    constructor(name, url) {
        this.userName = name;
        this.api = new API(url);
    }

    init() {
        this.messengerField = document.querySelector('.messenger-field');
        this.message = document.querySelector('#message');
        this.messengerList = document.querySelector('#messenger-list');
        this.messengerField.classList.remove('hidden');
        this.initWS();
        this.drawUsersList();

        this.message.addEventListener('keypress', (evt) => {
            // send message
            if (evt.key === 'Enter') {
                this.sendMessage(this.message.value);
                this.message.value = '';
            }
        });
    }

    initWS() {
        this.ws = new WebSocket(this.url);

        this.ws.addEventListener('open', () => {
            console.log('connected with server');
        });

        this.ws.addEventListener('message', (evt) => {
            this.drawMessage(evt);
        });

        this.ws.addEventListener('close', (evt) => {
            console.log('connection with server closed', evt);
        });

        this.ws.addEventListener('error', () => {
            console.log('something went wrong...');
        });
    }

    async drawUsersList() {
        const response = await api.load();
        const users = await response.json();
        const usersList = document.querySelector('#users');
        usersList.innerHTML = '';
        for (const item of users) {
            const newUser = document.createElement('div');
            newUser.className = 'item-user';
            newUser.innerHTML = `
        <div class="item-img-user"></div>
        <div class="item-name-user
          ${item.name === this.userName ? 'active' : ''}
        ">${item.name}</div>
        `;
            usersList.appendChild(newUser);
        }
    }

    drawMessage(message) {
        const { type } = JSON.parse(message.data);

        if (type === 'message') {
            const {
                name,
                msg,
                date,
            } = JSON.parse(message.data);

            const itemMessage = document.createElement('li');
            itemMessage.className = `
          list-item-msg
          ${this.userName === name ? 'active' : ''}
        `;

            itemMessage.innerHTML = `
        <div class="list-item-head">
          <span>${name}</span>
          <span>${showDate(date)}</span>
        </div>
        <div class="list-item-msg">
        ${msg}
        </div>
        `;

            this.messengerList.appendChild(itemMessage);
            this.messengerList.scrollTo(0, itemMessage.offsetTop);
        } else if (type === 'add user') {
            this.drawUsersList();
        } else if (type === 'del user') {
            console.log('delete user');
            this.drawUsersList();
        }
    }

    sendMessage(message) {
        if (this.ws.readyState === WebSocket.OPEN) {
            try {
                const newMessage = {
                    type: 'message',
                    name: this.userName,
                    msg: message,
                    date: new Date(),
                };
                this.ws.send(JSON.stringify(newMessage));
            } catch (e) {
                console.log('somethin went wrong');
                console.log(e);
            }
        } else {
            console.log('reconect');
            this.ws = new WebSocket(this.url);
        }
    }
}
