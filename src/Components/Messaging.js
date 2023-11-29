// Messaging.js
import React from 'react';
import './Messaging.css'; 

const Messaging = () => {
    return (
        <div className="messaging-container">
            <div className="messages">
                <div className="message bubble">Bonjourrr !</div>
                <div className="message bubble">Comment ça va Comment ça va Comment ça va Comment ça va Comment ça va Comment ça va Comment ça va Comment ça va Comment ça va Comment ça va Comment ça va Comment ça va Comment ça va Comment ça va Comment ça va Comment ça va ?</div>
            </div>
            <div className="input-container">
                <input type="text" placeholder="Écrivez votre message..." className="message-input" />
                <button type="submit" className="send-button">Make it happen</button>
            </div>
        </div>
    );
};

export default Messaging;



