import React from "react";

export default function ItemNota(props) {
    const { titulo, descripcion, importante } = props.nota;
    const cardClass = importante ? "card text-white bg-danger mb-3" : "card text-dark bg-light mb-3";

    return (
        <div className={cardClass} style={{ width: "18rem", margin: "0.5rem" }}>
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">{descripcion}</p>
            </div>
        </div>
    );
}
