import React from "react";

export default function ItemNota(props) {
    const { titulo, descripcion, importante } = props.nota;
    const cardClass = importante ? "bg-red-400 text-white p-4 m-2 rounded-md w-48 h-48 flex flex-col justify-between" : "bg-yellow-200 text-gray-800 p-4 m-2 rounded-md w-48 h-48 flex flex-col justify-between";

    return (
        <div className={cardClass}>
            <h5 className="font-bold text-lg">{titulo}</h5>
            <p>{descripcion}</p>
        </div>
    );
}