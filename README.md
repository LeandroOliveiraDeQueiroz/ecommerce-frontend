# Welcome!

## Disclaimer

**Pontos principais:**

* **Client Side Rendering(CRS):** A minha ideia era usar CSR por questões de tempo.
* **React-Router-v7 (RR7):**
  * Decidi ver as recomendações do React para iniciar um projeto com mais facilidade e percebi tarde demais que o React-Router-v7 como CRS continua necessitando de adaptações para fetchs e gestão de dados.
  * Baseado no **Remix** - RR7 == Remix3
  * Focada em **SSR**
  * Lançado em Dezembro de 2024 - falta um pouco de material na internet
  * **clientAction não tem acesso a contextos** (não é um component), então foi necessário usar o localStorage muito mais do que eu gostaria
  * Nunca tinha usando Remix ou essa versão do RR7
  * Se fosse começar do zero teria utilizado **Vite + react-router-dom ou Next.js**.

    
* **Git issues:** Adicionei issues de melhorias e coisas que gostaria de ter feito diferente.
* **Projeto pessoal?:** Caso eu seja autorizado pretendo manter esse projeto como pessoal para começar um portifolio.

## Stack
- React.js
- TypeScript
- TailwindCSS
- Docker

## Run 🚀
**Pode rodar local ou no Docker:**

### Docker
 Pre-requisto: Docker
  #### Rodar:
  ```
  bash npm run docker-up
  ```
  #### O site estará rodando na porta 9000 do seu navegador:
    
  [http://localhost:9000/](http://localhost:9000/)

### Na maquina:
Pre-requisto: node - eu usei a versão v20.9.0

- Instalar as dependecias:
```
bash npm run install
```
- Rodar:
```
bash npm run dev
```
