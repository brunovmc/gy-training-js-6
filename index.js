const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parser');

const app = express();
const port = 3000; 

const filterValue = 'EI';

let encontrei = '';

app.get('/read-csv', (req, res) => {
  const nomes = [];

  fs.createReadStream('ibge-fem-10000 (3).csv')
    .pipe(csvParser())
    .on('data', (row) => {
      if (row.nome && !row.nome.includes(filterValue)) {
        nomes.push(row.nome);
        encontrei = row.nome;
      }
    })
    .on('end', () => {
      console.log(nomes);
      res.send(nomes);
      console.log(`encontrei= ${encontrei}`);
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});