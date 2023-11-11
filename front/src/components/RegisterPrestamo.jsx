import React, { useState } from 'react';
import { db } from '../config/firebaseConfig';
import { ref, push, set } from 'firebase/database';

export const RegisterPrestamo = ({ closeModal }) => {

    const [cliente, setCliente] = useState('');
    const [interes, setInteres] = useState('');
    const [inicio, setInicio] = useState('');
    const [vencimiento, setVencimiento] = useState('');
    const [monto, setMonto] = useState('');
    const [estado, setEstado] = useState('');

    const handleGuardarClick = () => {
        if (cliente && interes && inicio && vencimiento && monto && estado) {
            // Crea un nuevo registro en la base de datos
            const prestamosRef = ref(db, 'prestamos');
            const newPrestamoRef = push(prestamosRef);

            // Clave única
            const newPrestamoId = newPrestamoRef.key;

            // Define los datos
            const newPrestamoData = {
                Id: newPrestamoId,
                NombreCliente: cliente,
                Interes: interes,
                FechaInicio: inicio,
                FechaVencimiento: vencimiento,
                MontoTotal: monto,
                Estado: estado,
            };

            // Referencia para el nuevo registro
            const specificPrestamoRef = ref(db, `prestamos/${newPrestamoId}`);

            // Sube los datos
            set(specificPrestamoRef, newPrestamoData).then(() => {
                closeModal();
            }).catch((error) => {
                console.error('Error al guardar:', error);
            });
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };

    return (
        <>
            <div className="modal">
                <h1>Registrar Préstamo</h1>

                <label>Cliente</label>
                <input
                    className="large-input"
                    type="text"
                    id="cliente"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)} />

                <label>Monto</label>
                <input
                    className="large-input"
                    type="number"
                    id="monto"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)} />

                <label>Fecha de Inicio</label>
                <input
                    className="large-date"
                    type="date"
                    id="inicio"
                    value={inicio}
                    onChange={(e) => setInicio(e.target.value)} />

                <label>Fecha de Vencimiento</label>
                <input
                    className="large-date"
                    type="date"
                    id="vencimiento"
                    value={vencimiento}
                    onChange={(e) => setVencimiento(e.target.value)} />

                <label>Interés (%)</label>
                <input
                    className="large-input"
                    type="number"
                    id="interes"
                    value={interes}
                    onChange={(e) => setInteres(e.target.value)} />

                <label>Estado</label>
                <input
                    className="large-input"
                    type="text"
                    id="estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}/>

                <label>Adjuntar documentos</label>

                <label htmlFor="documents" className="file-input-label">
                    <img src="../src/assets/Upload.svg" alt="Subir" />
                    <br />
                    Sube o arrastra tus archivos
                </label>
                <input className="file-input" type="file" id="documents" name="documents" />

                <button className="button-add" onClick={handleGuardarClick}>Enviar Datos</button>
            </div >
        </>
    )
}
