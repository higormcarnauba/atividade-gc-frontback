const express = require('express');
const cors = require('cors'); // Vital para o front funcionar [cite: 54]
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const items = [
    { id: 1, name: 'Item 1 - Backend Node' },
    { id: 2, name: 'Item 2 - Rodando Liso' }
];

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body;
    newItem.id = items.length + 1;
    items.push(newItem);
    res.status(201).json({ message: 'Item adicionado!', item: newItem });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});