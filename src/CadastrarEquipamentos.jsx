import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CadastrarEquipamentos() {
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [equipamentoData, setEquipamentoData] = useState({
    nomeEquipamento: '',
    descricao: '',
  });

  useEffect(() => {
    // Ao carregar o componente, buscar a lista de empresas cadastradas
    axios.get('http://localhost:8080/empresa/todas')
      .then(response => {
        setEmpresas(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar empresas:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEquipamentoData({
      ...equipamentoData,
      [name]: value,
    });
  };

  const handleCadastrarEquipamentoClick = async () => {
    try {
      // Verificar se a empresa foi selecionada
      if (!selectedEmpresa) {
        alert('Por favor, selecione uma empresa.');
        return;
      }

      // Enviar requisição para cadastrar o equipamento
      const response = await axios.post(`http://localhost:8080/empresas/${selectedEmpresa}/equipamentos/cadastrar`, equipamentoData);
      // Limpar os campos após o cadastro
      setEquipamentoData({
        nomeEquipamento: '',
        descricao: '',
      });
      // Lidar com a resposta
    } catch (error) {
      // Lidar com erros
      console.error('Erro ao cadastrar equipamento:', error);
    }
  };

  return (
    <div>
      <h2>Cadastrar Equipamento</h2>
      <label htmlFor="nomeEquipamento">Nome do Equipamento:</label>
      <input type="text" id="nomeEquipamento" name="nomeEquipamento" value={equipamentoData.nomeEquipamento} onChange={handleInputChange} />
      <label htmlFor="descricao">Descrição:</label>
      <input type="text" id="descricao" name="descricao" value={equipamentoData.descricao} onChange={handleInputChange} />
      <label htmlFor="empresa">Selecione a Empresa:</label>
      <select id="empresa" name="empresa" value={selectedEmpresa} onChange={(e) => setSelectedEmpresa(e.target.value)}>
        <option value="">Selecione...</option>
        {empresas.map(empresa => (
          <option key={empresa.empresaId} value={empresa.empresaId}>{empresa.nomeEmpresa}</option>
        ))}
      </select>
      <button onClick={handleCadastrarEquipamentoClick}>Cadastrar Equipamento</button>
    </div>
  );
}
