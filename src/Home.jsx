import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MultipleBoxes() {
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/dash/quantidade-por-tipo');
        setBoxData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '20px' }}> {/* Adicionei marginTop */}
      {Object.entries(boxData).map(([tipo, quantidade]) => (
        <BoxWithContent
          key={tipo}
          tipo={tipo}
          quantidade={quantidade}
          color="#FF5733" // Vermelho
        />
      ))}
    </div>
  );
}

function BoxWithContent({ tipo, quantidade, color }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: 180,
        height: 180,
        borderRadius: 1,
        backgroundColor: isHovered ? '#FF4500' : color,
        transition: 'background-color 0.3s',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3>{tipo}</h3>
      <h2>{quantidade}</h2>
    </div>
  );
}
