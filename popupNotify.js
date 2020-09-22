const template = document.createElement('template');
template.innerHTML = `
    <style>
        .tooltip-container {
            display: inline-block;
            position: relative;
            z-index: 2;
        }

        .cancel {
            display: none;
        }

        svg {
            width: 1em;
            cursor: pointer;
        }

        .notify-container {
            position: absolute;
            bottom: 125%;
            z-index: 9;
            width: 300px;
            background: white;
            box-shadow: 5px 5px 10px rgba(0,0,0,.1);
            font-size: .8em;
            border-radius: .5em;
            padding: 1em;
            transform: scale(0);
            transform-origin: bottom left;
            transition: transform .5s cubic-bezier(0.860, 0.000, 0.070, 1.000);
        }
    </style>

    <div class="tooltip-container">
        <svg viewBox="0 0 24 24" fill="none" class="alert" >
            <g id="24 / notifications / alert-circle">
                <path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12.0003 17.9983C12.5528 17.9983 13.0007 17.5506 13.0007 16.9983C13.0007 16.4461 12.5528 15.9983 12.0003 15.9983C11.4479 15.9983 11 16.4461 11 16.9983C11 17.5506 11.4479 17.9983 12.0003 17.9983ZM13.0036 5.99835H11.003V13.9983H13.0036V5.99835Z" fill="black"/>
            </g>
        </svg>
        <svg viewBox="0 0 24 24" fill="none" class="cancel" >
            <g id="24 / basic / circle-x">
                <path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM8.70711 16.7071L12 13.4142L15.2929 16.7071L16.7071 15.2929L13.4142 12L16.7071 8.70711L15.2929 7.29289L12 10.5858L8.70711 7.29289L7.29289 8.70711L10.5858 12L7.29289 15.2929L8.70711 16.7071Z" fill="black"/>
            </g>
        </svg>

        <div class="notify-container">
            <slot name="message" />
        </div>
    </div>
`

class PopupNotify extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    tooltip(expand_state) {
        const tooltip = this.shadowRoot.querySelector('.notify-container');
        const alert = this.shadowRoot.querySelector('.alert');
        const cancel = this.shadowRoot.querySelector('.cancel');
        
        tooltip.style.transform = (expand_state) ? 'scale(1)' : 'scale(0)'; 
        alert.style.display = (expand_state) ? 'none' : 'block';
        cancel.style.display = (expand_state) ? 'block' : 'none';
        expand_state = !expand_state;
    }
    
    connectedCallback() {
        this.shadowRoot.querySelector('.alert').addEventListener('click', () => this.tooltip(true))
        this.shadowRoot.querySelector('.cancel').addEventListener('click', () => this.tooltip(false))
        if(this.getAttribute('tip_background')) 
            { this.shadowRoot.querySelector('.notify-container').style.background = this.getAttribute('tip_background') }
        if(this.getAttribute('tip_font')) 
            { this.shadowRoot.querySelector('.notify-container').style.color = this.getAttribute('tip_font') }

    }
}

window.customElements.define('popup-notify', PopupNotify)