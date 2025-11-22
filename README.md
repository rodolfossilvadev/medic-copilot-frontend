# 💉 Médico Copilot (Frontend)

Interface web do projeto **Médico Copilot**, feita em **React + TypeScript**, suas funções:

- 🎙️ Capturar áudio do microfone
- 🗣️ Exibir transcrição da consulta
- 🧠 Enviar o texto para o backend e receber o diagnóstico (doenças, exames, medicamentos)
- 📄 Gerar consulta detalhada e receita em PDF
- 📚 Histórico de consultas salvas localmente
- 🌎 Interface multilíngue (PT/EN)
- 🩺 Personalização por especialidade médica
- 🛜 Projeto publicado (deploy completo)
---

## ⚙️ Tecnologias

- React + Vite + TypeScript  
- TailwindCSS  
- Framer Motion  
- LocalStorage (histórico)  
- html2canvas + jsPDF (PDF)  
- Contexto multilíngue simples (PT/EN)  
- Axios para comunicação com o backend  

---
## 🌐 Projeto em Produção
 Frontend:
<a href="https://medcopilot-omega.vercel.app/" target="_blank">MedCopilot<a/>
---

## 🚀 Rodando localmente

```bash
# 1. Clone o repositório
git clone https://github.com/rodolfossilvadev/medic-copilot-frontend.git
cd medic-copilot-frontend

# 2. Instale as dependências
npm install

# 3. Configure o .env
cp .env.example .env

# 4. Execute o projeto
npm run dev
# App disponível em http://localhost:5173
🔐 Variáveis de ambiente
env
Copiar código
VITE_API_BASE_URL=http://localhost:10000

```


Repositório do **Back-end**
<a href="https://github.com/rodolfossilvadev/medico-copilot-backend" target="_blank">Clique aqui</a> para acessar o repositório
