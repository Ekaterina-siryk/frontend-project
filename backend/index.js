const express = require('express');
const cors = require('cors');
const handler = require('./api/unread.js'); 

const app = express();
app.use(cors()); 

app.get('/messages/unread', (req, res) => {
  handler(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(` СЕРВЕР ЗАПУЩЕН НА http://localhost:${PORT}`);
  console.log(`==================================================`);
});
