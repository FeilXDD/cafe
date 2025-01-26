const express = require('express')

const app = express();

app.disable('x-powered-by');//desabilita la cabecera de express

const PORT = 3000;

app.get('/', (req, res) => {
    res.send({message:'Hello World!'});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});