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
        setError(""); // Limpiar mensaje de erro
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Listado de notas</h2>
            <div className="flex items-center justify-center mb-4 space-x-2">
                <input ref={tituloRef} className="form-input w-full max-w-xs p-2 border border-gray-300 rounded-md" placeholder="Título"></input>
                <input ref={descripcionRef} className="form-input w-full max-w-xs p-2 border border-gray-300 rounded-md mx-2" placeholder="Descripción"></input>
                <div className="flex items-center">
                    <input ref={importanteRef} type="checkbox" className="form-checkbox text-indigo-600" id="importanteCheck"></input>
                    <label className="ml-2 text-gray-700" htmlFor="importanteCheck">Importante</label>
                </div>
                <button onClick={agregarNota} className="bg-blue-500 text-white px-4 py-2 rounded-md mx-2">Agregar</button>
            </div>
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                {notas.map((item) => (
                    <ItemNota key={item.id} nota={item}></ItemNota>
                ))}
            </div>
        </div>
    );
}
