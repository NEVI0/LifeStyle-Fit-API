# :running: API RestFul para Aplicativo de Treinos Construido com React Native

Essa API está sendo construida com [Node](https://nodejs.org/en/) e [Express](https://www.express.com/) para a manipulação de rotas. Como banco de dados eu escolhi o [MongoDB](https://www.mongodb.com/) pois é um banco simples de se tratar e muito performático, e também esse projeto não é algo muito grandioso para a utilização de um banco relacional como o Postgres. 

# :wrench: Configuração do Projeto

* Instale o [Node](https://nodejs.org/en/) na sua máquina

* Baixe o projeto e abra o **Terminal** ou o **Prompt de Comando** e navege até o diretório do projeto

* Rode o comando abaixo para installar as dependencias do projeto
	```
	npm install
	
	ou

	yarn add
	```

* Na raiz do projeto, crie um arquivo chamado `.env` e o configure da seguinte forma
	```
	MONGO_URI=<SUA URI DE CONEXÃO COM O MONGO DB ATLAS>
	AUTHENTICATION=<CRIE A SUA CHAVE DE CRIPTOGRAFIA>
	```

* **Observação:** A chave de criptografia pode ser uma sequencia de caracteres aleatórios

* **Opcional:** Você pode baixar o [Nodemon](https://nodemon.io/) para rodar a aplicação enquanto faz mudanças no código
	```
	npm install nodemon -g
	
	ou

	yarn global add nodemon --prefix /usr/local
	```

# :pencil: Tarefas

* :ballot_box_with_check: Configurar os Models de cada collection (User, Track)

* :ballot_box_with_check: Criar o controller de autenticação de usuário e suas rotas

* :ballot_box_with_check: Criar o controller de usuário e suas rotas

* :ballot_box_with_check: Criar o controller de exercícios e suas rotas

* :ballot_box_with_check: Criar uma função middleware para bloquear as rotas de **user** e **track**

* :negative_squared_cross_mark: Criar uma função middleware para o usuário informar a sua imagem de perfil

* :negative_squared_cross_mark: Colocar a API na AWS (Amazon Web Services)

# :dart: Objetivo com esse Projeto

Quero tentar criar um Aplicativo Mobile junto com um servidor Node usando as melhores práticas possiveis para meu próprio aprendizado.

# :boy: Quem eu sou?

Meu nome é Névio Costa Magagnin, atualmente tenho 17 anos e estudo Programação para Web á 3 anos, venho conseguindo experiencia com meus projetos e trabalhos. Pretendo seguir na área e fazer a faculdade de Analise e Desenvolvimento de Sistemas.

# :copyright: Copyright

**Névio Costa Magagnin** - Jaguaruna, SC - 2020 | :v: