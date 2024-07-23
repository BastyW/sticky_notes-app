import React from "react";

export default function ItemNota(props) {
    const { titulo, descripcion, importante, rotacion } = props.nota;
    const cardClass = importante 
        ? `bg-red-400 text-white p-4 m-2 rounded-md w-56 h-56 flex flex-col justify-between transform shadow-lg`
        : `bg-yellow-200 text-gray-800 p-4 m-2 rounded-md w-56 h-56 flex flex-col justify-between transform shadow-lg`;

    return (
        <div className={cardClass} style={{ transform: `rotate(${rotacion}deg)`, wordWrap: 'break-word', overflow: 'hidden' }}>
            <h5 className="font-bold text-lg">{titulo}</h5>
            <p className="note-description">{descripcion}</p>
        </div>
    );
}
