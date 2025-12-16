import { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Erro ao buscar itens:', error));
  }, []);

  const handleAddItem = () => {
    if (!newItemName) return;

    const item = { name: newItemName };

    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
      setItems([...items, data.item]);
      setNewItemName('');
    })
    .catch(error => console.error('Erro ao adicionar:', error));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Fullstack App - UFC</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="Novo item"
      />
      <button onClick={handleAddItem}>Adicionar</button>
    </div>
  );
}

export default App;