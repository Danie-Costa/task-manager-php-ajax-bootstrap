# Task Manager - Sistema de Gerenciamento de Tarefas

Sistema de gerenciamento de tarefas desenvolvido com PHP, JavaScript e Bootstrap, utilizando arquitetura MVC e padrões de projeto modernos.

## 🚀 Funcionalidades

### Gerenciamento de Tarefas
- ✅ Visualização em quadro Kanban
- ✅ Criação de novas tarefas
- ✅ Edição de tarefas existentes
- ✅ Exclusão de tarefas
- ✅ Drag and Drop entre colunas
- ✅ Priorização de tarefas (Alta, Média, Baixa)

### Interface
- 🎨 Design responsivo com Bootstrap
- 🔄 Atualização em tempo real
- 🎯 Sistema de prioridades visual
- 📱 Compatível com dispositivos móveis

### Organização
- 📋 Três colunas: To Do, Doing, Done
- 🏷️ Sistema de prioridades
- 📊 Visualização clara do progresso

## 🛠️ Tecnologias Utilizadas

- PHP 8.0+
- JavaScript (ES6+)
- Bootstrap 5
- MySQL
- Docker

## 📋 Pré-requisitos

- Docker
- Docker Compose
- Git

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
```

2. Inicie os containers:
```bash
docker-compose up -d
```

3. Acesse o container PHP:
```bash
docker exec -it task-manager-php bash
```

4. Execute as migrações:
```bash
# Criar tabelas e dados iniciais
php Command.php migrate:up TaskMigration

# Reverter migrações (se necessário)
php Command.php migrate:down TaskMigration
```

## 🎮 Como Usar

### Visualização
- As tarefas são exibidas em um quadro Kanban com três colunas
- Cada tarefa mostra sua prioridade através de badges coloridos
- Arraste e solte para mover tarefas entre colunas

### Criação de Tarefas
1. Clique no botão "+" em qualquer coluna
2. Preencha os campos:
   - Título
   - Descrição
   - Prioridade
   - Etapa inicial
3. Clique em "Salvar"

### Edição de Tarefas
1. Clique em uma tarefa para abrir o modal de edição
2. Modifique os campos desejados
3. Clique em "Salvar" para atualizar

### Exclusão de Tarefas
1. Abra o modal de edição da tarefa
2. Clique no botão "Excluir"
3. Confirme a exclusão

### Movendo Tarefas
- Arraste a tarefa para a coluna desejada
- O sistema atualiza automaticamente a etapa da tarefa

## 🔄 Atualizações Automáticas
- O sistema recarrega as tarefas automaticamente após qualquer alteração
- As mudanças são refletidas em tempo real para todos os usuários

## 🐛 Debug e Logs
- Console do navegador para debug do frontend
- Logs do PHP para debug do backend
- Mensagens de erro amigáveis para o usuário

## 📝 Estrutura do Projeto

```
task-manager/
├── public/              # Arquivos públicos
│   ├── css/            # Estilos
│   └── js/             # Scripts JavaScript
├── src/                # Código fonte
│   ├── controllers/    # Controladores
│   ├── models/         # Modelos
│   └── views/          # Views
├── databases/          # Migrações e seeds
└── config/             # Configurações
```

## 🔒 Segurança
- Validação de dados no frontend e backend
- Proteção contra SQL Injection
- Sanitização de inputs

## 📈 Próximos Passos
- [ ] Sistema de usuários e autenticação
- [ ] Compartilhamento de tarefas
- [ ] Comentários em tarefas
- [ ] Prazos e datas
- [ ] Relatórios e estatísticas

## 🤝 Contribuição
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Créditos
Desenvolvido por [Pontes] 


