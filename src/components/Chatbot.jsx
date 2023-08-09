import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GPT3_API_KEY = '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'; // Reemplaza con tu clave de API de GPT-3

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la apertura y cierre del chatbot

  useEffect(() => {
    // Agregar un mensaje inicial al estado para entrenar el modelo
    setMessages([
      { text: 'Hola Fasty, ¿puedes ayudarme con cálculos de materiales de construcción?', sender: 'user' },
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      return;
    }

    // Agregar el nuevo mensaje al estado
    setMessages([...messages, { text: message, sender: 'user' }]);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: messages.map((msg) => msg.text).join('\n'),
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GPT3_API_KEY}`,
          },
        }
      );

      const botResponse = response.data.choices[0].text;

      // Agregar la respuesta del bot al estado
      setMessages([...messages, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Error en la solicitud a GPT-3:', error);
      // Manejar el error si es necesario
    }

    setMessage('');
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chatbot-container fixed bottom-[200px] right-[50px] ${isOpen ? 'min-h-[320px] bg-[rgb(92,110,141)] ' : 'h-[50px]'}`}>
      {/* Icono para abrir/cerrar */}
      <div className="chatbot-toggle" onClick={toggleChatbot}>
        {isOpen ? '-' : <img className='h-[200px]' src="LogoFastCommerce.png" alt="Logo FastCommerce" />}
      </div>
      {/* Contenido del chatbot */}
      {isOpen && (
        <>
          <div className="chatbot-messages fixed bottom-[200px] right-[50px] max-w-[350px] min-h-[300px] flex justify-center items-center bg-[rgb(92,110,141)]">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender === 'bot' ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input fixed bottom-[150px] right-[100px] bg-[rgb(92,110,141)]">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
