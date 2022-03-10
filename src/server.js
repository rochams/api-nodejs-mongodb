
const app = require('./app');

let PORT = process.env.PORT || 3000;    // variável lê processos de servidores ou da própria variável

app.listen(PORT, () => {
    console.log(`App de pé. Porta: ${PORT}`)
})
