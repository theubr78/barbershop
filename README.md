# Barbershop CRM - Sistema de Gerenciamento para Barbearias

Sistema completo de CRM e agendamento para barbearias com **backend Firebase**, área pública para clientes e área administrativa mobile-first para barbeiros.

## 🚀 Características

### Área Pública
- **Landing Page** impactante com showcase de serviços e equipe
- **Fluxo de Agendamento** completo em 4 etapas:
  - Seleção de serviço
  - Escolha do barbeiro
  - Data e horário
  - Dados do cliente
- **Confirmação** com integração WhatsApp
- **Persistência real** - todos os agendamentos salvos no Firebase

### Área Administrativa (Mobile-First)
- **Autenticação segura** com Firebase Auth
- **Dashboard** com métricas em tempo real
- **Agenda** com sincronização real-time
- **CRM de Clientes** com:
  - Busca e filtros avançados
  - Detecção de clientes ausentes (>30 dias)
  - Reengajamento via WhatsApp automático
- **Programa de Fidelidade** com tiers (Bronze/Prata/Ouro)
- **Gestão de Serviços** e **Barbeiros**
- **Multi-tenant** - suporta múltiplas barbearias

## 🛠️ Tecnologias

- **React 18** + Vite
- **Firebase** (Firestore + Authentication)
- **Tailwind CSS** (design system dark mode premium)
- **React Router DOM** (navegação)
- **Lucide React** (ícones)
- **date-fns** (manipulação de datas)

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn
- Conta no Firebase (gratuita)

### Passo a Passo

**1. Instalar dependências:**

**⚠️ IMPORTANTE**: Se você está no Windows e recebe erro de "execução de scripts desabilitada", execute este comando no PowerShell como Administrador:

\`\`\`powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
\`\`\`

Depois, instale as dependências:

\`\`\`bash
# Navegue até a pasta do projeto
cd "c:\\Users\\Matheus Silva\\Desktop\\Site Barbearias"

# Instale as dependências
npm install
\`\`\`

**2. Configurar Firebase:**

Siga o guia completo: **[docs/FIREBASE_SETUP.md](file:///c:/Users/Matheus%20Silva/Desktop/Site%20Barbearias/docs/FIREBASE_SETUP.md)**

Resumo:
1. Criar projeto no Firebase Console
2. Ativar Firestore Database
3. Ativar Authentication (Email/Senha)
4. Criar usuário admin
5. Copiar credenciais para `.env.local`
6. Publicar regras de segurança
7. Rodar seed: `npm run seed`

**3. Rodar o projeto:**

\`\`\`bash
npm run dev
\`\`\`

O aplicativo estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

\`\`\`
src/
├── components/
│   ├── ui/              # Componentes reutilizáveis (Button, Card, Input, etc.)
│   └── ProtectedRoute.jsx  # Guarda de rotas administrativas
├── contexts/
│   ├── AppContext.jsx       # Gerenciamento de estado com Firebase
│   ├── AuthContext.jsx      # Autenticação
│   ├── BarbershopContext.jsx # Multi-tenant
│   └── ToastContext.jsx     # Notificações
├── config/
│   └── firebase.js      # Configuração do Firebase
├── services/
│   └── firebaseService.js  # CRUD operations
├── data/
│   └── mockData.js      # Constantes (loyaltyConfig)
├── pages/
│   ├── public/          # Landing, BookingFlow, Confirmation
│   └── admin/           # Dashboard, Agenda, Customers, etc.
├── utils/
│   └── helpers.js
├── App.jsx              # Rotas + Providers
├── main.jsx
└── index.css            # Design system
\`\`\`

## 🌐 Rotas

### Públicas
- `/` - Landing page
- `/agendar` - Fluxo de agendamento
- `/confirmacao/:id` - Confirmação do agendamento

### Administrativas (Protegidas)
- `/admin/login` - Login
- `/admin` - Dashboard
- `/admin/agenda` - Agenda
- `/admin/clientes` - CRM
- `/admin/fidelidade` - Programa de fidelidade
- `/admin/servicos` - Serviços
- `/admin/barbeiros` - Barbeiros

## 💡 Funcionalidades Destaque

### 🔥 Firebase Real-Time
- Agendamentos sincronizam automaticamente entre dispositivos
- Mudanças na agenda aparecem instantaneamente
- Zero perda de dados - tudo persistido no Firestore

### 🔐 Autenticação Segura
- Login com email/senha
- Rotas protegidas
- Session management automático

### 🏢 Multi-Tenant
- Cada barbearia tem seus próprios dados isolados
- Suporte para múltiplas barbearias no mesmo sistema
- URL format: `/b/:barbershopId/*` (futuro)

### 📱 WhatsApp Integration
A funcionalidade de reengajamento de clientes ausentes gera automaticamente mensagens personalizadas via WhatsApp:
- Detecta clientes com mais de 30 dias sem visita
- Gera link `wa.me` com mensagem pré-formatada
- Inclui nome do cliente e dias de ausência

### ⭐ Programa de Fidelidade
Sistema de pontos com 3 tiers:
- **Bronze** (0-100 pts): 5% desconto
- **Prata** (101-500 pts): 10% desconto + prioridade
- **Ouro** (501+ pts): 15% desconto + benefícios VIP

Pontos: R$ 2 gastos = 1 ponto

## 🚀 Deploy

### Vercel (Recomendado)

1. Push do código para GitHub
2. Conecte repositório na Vercel
3. Configure variáveis de ambiente (`.env.local`)
4. Deploy automático!

\`\`\`bash
# Build para produção
npm run build

# Preview local do build
npm run preview
\`\`\`

## 🎯 Próximos Passos

- [x] Integração com backend real (Firebase)
- [x] Autenticação de usuários
- [ ] API WhatsApp Business oficial
- [ ] Sistema de notificações push
- [ ] Relatórios e analytics avançados
- [ ] Exportação de dados (PDF, Excel)
- [ ] PWA (Progressive Web App)

## 📄 Documentação Adicional

- **[Setup Firebase](file:///c:/Users/Matheus%20Silva/Desktop/Site%20Barbearias/docs/FIREBASE_SETUP.md)** - Guia completo de configuração
- **[Database Schema](file:///c:/Users/Matheus%20Silva/Desktop/Site%20Barbearias/docs/db-schema.md)** - Estrutura do Firestore

## 🆘 Suporte

Problemas comuns e soluções em [docs/FIREBASE_SETUP.md](file:///c:/Users/Matheus%20Silva/Desktop/Site%20Barbearias/docs/FIREBASE_SETUP.md)

---

**Desenvolvido com ❤️ usando React + Vite + Firebase + Tailwind CSS**
