# Theme Front-End

Tema com o **Gulp** para projetos que utilizam as seguintes tecnologias:

 - HTML
 - CSS
 - Javascript
 - Babel 7
 - Sass  ( **gulp-sass** )
 - HTML Minificador ( **gulp-htmlmin** )
 - JS Minificador ( **gulp-uglify** )

 # Instação do tema
Requisitos mínimos: 

```sh
# Node *testado na versão **10.19.0***
$ node --version
```

```sh
# gulp instalação caso não tenha
$ npm install --global gulp-cli
```

```sh
# Dentro da pasta do projeto na raiz execute
$ npm install
```

Agora seu projeto já esta configurado
```sh
# Inícia a compilação e monitora os arquivos modificados
$ gulp start

# Builda todos os arquivos e minimiza eles para produção. /dist
$ gulp build
``` 

Dica: Utilizar o seguinte plugin no VSCode **Live Server** e rodar o comando `gulp start` depois abrir o arquivo dist/index.html e executar o Live Server, assim as atualizações serão feitas em tempo real.


# Estrutura dos Arquivos


```sh
├── dist/                               # → Tema Buildado (nunca editar)
├── node_modules/                       # → Pacotes Node.js (nunca edite)
├── src/                                # → Modelo de tema
│   ├── index.html                      # → Página inicial (html nesta camada)
│   ├── components/                     # → Pasta de components HTML (pode criar pastas avontade apenas de html)
│   └── assets/                         # → Arquivos auxiliares
│       ├── img/                        # → Todas imagens
│       ├── js/                         # → Todos os Javascript
│       │   ├── components/             # → Componentes
│       │   └── views/                  # → Telas
│       └── sass/
│           ├── base/                   # → Redefinir, Forntes, etc...
│           ├── components/             # → Butões, Cards, etc...
│           ├── layout/                 # → Header, Footer, Crid, etc...
│           ├── themes/                 # → Tema padrão, Tema Admin, etc...
│           ├── utilities/              # → Variáveis, Funções, Mixins, etc...
│           ├── vendors/                # → Bootstrap, etc... 
│           ├── views/                  # → Home, Contato, etc...
│           └── main.scss               # → Importação dos arquivos .scss
├── gulpfile.js                         # → Scripts do Gulp
├── package.json                        # → Dependências e scripts do Node.js
```

- Utilizei a arquitetura para o Sass conhecida como **padrão 7-1** .
	> Fique a vontade para criar arquivos dentro da de /sass.
