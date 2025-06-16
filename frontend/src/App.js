import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import ChatWindow from './components/ChatWindow';
//import './App.css'; // For any global styling if needed

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <h1>AI Chatbot</h1>
                <ChatWindow/>
            </div>
        </Provider>
    );
}

export default App;