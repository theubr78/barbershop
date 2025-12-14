# 🔥 Firebase Setup Guide

Este guia te ajudará a configurar o Firebase para o site de barbearias.

## Passo 1: Criar Projeto no Firebase

1. Acesse https://console.firebase.google.com/
2. Clique em "Adicionar projeto"
3. Nome do projeto: `site-barbearias` (ou qualquer nome)
4. Desabilite Google Analytics (opcional)
5. Clique em "Criar projeto"

## Passo 2: Configurar Firestore Database

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Modo de produção: **Iniciar em modo de teste** (ou prod se preferir)
4. Localização: **southamerica-east1** (São Paulo)
5. Clique em "Ativar"

## Passo 3: Configurar Autenticação

1. No menu lateral, clique em "Authentication"
2. Clique em "Começar"
3. Aba "Sign-in method"
4. Ative "E-mail/senha"
5. Clique em "Salvar"

## Passo 4: Criar Usuário Admin

1. Em "Authentication" → Aba "Users"
2. Clique em "Adicionar usuário"
3. **Email**: `admin@barbearia.com` (ou seu email)
4. **Senha**: Crie uma senha forte
5. Anote essas credenciais! Você vai usar para fazer login.

## Passo 5: Obter Configurações do Firebase

1. No console Firebase, clique no ícone de engrenagem ⚙️ → "Configurações do projeto"
2. Role até "Seus aplicativos"
3. Clique no ícone da web `</>`
4. Nome do app: `Site Barbearias`
5. Copie as configurações que aparecem

Exemplo do que você vai copiar:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "site-barbearias.firebaseapp.com",
  projectId: "site-barbearias",
  storageBucket: "site-barbearias.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

## Passo 6: Configurar Variáveis de Ambiente

1. Na raiz do projeto, crie o arquivo `.env.local`:
```bash
# Windows PowerShell
New-Item .env.local

# Ou manualmente, crie um arquivo chamado .env.local
```

2. Cole as configurações do Firebase no formato:
```env
VITE_FIREBASE_API_KEY=sua-api-key-aqui
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
VITE_FIREBASE_APP_ID=seu-app-id
```

## Passo 7: Configurar Regras de Segurança

1. No Firebase Console → "Firestore Database" → Aba "Regras"
2. Copie o conteúdo do arquivo `firestore.rules` do projeto
3. Cole no editor de regras
4. Clique em "Publicar"

## Passo 8: Popular Dados Iniciais (Seed)

**IMPORTANTE**: Só rode este script UMA VEZ!

```bash
# Rodar o script de seed
node scripts/seed.js
```

Isso vai criar:
- ✅ 1 barbearia de demonstração  
- ✅ 10 serviços
- ✅ 5 barbeiros
- ✅ 6 clientes
- ✅ 5 agendamentos

## Passo 9: Testar o Site

```bash
npm run dev
```

**Teste o fluxo público:**
1. Abra `http://localhost:5173`
2. Clique em "Agendar"
3. Complete o fluxo de agendamento

**Teste a área admin:**
1. Abra `http://localhost:5173/admin`
2. Você será redirecionado para `/admin/login`
3. Faça login com as credenciais criadas no Passo 4
4. Explore o dashboard, agenda, clientes, etc.

## 🎯 Verificações

- [ ] Firestore Database criado
- [ ] Authentication configurado
- [ ] Usuário admin criado
- [ ] Arquivo `.env.local` criado com credenciais
- [ ] Regras de segurança publicadas
- [ ] Script de seed executado
- [ ] Site rodando localmente
- [ ] Agendamento público funcionando
- [ ] Login admin funcionando

## 🚨 Problemas Comuns

**Erro: "Firebase: Firebase App named '[DEFAULT]' already exists"**
- Solução: Recarregue a página (F5)

**Erro: "Missing or insufficient permissions"**
- Solução: Verifique se as regras de segurança foram publicadas corretamente

**Erro ao fazer login: "Email ou senha incorretos"**
- Solução: Verifique se o usuário foi criado corretamente no Firebase Console → Authentication

**Dados não aparecem:**
- Solução: Verifique se o script de seed foi executado com sucesso
- Abra Firebase Console → Firestore Database e veja se os dados estão lá

## 🔐 Segurança

⚠️ **NUNCA commite o arquivo `.env.local` no Git!**
- O `.gitignore` já está configurado para ignorar este arquivo
- Cada desenvolvedor/ambiente deve ter seu próprio `.env.local`

## 📱 Multi-Tenant (Múltiplas Barbearias)

Para adicionar uma nova barbearia:

1. No Firebase Console → Firestore → Collection `barbershops`
2. Adicionar documento com ID único (ex: `barbearia-central`)
3. Rodar seed novamente mudando `BARBERSHOP_ID` em `scripts/seed.js`
4. URL de acesso: `seusite.com/b/barbearia-central/agendar`

---

**✅ Pronto! Seu backend Firebase está configurado e funcionando!**
