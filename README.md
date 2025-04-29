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

## System Design <a name="system-design"></a>

Aqui você pode descrever a arquitetura do seu sistema, os componentes principais e como eles interagem. Use diagramas, se necessário, para ilustrar o design.
High-Level React Layers:

![image](https://github.com/user-attachments/assets/f771eb99-0898-48bd-ad9b-023a087dc411)

Frontend 

![image](https://github.com/user-attachments/assets/4ede8ea1-5368-4bf3-a174-f26b2438eb5e)

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
