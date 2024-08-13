import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardContent, setNewCardContent] = useState('');

  const addCard = useCallback(async () => {
    if (newCardTitle && newCardContent) {
        const {status} = await axios.post('https://tufbackend-dulp.onrender.com/card',{
            title:newCardTitle,
            contents:newCardContent
        });
        if(status==200){
            fetchData();
            setNewCardTitle('');
            setNewCardContent('');
            setShowForm(false);
        }
        else{
            console.log("error in posting card");
        }
    }
  },[newCardTitle, newCardContent]);

  const fetchData = async()=>{
    try {
      const res = await axios.get("https://tufbackend-dulp.onrender.com/cards");
      setCards(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(()=>{
    fetchData();
  },[addCard])

  const deleteCard = async (id) => {
    const {status} = await axios.delete(`https://tufbackend-dulp.onrender.com/card/${id}`);
    if(status==200){
        const updatedCards = cards.filter(c=> c.id!==id);
        setCards(updatedCards);
    }
    else{
        console.log("error in deleting card");
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Card List</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {cards.length===0 ?<p>empty</p> :cards?.map((card, index) => (
          <div key={index} style={{ border: '1px solid #ccc', borderRadius: '0.5rem', padding: '1rem' }}>
            <h2 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{card?.title}</h2>
            <p style={{ marginBottom: '1rem' }}>{card?.contents}</p>
            <button 
              onClick={() => deleteCard(card.id)}
              style={{
                backgroundColor: '#ff4d4f',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      
      {showForm ? (
        <div style={{ marginTop: '1rem', border: '1px solid #ccc', borderRadius: '0.5rem', padding: '1rem' }}>
          <input
            type="text"
            placeholder="Title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Content"
            value={newCardContent}
            onChange={(e) => setNewCardContent(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <button 
            onClick={addCard}
            style={{
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              marginRight: '0.5rem'
            }}
          >
            Add Card
          </button>
          <button 
            onClick={() => setShowForm(false)}
            style={{
              backgroundColor: '#d9d9d9',
              color: 'black',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setShowForm(true)}
          style={{
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Add Card
        </button>
      )}
    </div>
  );
};

export default CardList;