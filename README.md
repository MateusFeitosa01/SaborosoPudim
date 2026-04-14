# Leve Pudim - Sistema de E-commerce

Um sistema completo de e-commerce para venda de pudins artesanais, desenvolvido com Next.js, TypeScript, Tailwind CSS e Supabase.

## 🚀 Funcionalidades

- 🛒 **Loja Online**: Catálogo de produtos com diferentes tamanhos e preços
- 🛍️ **Carrinho de Compras**: Sistema completo de carrinho com persistência
- 📋 **Checkout**: Processo de checkout com validação de dados
- 👨‍💼 **Painel Admin**: Gerenciamento completo de produtos e pedidos
- 🔐 **Autenticação**: Sistema de login para administradores
- 📱 **Responsivo**: Design adaptável para desktop e mobile
- 🎨 **UI Moderna**: Interface construída com shadcn/ui e Tailwind CSS

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **Deploy**: Vercel

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase

## 🚀 Como executar

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd leve-pudim
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env.local
   ```

   Preencha as variáveis no arquivo `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Configure o banco de dados Supabase**
   - Crie um novo projeto no [Supabase](https://supabase.com)
   - Execute os scripts SQL para criar as tabelas necessárias
   - Configure as políticas RLS (Row Level Security)

5. **Execute o projeto**

   ```bash
   npm run dev
   ```

6. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

## 📁 Estrutura do Projeto

```
├── app/                    # Páginas Next.js (App Router)
│   ├── admin/             # Área administrativa
│   ├── checkout/          # Página de checkout
│   ├── confirmacao/       # Página de confirmação
│   └── ...
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI (shadcn)
│   ├── admin/            # Componentes admin
│   └── ...
├── lib/                   # Utilitários e configurações
│   ├── supabase/         # Configuração Supabase
│   └── services/         # Serviços da API
├── hooks/                 # Custom hooks
└── public/               # Arquivos estáticos
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 📊 Banco de Dados

### Tabelas Principais

- **products**: Produtos disponíveis
- **sizes**: Tamanhos e preços dos produtos
- **orders**: Pedidos realizados
- **order_items**: Itens dos pedidos

### Configuração do Supabase

1. Crie as tabelas conforme o schema
2. Configure as políticas RLS
3. Configure o Storage para imagens dos produtos

## 🚀 Deploy

O projeto está configurado para deploy no Vercel:

1. Conecte seu repositório no Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através das issues do GitHub.
