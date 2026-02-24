# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## 📝 Diário de Bordo & Evolução

### [Fevereiro de 2026] - Integração de Rotas e Filtros Inteligentes
Nesta etapa, o foco foi transformar uma lista estática em uma ferramenta de busca dinâmica, aplicando conceitos avançados de Single Page Application (SPA).

#### **O que foi superado:**
- **Sincronização de Estado:** Resolvido o desafio de integrar o termo de busca (texto) com os filtros de categoria (botões), garantindo que os dados reflitam ambas as escolhas simultaneamente.
- **Arquitetura de Rotas:** Implementação do `react-router-dom` para separar a "Home" da "Busca", eliminando recarregamentos de página desnecessários.
- **Tratamento de Dados:** Transição de uma tela de erro ("Carregando dados") para uma interface resiliente que valida a chegada do JSON antes de renderizar os cards.

#### **Impacto Visual:**

![alt text](assets/screenshorts/evolucaoProjetoEDiarista2.png)

## 🚀 Changelog: Refatoração e UX

Nesta fase do projeto **e-diarista-react**, apliquei os conhecimentos certificados pelo **IFRS** em React para elevar a maturidade da aplicação:

- [cite_start]**Arquitetura de Rotas**: Implementação de `react-router-dom` para navegação fluida entre Home e Busca[cite: 16, 20].
- **Filtros de Negócio**: Desenvolvimento de lógica para filtragem por avaliação (estrelas) e localização regional.
- **Navbar Adaptável**: Criação de menu responsivo utilizando estados do React e classes utilitárias do Tailwind CSS.

![alt text](assets/screenshorts/responsividadeEdiarista.png)


## 🚀 Funcionalidades e Tecnologias

Nesta fase do projeto **e-diarista-react**, implementamos a integração completa com o Firebase:

- **Conexão com Banco de Dados**: Uso de `doc`, `getDoc` e `Collection` para persistência e recuperação de dados em tempo real.
- **Autenticação (Firebase Auth)**: Implementação de fluxo de login com `signInWithEmailAndPassword` e monitoramento de estado com `onAuthStateChanged`, permitindo agendamentos apenas para usuários autenticados.
- **Interface Responsiva**: Utilização do **Tailwind CSS** para estilização dos cards de diaristas e criação de modais de interação.
- **Regras de Negócio**: Validação de formulários (como a obrigatoriedade da data de agendamento) e proteção de rotas.


![alt text](../src/assets/screenshorts/cardDiarista.png)