import React, { useEffect, useRef, useState } from "react";
import ItemNota from "./ItemNota";
import { v4 as uuid } from 'uuid';
import deleteImage from './images/delete-image.png';
import editImage from './images/edit-image.png';

export default function ListaNotas() {
    const [notas, setNotas] = useState([]); // Para almacenar las notas
    const [selectedNota, setSelectedNota] = useState(null); // Para la seelcción de notas
    const [isEditing, setIsEditing] = useState(false); // Para controlar si se esta editando una nota
    const [editTitulo, setEditTitulo] = useState("");
    const [editDescripcion, setEditDescripcion] = useState("");
    const [editError, setEditError] = useState({ titulo: "", descripcion: "" });
    const tituloRef = useRef();
    const descripcionRef = useRef();
    const importanteRef = useRef();
    const [error, setError] = useState({ titulo: "", descripcion: "" });
    
    // useEffect para cargar las notas desde localStorage al cargar el componente
    useEffect(() => {
        const ListaNotas = JSON.parse(localStorage.getItem("sticky_notes-app-lista"));
        if (ListaNotas) {
            setNotas(ListaNotas);
        }
    }, []);

    // useEffect para guardar las notas en localStorage cada vez que cambia el estado de notas
    useEffect(() => {
        const json = JSON.stringify(notas);
        localStorage.setItem("sticky_notes-app-lista", json);
    }, [notas]);

    // Función para agregar notas
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

        if (descripcion.length > 150) {
            newError.descripcion = "Máximo 150 caracteres";
            valid = false;
        }

        setError(newError);

        if (!valid) return;

        const rotacion = Math.floor(Math.random() * 11) - 5; // Generar inclinación aleatoria entre -5 y 5 grados
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

    // Función para seleccionar una nota para editar o ver detalles
    const handleSelectNota = (nota) => {
        setSelectedNota(nota);
        setEditTitulo(nota.titulo);
        setEditDescripcion(nota.descripcion);
        setIsEditing(false);
    };

    const handleCloseModal = () => {
        setSelectedNota(null);
        setIsEditing(false);
    };

    const handleDeleteNota = () => {
        setNotas(prevNotas => prevNotas.filter(nota => nota.id !== selectedNota.id));
        handleCloseModal();
    };

    const handleEditNota = () => {
        setIsEditing(true);
    };

    // Función para guardar los cambios realizados en la nota editada
    const handleSaveNota = () => {
        let valid = true;
        let newEditError = { titulo: "", descripcion: "" };

        if (editDescripcion === "") {
            newEditError.descripcion = "La descripción es obligatoria";
            newEditError.titulo = " -";
            valid = false;
        }

        if (editTitulo.length > 20) {
            newEditError.titulo = "Máximo 20 caracteres";
            valid = false;
        }

        if (editDescripcion.length > 150) {
            newEditError.descripcion = "Máximo 150 caracteres";
            valid = false;
        }

        setEditError(newEditError);

        if (!valid) return;

        // Actualiza el estado de notas con la nota editada
        setNotas(prevNotas => prevNotas.map(nota => 
            nota.id === selectedNota.id ? { ...nota, titulo: editTitulo, descripcion: editDescripcion } : nota
        ));
        setIsEditing(false);
        handleCloseModal();
    };

    return (
        <div className="relative max-w-7xl mx-auto p-4">
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
            <div className={`flex flex-wrap justify-center gap-4 ${selectedNota ? 'blur-sm' : ''}`}>
                {notas.map((item) => (
                    <ItemNota key={item.id} nota={item} onSelect={handleSelectNota}></ItemNota>
                ))}
            </div>
            {selectedNota && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
                    <div className={`relative p-4 rounded-lg shadow-lg z-50 max-w-lg w-full bg-${selectedNota.importante ? 'red-400' : 'yellow-200'} text-${selectedNota.importante ? 'white' : 'gray-800'}`}>
                        {isEditing ? (
                            <div>
                                <input 
                                    className="form-input w-full mb-2 p-2 border border-gray-300 text-black rounded-md" 
                                    value={editTitulo} 
                                    onChange={(e) => setEditTitulo(e.target.value)} 
                                    placeholder="Título" 
                                />
                                {editError.titulo && <div className="text-red-500 mt-1">{editError.titulo}</div>}
                                <textarea 
                                    className="form-input w-full p-2 border border-gray-300 text-black rounded-md" 
                                    value={editDescripcion} 
                                    onChange={(e) => setEditDescripcion(e.target.value)} 
                                    placeholder="Descripción" 
                                    style={{ wordBreak: "break-word", wordWrap: "break-word" }}
                                />
                                {editError.descripcion && <div className="text-red-500 mt-1">{editError.descripcion}</div>}
                                <div className="flex justify-between items-center mt-4">
                                    <button onClick={handleSaveNota} className="bg-blue-500 text-white px-4 py-2 rounded-md">Guardar</button>
                                    <button onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancelar</button>
                                </div>
                            </div>
                        ) : (
                            <div style={{ wordBreak: "break-word", wordWrap: "break-word" }}>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-lg">{selectedNota.titulo}</h3>
                                    <div className="flex">
                                        <img src={editImage} alt="Editar" onClick={handleEditNota} className="w-6 h-6 cursor-pointer mr-2"/>
                                        <img src={deleteImage} alt="Eliminar" onClick={handleDeleteNota} className="w-6 h-6 cursor-pointer"/>
                                    </div>
                                </div>
                                <p>{selectedNota.descripcion}</p>
                                <button onClick={handleCloseModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Cerrar</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
