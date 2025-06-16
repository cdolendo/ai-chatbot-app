import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage} from '../actions/chatActions';

const ChatWindow = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const {messages, loading, error} = useSelector((state) => state.chat);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            dispatch(sendMessage(input));
            setInput('');
        }
    };

    return (
        <div style={styles.chatContainer}>
            <div style={styles.messageList}>
                {messages.map((msg, index) => (
                    <div key={index} style={msg.type === 'user' ? styles.userMessage : styles.aiMessage}>
                        {msg.text}
                    </div>
                ))}
                {loading && <div style={styles.loadingMessage}>AI is typing...</div>}
                {error && <div style={styles.errorMessage}>Error: {error}</div>}
                <div ref={messagesEndRef}/>
            </div>
            <form onSubmit={handleSubmit} style={styles.inputForm}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                    style={styles.inputField}
                    disabled={loading}
                />
                <button type="submit" style={styles.sendButton} disabled={loading}>
                    Send
                </button>
            </form>
        </div>
    );
};

const styles = {
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        width: '600px',
        margin: '20px auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
    },
    messageList: {
        flexGrow: 1,
        padding: '15px',
        overflowY: 'auto',
        backgroundColor: '#f9f9f9',
    },
    userMessage: {
        backgroundColor: '#dcf8c6',
        alignSelf: 'flex-end',
        borderRadius: '10px',
        padding: '8px 12px',
        marginBottom: '10px',
        maxWidth: '70%',
        marginLeft: 'auto',
        wordWrap: 'break-word',
    },
    aiMessage: {
        backgroundColor: '#e6e6e6',
        alignSelf: 'flex-start',
        borderRadius: '10px',
        padding: '8px 12px',
        marginBottom: '10px',
        maxWidth: '70%',
        marginRight: 'auto',
        wordWrap: 'break-word',
    },
    loadingMessage: {
        fontStyle: 'italic',
        color: '#888',
        marginBottom: '10px',
    },
    errorMessage: {
        color: 'red',
        marginBottom: '10px',
    },
    inputForm: {
        display: 'flex',
        padding: '15px',
        borderTop: '1px solid #eee',
        backgroundColor: '#fff',
    },
    inputField: {
        flexGrow: 1,
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginRight: '10px',
    },
    sendButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 15px',
        cursor: 'pointer',
    },
};

export default ChatWindow;