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

// Endpoint GET
app.get('/codigo', (req, res) => {
  const param = req.query.empreendimento || '';

  const encontrado = empreendimentos.find(e =>
    param.toLowerCase().includes(e.nome.toLowerCase())
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
    mensagem: 'Empreendimento não encontrado'
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
