import React from "react";

export default function ItemNota(props) {
    const { titulo, descripcion, importante, rotacion } = props.nota;
    const cardClass = importante 
        ? `bg-red-400 text-white p-4 m-2 rounded-md w-60 h-60 flex flex-col transform shadow-lg cursor-pointer`
        : `bg-yellow-200 text-gray-800 p-4 m-2 rounded-md w-60 h-60 flex flex-col transform shadow-lg cursor-pointer`;

    const descripcionClass = titulo 
        ? "flex-grow note-description mt-2" 
        : "flex-grow note-description mt-6"; // Añade margen superior cuando no hay título

    return (
        <div 
            className={cardClass} 
            style={{ transform: `rotate(${rotacion}deg)`, wordWrap: 'break-word', overflow: 'hidden' }}
            onClick={() => props.onSelect(props.nota)}
        >
            {titulo && <h5 className="font-bold text-lg">{titulo}</h5>}
            <p className={descripcionClass}>{descripcion}</p>
        </div>
    );
}
