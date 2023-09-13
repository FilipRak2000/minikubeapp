const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/error', () => {
  process.exit(1);
});

app.post('/save', (req, res) => {
  const { fileName, content } = req.body;

  if (!fileName || !content) {
    return res.status(400).send('Nieprawidłowe dane');
  }

  const filePath = path.join(__dirname, 'savedFiles', fileName);

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Wystąpił błąd podczas zapisywania pliku');
    }

    res.send('Plik został zapisany');
  });
});

app.listen(port, () => {
  console.log(`Aplikacja jest dostępna pod adresem http://localhost:${port}`);
});
