# 💉 MedNote.IA – Médico Copilot (Frontend)

Interface web do projeto **Médico Copilot**, feita em **React + TypeScript**, responsável por capturar áudio, exibir a transcrição da consulta e mostrar o diagnóstico retornado pelo backend (doenças prováveis, exames e medicamentos).  
Inclui histórico local, geração de PDF e interface multilíngue.

---

## ⚙️ Tecnologias

- React + Vite + TypeScript  
- TailwindCSS  
- Framer Motion  
- LocalStorage  
- html2canvas + jsPDF  
- Axios

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
✨ Funcionalidades principais
🎙️ Captura de áudio

🗣️ Transcrição de consulta

🧠 Diagnóstico gerado por IA

📚 Histórico local de consultas

📄 Geração de PDF

🌎 Multilíngue (PT/EN)

Este repositório representa o frontend do projeto MedNote.IA e se conecta ao backend disponível em:
https://github.com/rodolfossilvadev/medico-copilot-backend
