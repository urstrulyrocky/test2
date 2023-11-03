import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([
    { id: 1, name: "Apples", quantity: 3 },
    { id: 2, name: "Bananas", quantity: 6 },
    { id: 3, name: "Oranges", quantity: 2 },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: newItemName,
      quantity: parseInt(newItemQuantity),
    };
    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemQuantity("");
    setShowAddForm(false);
  };

  const handleEditItem = (itemId, newName, newQuantity) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, name: newName, quantity: newQuantity };
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  return (
    <div>
      <h1>My Shopping List App</h1>
      <div>
        <button onClick={() => setShowAddForm(true)}>Add Item</button>
        {showAddForm && (
          <div data-testid="add-new-item-row">
            <input
              type="text"
              placeholder="Item name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
            />
            <button onClick={handleAddItem}>Add</button>
          </div>
        )}
      </div>
      <ShoppingList
        items={items}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
}

function ShoppingList(props) {
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState('');
  const [editItemQuantity, setEditItemQuantity] = useState(0);

  const handleEditStart = (id, name, quantity) => {
    setEditItemId(id);
    setEditItemName(name);
    setEditItemQuantity(quantity);
  };

  const handleEditSave = () => {
    props.onEdit(editItemId, editItemName, editItemQuantity);
    setEditItemId(null);
    setEditItemName('');
    setEditItemQuantity(0);
  };

  const handleEditCancel = () => {
    setEditItemId(null);
    setEditItemName('');
    setEditItemQuantity(0);
  };

  return (
    <div>
      <table data-testid="table">
        <thead>
          <tr>
            <th>Items</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item) => (
            <tr key={item.id}>
              {editItemId === item.id ? (
                <td colSpan="3">
                  <input
                    type="text"
                    placeholder="Item name"
                    value={editItemName}
                    onChange={(e) => setEditItemName(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={editItemQuantity}
                    onChange={(e) => setEditItemQuantity(e.target.value)}
                  />
                  <button onClick={handleEditSave}>Save</button>
                  <button onClick={handleEditCancel}>Cancel</button>
                </td>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                  <td>
                    <button onClick={() => handleEditStart(item.id, item.name, item.quantity)}>Edit</button>
                    <button>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;