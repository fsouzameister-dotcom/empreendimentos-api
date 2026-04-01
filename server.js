const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Lista de empreendimentos e seus códigos
const empreendimentos = [
  { nome: "Haus Linhares",    codigo: 3 },
  { nome: "Quinta do Jatobá", codigo: 4 },
  { nome: "Iliah",            codigo: 2 }
];

// Endpoint GET que recebe a MENSAGEM COMPLETA
app.get('/codigo', (req, res) => {
  const mensagem = (req.query.mensagem || '').toLowerCase().trim();

  if (!mensagem) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Parâmetro "mensagem" é obrigatório'
    });
  }

  const encontrado = empreendimentos.find(e =>
    mensagem.includes(e.nome.toLowerCase())
  );

  if (encontrado) {
    return res.status(200).json({
      sucesso: true,
      codigoEmpreendimento: encontrado.codigo,
      nome: encontrado.nome
    });
  }

  return res.status(404).json({
    sucesso: false,
    mensagem: 'Empreendimento não identificado na mensagem'
  });
});

// Health check
app.get('/', (req, res) => {
  res.send('API de empreendimentos rodando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
