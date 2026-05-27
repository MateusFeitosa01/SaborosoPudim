# 🎯 Novo Admin - Leve Pudim

Um painel de administração completo e responsivo para gerenciar sua loja de bolinhos.

## ✨ Funcionalidades

### 📊 Dashboard

- **Cards de Estatísticas**: Visão rápida de pedidos totais, receita, pendentes e entregues
- **Gráficos de Status**: Visualização do estado dos pedidos
- **Métricas de Entrega**: Comparação entre entrega e retirada
- **Informações Rápidas**: Ticket médio, taxa de conversão e clientes ativos
- **Pedidos Recentes**: Tabela com últimos pedidos com busca e paginação

### 👥 Clientes

- Lista completa de clientes
- Total de pedidos por cliente
- Valor total gasto
- Busca e filtros

### 🛒 Pedidos

- Visualização por status (Pendente, Preparando, Pronto, Entregue)
- Layout responsivo com 2 colunas em desktop
- Botões para gerenciar status dos pedidos

### 📦 Produtos

- Tabela de produtos com edição e exclusão
- Botão para adicionar novos produtos
- Integração com sistema existente

### 📈 Relatórios

- KPIs principais (Receita, Valor médio, Total de pedidos)
- Gráficos de status com percentuais
- Análise de métodos de entrega
- Insights automáticos

### ⚙️ Configurações

- Informações da loja
- Dados de contato
- Taxa de entrega
- Tempo de entrega estimado
- Gerenciamento de notificações
- Opções de segurança

## 🎨 Design

O admin foi desenvolvido seguindo a paleta de cores da marca:

- **Cor Primária**: Marrom/Bronze (rgb(211, 161, 80))
- **Cor Secundária**: Cinza claro
- **Background**: Bege suave

## 📱 Responsividade

O admin é totalmente responsivo:

- **Mobile**: Menu hamburger colapsável, layouts em 1 coluna
- **Tablet**: Layouts adaptados para telas médias
- **Desktop**: Grade de 2-4 colunas dependendo do componente

## 🗂️ Estrutura de Arquivos

```
components/admin/
├── AdminCard.tsx          # Card com ícone e estatística
├── AdminDataTable.tsx     # Tabela com busca e paginação
├── AdminHeader.tsx        # Header com notificações
├── AdminSidebar.tsx       # Menu lateral
├── StatusBadge.tsx        # Badge de status
└── LogoutButton.tsx       # Botão de logout

app/admin/
├── page.tsx              # Dashboard principal
├── layout.tsx            # Layout responsivo
├── clientes/
│   └── page.tsx         # Página de clientes
├── pedidos/
│   └── page.tsx         # Página de pedidos
├── produtos/
│   └── page.tsx         # Página de produtos
├── configuracoes/
│   └── page.tsx         # Página de configurações
└── relatorios/
    └── page.tsx         # Página de relatórios
```

## 🚀 Como Usar

1. **Acessar o Admin**: Navegue para `/admin`
2. **Menu de Navegação**: Use a barra lateral para acessar diferentes seções
3. **Mobile**: Clique no ícone hamburger para abrir o menu
4. **Dashboard**: Visualize as principais métricas da sua loja
5. **Gerenciar**: Use as páginas específicas para gerenciar cada aspecto

## 🎯 Componentes Principais

### AdminCard

Cards com ícone, valor e tendência. Suporta 5 cores diferentes.

### AdminDataTable

Tabela com:

- Busca em tempo real
- Paginação
- Ações (Visualizar, Editar, Deletar)

### AdminHeader

Header pegajoso com notificações e perfil do usuário.

### AdminSidebar

Menu colapsável com navegação principal.

## 💡 Dicas

- Use os cards no dashboard para dar uma visão geral rápida
- As tabelas são filtráveis e paginadas para melhor performance
- O layout adapta automaticamente para diferentes telas
- Os status têm cores diferentes para fácil identificação

## 🔄 Próximas Melhorias

- [ ] Gráficos interativos com Chart.js
- [ ] Exportação de relatórios em PDF
- [ ] Integração com email para notificações
- [ ] Sistema de backup automático
- [ ] Analytics avançado
