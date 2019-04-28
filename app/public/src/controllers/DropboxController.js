class DropboxController
{
    constructor() {
        // Elementos do DOM
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackModalEl = document.querySelector('#react-snackbar-root');
        this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg')
        this.fileNameEl = this.snackModalEl.querySelector('.filename')
        this.timeLeftEl = this.snackModalEl.querySelector('.timeleft')

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
            this.modalShow();

            // restart no evento 'change'
            this.inputFilesEl.value = '';
        });
    }

    /**
     * Mostra ou esconde o modal de progresso na tela.
     * 
     * @param {Boolean} show Default: true
     * - sem parâmetro  = para mostrar
     * - false = para esconder
     */
    modalShow(show = true) {
        this.snackModalEl.style.display = (show) ? 'block' : 'none';
    }

    /**
     * Recebe uma coleção de arquivos e retorna uma Promise com cada uma 
     * das Promises dessa coleção.
     * 
     * @param {*} files Coleção de arquivos.
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
                    this.modalShow(false);

                    try {
                        resolve(JSON.parse(ajax.responseText));
                    } catch(e) {
                        reject(e);
                    }
                };

                ajax.onerror = event => {
                    
                    this.modalShow(false);

                    reject(event);
                };

                // tratando evento de progresso do upload
                ajax.upload.onprogress = event => {
                    this.uploadProgress(event, file);
                };

                // Lendo o arquivo com FormData
                let formData = new FormData();
                formData.append('input-file', file);

                // armazenando o momento em que o arquivo foi selecionado para calcular
                // o tempo de upload
                this.startUploadTime = Date.now();

                ajax.send(formData);
            }));
        });

        return Promise.all(promises);
    }

    /**
     * Atualiza barra de progresso.
     * 
     * @param {*} event Evento OnProgress.
     * @param {*} file Arquivo a ser carregado.
     */
    uploadProgress(event, file) {
        let timespent = Date.now() - this.startUploadTime; // tempo gasto
        let loaded = event.loaded; // dados enviados
        let total = event.total; // tamanho total do arquivo
        let porcent = parseInt((loaded / total) * 100);

        // cálculo de tempo restante para finalizar o upload
        let timeleft = ((100 - porcent) * timespent) / porcent;

        // atualiza a barra de loading
        this.progressBarEl.style.width = `${porcent}%`;

        // mostra o nome do arquivo na barra
        this.fileNameEl.innerHTML = file.name;

        // mostra o tempo que ainda resta para o progresso acabar
        this.timeLeftEl.innerHTML = this.formatTimeToHuman(timeleft);
    }

    /**
     * Formata a duração de tempo especificada para um formato mais amigável.
     * 
     * @param {Number} duration Tempo aproximado em milissegundos.
     * @return {String} Tempo restante.
     */
    formatTimeToHuman(duration) {
        let seconds = parseInt((duration / 1000) % 60); // dessa maneira nunca passa de 60
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24); // dessa maneira não deve passar de 24

        if (hours > 0) {
            return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
        }

        if (minutes > 0) {
            return `${minutes} minutos e ${seconds} segundos`;
        }

        if (seconds > 0) {
            return `${seconds} segundos`;
        }

        return '';
    }
}