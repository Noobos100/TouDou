import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ToDoApp from './ToDoApp';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ToDoApp />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// wrap ToDoApp with React.StrictMode if needed
// <React.StrictMode>
//     <ToDoApp />
// </React.StrictMode>
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
