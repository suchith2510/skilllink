const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test server is running!' });
});

app.listen(3002, () => {
  console.log('Test server running on port 3002');
});