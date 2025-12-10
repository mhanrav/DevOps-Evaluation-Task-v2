const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
res.json({ message: `hello from ${process.env.ENV_NAME || 'unknown'}` });
});


app.get('/health', (req, res) => res.json({ status: 'ok' }));


module.exports = app.listen(port, () => console.log(`App running on port ${port}`));