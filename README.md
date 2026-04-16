## 🛠️ Feature recurso Produto + validações em services

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

Foi adicionada uma camada de "blindagem" nos **Services** para garantir que a API responda com status HTTP semânticos e mensagens claras:

* **404 Not Found**: Retornado quando um ID não é localizado ou uma busca por nome não retorna resultados.
* **400 Bad Request**: Retornado quando campos obrigatórios (como `nome`) estão vazios ou IDs informados são inválidos.
* **Integridade Referencial**: O sistema valida se a categoria existe antes de permitir a criação ou atualização de um produto, evitando erros de Chave Estrangeira no banco de dados.

* **Teste do recurso Produto e relacionamentos via Insomnia**
