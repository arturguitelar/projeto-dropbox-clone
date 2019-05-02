# Dropbox Clone
Dropbox clone criado para estudo utilizando como base as aulas do [Curso de Javascript da HCode](https://www.udemy.com/javascript-curso-completo).

[![Hcode Treinamentos](https://www.hcode.com.br/res/img/hcode-200x100.png)](https://www.hcode.com.br)

### Visual do projeto
![DropBox Clone](https://firebasestorage.googleapis.com/v0/b/hcode-com-br.appspot.com/o/DropBoxClone.jpg?alt=media&token=d59cad0c-440d-4516-88f2-da904b9bb443)


**Comandos básicos.**

Dentro da pasta "app".

Instalar node_modules:

```
npm install
```

**Obs.** Instalar componentes do [Bower](https://bower.io/) na pasta "public".

```
bower install
```

Start do servidor:

```
npm start
```


**Coisas interessantes abordadas neste projeto.**
- [Formidable](https://github.com/felixge/node-formidable).
- Barra de progresso de upload.
- Cálculo para quanto tempo resta para finalizar um upload.
- [Firebase](https://firebase.google.com).
- Lógica de seleção de elementos com ctrl e shift.
- Personalizando eventos.
- Sistema de navegação de pastas em página única utilizando javascript.
- Armazenamento de arquivos em nuvem com o Firebase Storage.

> Em progresso...

O curso termina no momento em que é possível utilizar propriamente o Firebase Storage. Porém, num futuro, pretendo adicionar outras funcionalidades. =D


**Sobre o banco de dados:** 
Este projeto utiliza o [Firebase](https://firebase.google.com) como banco de dados.
Por questões de segurança, não estou adicionando o arquivo "ConnectFirebase.js". Ele é só uma classe bem simples onde as configurações do meu banco estão criadas no construtor da classe.
