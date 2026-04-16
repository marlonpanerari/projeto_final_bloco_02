# 💊 Farmácia API - NestJS

API desenvolvida com o framework **NestJS** e **TypeORM** para o gerenciamento de categorias e produtos de uma farmácia. O sistema garante a integridade dos dados através de validações robustas em suas camadas de serviço.

---

## 🛠️ Tecnologias Utilizadas

* **NestJS**: Framework Node.js para aplicações escaláveis e eficientes.
* **TypeORM**: ORM (Object-Relational Mapper) para integração com o banco de dados.
* **MySQL**: Banco de dados relacional para persistência de dados.
* **Class-Validator**: Biblioteca para validação rigorosa de dados de entrada.
* **TypeScript**: Adição de tipagem estática ao JavaScript para maior segurança.

---

## 🏗️ Estrutura do Banco de Dados

A API utiliza um relacionamento de **Um-para-Muitos (1:N)**:
* Uma **Categoria** pode estar vinculada a vários **Produtos**.
* Um **Produto** deve pertencer obrigatoriamente a uma **Categoria** (Chave Estrangeira).

---

## 🚀 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/projeto_final_bloco_02.git](https://github.com/seu-usuario/projeto_final_bloco_02.git)
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados:**
    Abra o arquivo `src/app.module.ts` e insira suas credenciais do MySQL:
    * Host, Porta, Usuário, Senha e Nome do Banco (Database).

4.  **Execute a aplicação em modo de desenvolvimento:**
    ```bash
    npm run start:dev
    ```
    A API estará disponível no endereço: `http://localhost:3000`

---

## 🔌 Endpoints da API

### 📂 Categorias (`/categorias`)

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **GET** | `/categorias` | Lista todas as categorias cadastradas. |
| **GET** | `/categorias/:id` | Busca uma categoria específica pelo ID. |
| **GET** | `/categorias/nome/:nome` | Busca categorias por nome (utilizando ILike). |
| **POST** | `/categorias` | Cria uma nova categoria no sistema. |
| **PUT** | `/categorias` | Atualiza os dados de uma categoria existente. |
| **DELETE** | `/categorias/:id` | Remove uma categoria do sistema. |

### 📦 Produtos (`/produtos`)

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **GET** | `/produtos` | Lista todos os produtos com suas respectivas categorias. |
| **GET** | `/produtos/:id` | Busca um produto específico pelo ID. |
| **GET** | `/produtos/nome/:nome` | Busca produtos por nome (utilizando ILike). |
| **POST** | `/produtos` | Cria um novo produto (Requer um ID de Categoria válido). |
| **PUT** | `/produtos` | Atualiza os dados de um produto existente. |
| **DELETE** | `/produtos/:id` | Remove um produto do sistema. |

---

## 🛡️ Validações Implementadas

O projeto conta com uma camada de "blindagem" nos **Services** para garantir que a API responda com status HTTP semânticos e mensagens claras:

* **404 Not Found**: Retornado quando um ID não é localizado ou uma busca por nome não retorna resultados.
* **400 Bad Request**: Retornado quando campos obrigatórios (como `nome`) estão vazios ou IDs informados são inválidos.
* **Integridade Referencial**: O sistema valida se a categoria existe antes de permitir a criação ou atualização de um produto, evitando erros de Chave Estrangeira no banco de dados.

---

## 📝 Exemplo de JSON para Criação (POST)

**Requisição de Produto:**
```json
{
  "nome": "Paracetamol 500mg",
  "descricao": "Analgésico e Antitérmico",
  "preco": 15.50,
  "categoria": {
    "id": 1
  }
}

✍️ Desenvolvido como parte do projeto final do Bloco 02 no bootcamp da Generation Brasil.