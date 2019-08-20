import { LitElement, html, css } from 'lit-element';
import '@fortawesome/fontawesome-free/js/all.js';

/**
 * `menu-slide`
 * MenuSlide
 *
 * @customElement menu-slide
 * @polymer
 * @litElement
 * @demo demo/index.html
 */

class MenuSlide extends LitElement {
  static get is() {
    return 'menu-slide';
  }

  static get properties() {
    return {
      items: { type: Array }
    };
  }

  constructor() {
    super();
    this.logo = 'LOGO';
    this.urlLogo = '#';
    this.items = [
      {url: '#aboutme', text: 'About Me', faIcon: 'address-card' },
      {url: '#skills', text: 'skills', faIcon: 'toilet-paper' },
      {url: '#mywork', text: 'My Work', faIcon: 'briefcase' }
    ];
  }

  static get styles() {
    return css`
      :host {
        margin: 0;
        padding: 0;
        background: #FFFFFF;
        color: #cdcdcd;
        font-family: "Avenir Next", "Avenir", sans-serif;

        --bg-menucol: #cdcdcd;
        --fg-menucol: #FFFFFF;
        --fg-menucol-hover: #FF7900;
      }

      a {
        text-decoration: none;
        color: var(--fg-menucol);
        transition: color 0.3s ease;
      }

      a:hover {
        color: var(--fg-menucol-hover);
      }

      nav{
        position:relative;
        top:10px;
        left:0;
        height:100vh;        
        width: 20vw;
        margin: 0 0 0 -42vh;
        -moz-transition:all 200ms ease-in;
        -webkit-transition:all 200ms ease-in;
        -o-transition:all 200ms ease-in;
        transition:all 200ms ease-in;
      }
      nav ul{
          width:20vw;
          min-width:200px;
          height:100vh;
          padding:0;
          padding-top:10vh;
          margin:0;
          margin-top:-7vh;
          list-style:none;
          background:#222;
          overflow:hidden;
      }
      nav li{
          margin:0;
      }
      nav a{
          color:#fff;
          font-size:1em;
          font-family:'helvetica neue', helvetica, arial, sans-serif;
          text-decoration:none;
          display:block;
          padding:12px 15px;
          font-weight:300;
          letter-spacing:2px;
          border-bottom:1px solid #333;
      }
      nav a:hover{
          background:#111;
      }
      label{
        margin-right: 20px;
        width: 42px;
        height: 42px;
        position: relative;
        display: block;
        background: #FF7900;
        -moz-transition:all 200ms ease-in;
        -webkit-transition:all 200ms ease-in;
        -o-transition:all 200ms ease-in;
        transition:all 200ms ease-in;
      }
      input[type="checkbox"]{
          display:none;
      }
      input[type="checkbox"]:checked ~ nav{
          margin:0;
          margin-right: 20px;
      }
      input[type="checkbox"]:checked ~ label{
          left:0px;
      }
      input[type="checkbox"]:checked ~ section{
          -webkit-transform:translate3d(260px, 0, 0);
          -moz-transform:translate3d(260px, 0, 0);
          -o-transform:translate3d(260px, 0, 0);
          transform:translate3d(260px, 0, 0);
      }

      .menu_hamburguer_x {
        position: absolute;
        top: 8px;
        left: 8px;
        z-index: 999;
        height: 28px;
        width: 28px;
        outline: none;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
      .menu_hamburguer_x span,
      .menu_hamburguer_x span::before,
      .menu_hamburguer_x span::after {
        position: absolute;
        content: '';
        width: 28px;
        height: 2.5px;
        background: #fafafa;
        border-radius: 20px;
        transition: 500ms cubic-bezier(0.77, 0, 0.175, 1);
      }
      .menu_hamburguer_x span::before {
        top: -8px;
      }
      .menu_hamburguer_x span::after {
        top: 8px;
      }
      .menu_hamburguer_x.active > span {
        background: transparent;
      }
      .menu_hamburguer_x.active > span::before, .menu_hamburguer_x.active > span::after {
        background: var(--fg-menucol-hover);
        top: 0px;
      }
      .menu_hamburguer_x.active > span::before {
        -webkit-transform: rotate(-225deg);
                transform: rotate(-225deg);
      }
      .menu_hamburguer_x.active > span::after {
        -webkit-transform: rotate(225deg);
                transform: rotate(225deg);
      }

      .menu__link:not(.active) span {
        display:inline-block;
        -webkit-transform: translateX(-200px);
        transform: translateX(-200px);
        transition: all .15s ease;
      }

      .menu__link:hover span, .menu__link.active {
        -webkit-transform: translateX(0);
                transform: translateX(0);
        color: #4bafac;
        font-weight: bold;
      }

      .menu__link svg { 
        margin-left: 1rem;
        transform: scale(2.5);
        transition: all .15s ease;
      }
      .menu__link:hover svg, .active svg { 
        margin-left:0;
        transition: all .15s ease;
        transform: scale(1);
      }


      @media screen and (max-width: 550px) {
        nav ul {
          min-width:120px;
        }
      }
    `;
  }

  getHamburger() {
    return html`
      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>
    `;
  }

  getFaIcon(n) {
    let obj = {prefix: 'fa', iconName: n};
    let icn = window.FontAwesome.icon(obj) || {node: ''};
    return html`${icn.node}`;
  }

  getMenuItem(item, index) {
    let url = item.url || '#';
    let text = item.text || '';
    let icon = item.faIcon || '';

    return html`
      <li>
        <a class="menu__link" href="${url}" tabindex="${index}" role="link">
          ${this.getFaIcon(icon)}
          <span>${text}</span>
        </a>
      </li>
    `;
  }

  firstUpdated() {
    let hamburguer = this.shadowRoot.querySelector('label');
    let toggler = this.shadowRoot.querySelector('.menu_hamburguer_x');

    hamburguer.addEventListener('click', () => {
      toggler.classList.toggle('active');
    });

    let menuItems = this.shadowRoot.querySelectorAll('li');
    menuItems.forEach((menuItem)=> {
      menuItem.addEventListener('click', (e) => {
        let menuLinks = this.shadowRoot.querySelectorAll('.menu__link');
        menuLinks.forEach((menuLink) => {
          menuLink.classList.remove('active');
        });
        e.currentTarget.querySelector('.menu__link').classList.add('active');
        let menuEvent = new CustomEvent('menuItemSelected', {
          detail: {
            menuItem: e.currentTarget.querySelector('.menu__link span').textContent,
            url: e.currentTarget.querySelector('.menu__link').href
          }
        });
        document.dispatchEvent(menuEvent);
        hamburguer.click();
      });
    });
  }

  render() {
    return html`
      <style>
        ${window.FontAwesome.dom.css()}
      </style>

      <input type="checkbox" id="navigation" />
      <label for="navigation">
        <div class="menu_hamburguer_x"><span></span></div>
      </label>

      <nav>
          <ul>
            ${this.items.map(
    (item, index) => {
      return html`${this.getMenuItem(item, index)}`;
    }
  )}    
          </ul>
      </nav>
    `;
  }
}

window.customElements.define(MenuSlide.is, MenuSlide);