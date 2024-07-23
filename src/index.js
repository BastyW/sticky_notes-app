import React from 'react';
import ReactDOM from 'react-dom/client';
import ListaNotas from './ListaNotas';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className='flex justify-center pt-3'>
        <ListaNotas></ListaNotas>
    </div>
);
