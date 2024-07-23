import React, { useEffect, useRef, useState } from "react";
import ItemNota from "./ItemNota";
import { v4 as uuid } from 'uuid';

export default function ListaNotas() {
    const [notas, setNotas] = useState([]);
    const tituloRef = useRef();
    const descripcionRef = useRef();
    const importanteRef = useRef();
    const [error, setError] = useState({ titulo: "", descripcion: "" });

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
        const titulo = tituloRef.current.value.trim();
        const descripcion = descripcionRef.current.value.trim();
        const importante = importanteRef.current.checked;

        let valid = true;
        let newError = { titulo: "", descripcion: "" };

        if (descripcion === "") {
            newError.descripcion = "La descripción es obligatoria";
            newError.titulo = " -";
            valid = false;
        }

        if (titulo.length > 20) {
            newError.titulo = "Máximo 20 caracteres";
            valid = false;
        }

        if (descripcion.length > 200) {
            newError.descripcion = "Máximo 200 caracteres";
            valid = false;
        }

        setError(newError);

        if (!valid) return;

        const rotacion = Math.floor(Math.random() * 21) - 10; // Generar inclinación aleatoria entre -10 y 10 grados
        const nuevaNota = {
            id: uuid(),
            titulo: titulo,
            descripcion: descripcion,
            importante: importante,
            rotacion: rotacion
        };

        setNotas((prev) => {
            return [...prev, nuevaNota];
        });

        tituloRef.current.value = "";
        descripcionRef.current.value = "";
        importanteRef.current.checked = false;
        setError({ titulo: "", descripcion: "" }); // Limpiar mensajes de error
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-2xl text-white font-semibold mb-4 text-center">Listado de notas</h2>
            <div className="flex flex-col md:flex-row items-center justify-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full max-w-xs">
                    <input ref={tituloRef} className="form-input w-full p-2 border border-gray-300 rounded-md" placeholder="Título"></input>
                    {error.titulo && <div className="text-red-500 mt-1">{error.titulo}</div>}
                </div>
                <div className="w-full max-w-xs">
                    <input ref={descripcionRef} className="form-input w-full p-2 border border-gray-300 rounded-md" placeholder="Descripción"></input>
                    {error.descripcion && <div className="text-red-500 mt-1">{error.descripcion}</div>}
                </div>
                <div className="flex items-center">
                    <input ref={importanteRef} type="checkbox" className="form-checkbox text-indigo-600" id="importanteCheck"></input>
                    <label className="ml-2 text-white" htmlFor="importanteCheck">Importante</label>
                </div>
                <button onClick={agregarNota} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 md:mt-0">Agregar</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                {notas.map((item) => (
                    <ItemNota key={item.id} nota={item}></ItemNota>
                ))}
            </div>
        </div>
    );
}
