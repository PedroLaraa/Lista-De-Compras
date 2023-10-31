# Api-Lista-De-Compras

# Sobre:
- É um projeto BackEnd que desenvolvi para a faculdade de ciência da computação, uma simulação de uma lista de compras simples para uso no dia a dia, se quiser anotar suas compras e não se esquecer de nada, sua solução está aqui! Conta com autenticação JWT Token, utilizei o padrão MVC e as boas práticas do SOLID. Utilizei o framework NestJs juntamente do TypeORM para manipular o banco de dados, conta com requisições assíncronas para mais segurança e velocidade. 
 
## Funções Usuários

- [X] Buscar Usuários

- [X] Cadastrar Usuário

- [X] Atualiza os dados de um Usuário

| Método HTTP	| Endpoint | Params | Descrição |
|--------|----------|----------|----------|
| GET |	/user |  |	Retorna todos os usuários cadastrados |
| POST |	/user | JSON: {name:string; email:string; password:string; username:string;} |	Cadastra um novo usuário |
| PUT |	/user/update | Header: {Authorization: JWT Token } |	Atualiza as informações de um usuário existente |
| DELETE |	/user/delete | Header: {Authorization: JWT Token } |	Exclui um usuário existente pelo ID |
#

## Funções Carrinho

- [X] Buscar carrinhos

- [X] Buscar somente um carrinho

- [X] Cadastrar carrinho

- [X] Atualiza os dados de um carrinho


| Método HTTP	| Endpoint | Params | Descrição |
|--------|----------|----------|----------|
| GET |	/cart | Header: {Authorization: JWT Token } |	Retorna todos os carrinhos de um User |
| GET |	/cart/:id | Header: {Authorization: JWT Token } |	Retorna um carrinho específico pelo ID |
| POST |	/cart | Header: {Authorization: JWT Token } - JSON: { name: string; date: string; } |	Cadastra um novo carrinho |
| PUT |	/cart/:id | Header: {Authorization: JWT Token } |	Atualiza as informações de um carrinho existente |
| DELETE |	/cart/:id | Header: {Authorization: JWT Token } |	Exclui um carrinho existente pelo ID |
#

## Funções Produto

- [X] Buscar produtos 

- [X] Buscar somente um produto

- [X] Cadastrar produto

- [X] Atualiza os dados de um produto

| Método HTTP	| Endpoint | Params | Descrição |
|--------|----------|----------|----------|
| GET |	/product/:id | Header: {Authorization: JWT Token } |	Retorna um produto específico pelo ID |
| POST |	/product | Header: {Authorization: JWT Token } - JSON: { name:string; amount:number; price:number; } |	Cadastra um novo produto |
| PUT |	/product/:id | Header: {Authorization: JWT Token } |	Atualiza as informações de um produto existente |
| DELETE |	/product/:id | Header: {Authorization: JWT Token } |	Exclui um produto existente pelo ID |
#

## Funções Autenticação

- [X] Fazer login


| Método HTTP	| Endpoint | Params | Descrição |
|--------|----------|----------|----------|
| POST |	/auth | JSON: { email: string; password: string; } |	Faz login e retorna um JWT |
#
