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

app.get("/read", (req, res) => {
    const directoryPath = path.join(__dirname, 'savedFiles');
  
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Wystąpił błąd podczas odczytu katalogu');
      }
  
      const fileContents = [];
  
      files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
  
        fs.readFile(filePath, 'utf8', (readErr, data) => {
          if (readErr) {
            console.error(readErr);
            return res.status(500).send('Wystąpił błąd podczas odczytu pliku');
          }
  
          fileContents.push({ fileName: file, content: data });
  
    
          if (fileContents.length === files.length) {
            res.json(fileContents);
          }
        });
      });
    });
  });

app.listen(port, () => {
  console.log(`Aplikacja jest dostępna pod adresem http://localhost:${port}`);
});
