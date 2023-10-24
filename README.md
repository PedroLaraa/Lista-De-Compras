# Api-Lista-De-Compras
 
## Funções Usuários

- [X] Buscar Usuários

- [X] Buscar somente um Usuário

- [X] Cadastrar Usuário

- [X] Atualiza os dados de um Usuário

| Método HTTP	| Endpoint | Params | Descrição |
|--------|----------|----------|----------|
| GET |	/user |  |	Retorna todos os usuários cadastrados |
| GET |	/user/:id | Header: {Authorization: JWT Token } |	Retorna o usuário junto com todos seus carrinhos relacionadas pelo ID|
| POST |	/user | JSON: {name:string; email:string; password:string; username:string;} |	Cadastra um novo usuário |
| PUT |	/user/:id | Header: {Authorization: JWT Token } |	Atualiza as informações de um usuário existente |
| DELETE |	/user/:id | Header: {Authorization: JWT Token } |	Exclui um usuário existente pelo ID |
#

## Funções Carrinho

- [X] Buscar carrinhos

- [X] Buscar somente um carrinho

- [X] Cadastrar carrinho

- [X] Atualiza os dados de um carrinho


| Método HTTP	| Endpoint | Params | Descrição |
|--------|----------|----------|----------|
| GET |	/cart |  |	Retorna todos os carrinhos cadastradas |
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
| GET |	/product |  |	Retorna todos os produtos cadastradas |
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