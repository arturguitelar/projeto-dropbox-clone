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
            
            this.uploadTasks(event.target.files);

            // mostra na tela
            this.snackModalEl.style.display = 'block';
        });
    }

    /**
     * Recebe uma coleção de arquivos e retorna uma Promise com cada uma 
     * das Promises dessa coleção.
     * 
     * @param {*} files
     * @return {Promise} Promise. 
     */
    uploadTasks(files) {
        let promises = [];

        // Nota: [...files] converte a coleção recebida em files para um array
        [...files].forEach(file => {
            promises.push(new Promise((resolve, reject) => {
                let ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload');

                ajax.onload = event => {
                    try {
                        resolve(JSON.parse(ajax.responseText));
                    } catch(e) {
                        reject(e);
                    }
                };

                ajax.onerror = event => {
                    reject(event);
                }

                // Lendo o arquivo com FormData
                let formData = new FormData();
                formData.append('input-file', file);

                ajax.send(formData);
            }));
        });

        return Promise.all(promises);
    }
}