// This is the main JavaScript entry point for your React application.
// It renders the root App component into the 'root' div in index.html.
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot for React 18
//import './index.css'; // Optional: for global CSS
import App from './App'; // Import your main App component
//import reportWebVitals from './reportWebVitals'; // For performance monitoring (optional)

// Create a root for rendering your React application.
// This is the recommended way to render in React 18.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App /> {/* Render your main App component */}
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: [https://bit.ly/CRA-vitals](https://bit.ly/CRA-vitals)
//reportWebVitals();