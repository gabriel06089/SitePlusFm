const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/noticia/:id/:slug', async (req, res) => {
  try {
    const response = await axios.get(
      `https://plusfm.com.br/wp-json/wp/v2/posts/${req.params.id}`
    );
    const noticia = response.data;

    const indexHtmlPath = path.join(__dirname, 'build', 'index.html');
    const htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

    const $ = cheerio.load(htmlContent);
    $('meta[property="og:title"]').attr('content',noticia.title.rendered);
    $('meta[property="og:description"]').attr(
      'content',
      noticia.excerpt.rendered
    );

    // Envie o conteúdo HTML modificado
    res.send($.html());
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    res.status(500).send('Erro ao buscar os dados');
  }
});
const port = process.argv[2] || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
