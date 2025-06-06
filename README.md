# e-commerce-frontend

## Índice

- [Disclaimer](#disclaimer)
- [System Design](#system-design)
- [Stack](#stack)
- [Run](#run)

## Disclaimer <a name="disclaimer"></a>

**Pontos principais:**

- **Multiplos cliques:** o site não lida bem com "double-clicks" - 2 request são feitos
- **Git Issues:** Crie para futuras melhorias ou features.
- **Client Side Rendering(CRS):** A minha ideia era usar CSR por questões de tempo.
- **React-Router-v7 (RR7):**

  - Decidi ver as recomendações do React para iniciar um projeto com mais facilidade e percebi tarde demais que o React-Router-v7 como CRS continua necessitando de adaptações para fetchs e gestão de dados.
  - Não gostei da gestão de dados com useEffect.
  - Baseado no **Remix** - RR7 == Remix3 - Focada em **SSR**
  - Lançado em Dezembro de 2024 - falta um pouco de material na internet
  - **clientAction não tem acesso a contextos** (não é um component), então foi necessário usar o localStorage muito mais do que eu gostaria
  - Nunca tinha usando Remix ou essa versão do RR7
  - Se fosse fosse fazer de novo teria utilizado **Vite + react-router-dom ou Next.js**.

  [Voltar ao Índice](#índice).

  [Ir para System Design](#system-design) | [Ir para Stack](#stack) | [Ir para Run](#run)

---

## System Design <a name="system-design"></a>

High-Level React Layers:

![image](https://github.com/user-attachments/assets/f771eb99-0898-48bd-ad9b-023a087dc411)

Frontend:

![image](https://github.com/user-attachments/assets/1e6ab4d0-bb27-4db6-a659-6b5e9eaafc6e)

[Voltar ao Índice](#índice) | [Voltar ao Disclaimer](#disclaimer)

---

## Stack <a name="stack"></a>

Nesta seção, liste as tecnologias, linguagens de programação, frameworks e bibliotecas utilizadas no seu projeto.

- Linguagem de Programação: TypeScript
- Framework: React
- Outras Tecnologias: Docker, TailwindCSS

[Voltar ao Índice](#índice) | [Voltar ao Disclaimer](#disclaimer) | [Voltar ao System Design](#system-design)

---

## Run 🚀 <a name="run"></a>

### Docker

**Pré-requisitos:**

- NodeJS, Docker

**Instalação:**

1.  Clone o repositório:
    ```bash
    git clone https://github.com/LeandroOliveiraDeQueiroz/ecommerce-frontend.git
    cd ecommerce-frontend
    ```
2.  Configure as variáveis de ambiente em modo de desenvolvimento:
    ```
    # Exemplo de arquivo .env
    # copiar keys de .env.example
    ```

**Execução:**

- Para executar o projeto em modo de desenvolvimento:
  ```bash
  npm run docker-up
  ```

O site estará rodando na porta 9000 do seu navegador: [http://localhost:9000/](http://localhost:9000/)

### Local

**Pré-requisitos:**

- NodeJS (eu usei a versão v20.9.0)

**Instalação:**

1.  Clone o repositório:
    ```bash
    git clone https://github.com/LeandroOliveiraDeQueiroz/ecommerce-frontend.git
    cd ecommerce-frontend
    ```
2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente em modo de desenvolvimento:
    ```
    # Exemplo de arquivo .env
    # copiar keys de .env.example
    ```

**Execução:**

- Para executar o projeto em modo de desenvolvimento:
  `bash
    npm run dev
    `
  O site estará rodando na porta 5173 do seu navegador: http://localhost:5173/

[Voltar ao Índice](#índice) | [Voltar ao Disclaimer](#disclaimer) | [Voltar ao System Design](#system-design) | [Voltar ao Stack](#stack)
