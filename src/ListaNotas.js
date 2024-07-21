import React, { useEffect, useRef, useState } from "react";
import ItemNota from "./ItemNota";
import { v4 as uuid } from 'uuid';

export default function ListaNotas() {
    const [notas, setNotas] = useState([]);
    const tituloRef = useRef();
    const descripcionRef = useRef();
    const importanteRef = useRef();
    const [error, setError] = useState("");

    useEffect(() => {
        const ListaNotas = JSON.parse(localStorage.getItem("sticky_notes-app-lista"));
        if (ListaNotas) {
            setNotas(ListaNotas);
        }
    }, []);

    useEffect(() => {
        const json = JSON.stringify(notas);
        localStorage.setItem("sticky_notes-app-lista", json);
    }, [notas]);

    const agregarNota = () => {
        const titulo = tituloRef.current.value;
        const descripcion = descripcionRef.current.value;
        const importante = importanteRef.current.checked;

        if (descripcion === "") {
            setError("La descripción es obligatoria");
            return;
        }

        const nuevaNota = {
            id: uuid(),
            titulo: titulo,
            descripcion: descripcion,
            importante: importante
        };

        setNotas((prev) => {
            return [...prev, nuevaNota];
        });

        tituloRef.current.value = "";
        descripcionRef.current.value = "";
        importanteRef.current.checked = false;
        setError(""); // Borrar mensaje de error
    };

    return (
        <div>
            <h2>Listado de notas</h2>
            <div className="input-group my-4">
                <input ref={tituloRef} className="form-control" placeholder="Título"></input>
                <input ref={descripcionRef} className="form-control mx-2" placeholder="Descripción"></input>
                <div className="form-check">
                    <input ref={importanteRef} type="checkbox" className="form-check-input" id="importanteCheck"></input>
                    <label className="form-check-label" htmlFor="importanteCheck">Importante</label>
                </div>
                <button onClick={agregarNota} className="btn btn-primary mx-2">Agregar</button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-flex flex-wrap">
                {notas.map((item) => (
                    <ItemNota key={item.id} nota={item}></ItemNota>
                ))}
            </div>
        </div>
    );
}
