class DropboxController
{
    constructor() {
        // Elementos do DOM
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackModalEl = document.querySelector('#react-snackbar-root');

        // methods
        this.initEvents();
    }

    initEvents() {
        // botão de envio
        this.btnSendFileEl.addEventListener('click', event => {
            this.inputFilesEl.click();
        });

        // input file
        this.inputFilesEl.addEventListener('change', event => {
            console.log(event.target.files);

            // mostra na tela
            this.snackModalEl.style.display = 'block';
        });
    }
}