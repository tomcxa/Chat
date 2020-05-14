export default class LoginForm {
    constructor(container) {
        this.container = container;
    }

    _createForm() {
        return `
        <form class="login">
    <label>
      Enter nickname
      <input class="input" type="text" placeholder="Jopello Seranutti">
      <button class="btn">Enter</button>
    </label>
  </form>`
    }
}