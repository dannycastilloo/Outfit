import React, { useState, useEffect, useRef } from 'react';
import { db } from '../config/firebaseConfig';
import { remove, ref, onValue } from 'firebase/database';
import { ModalPagos } from './ModalPagos';

export const TablaPrestamos = () => {

    const [prestamos, setPrestamos] = useState({});

    useEffect(() => {
        const prestamosRef = ref(db, 'prestamos');

        onValue(prestamosRef, (snapshot) => {
            const prestamosData = snapshot.val();
            if (prestamosData) {
                setPrestamos(prestamosData);
            }
        });
    }, []);

    const deletePrestamo = (prestamoId) => {
        const prestamosRef = ref(db, `prestamos/${prestamoId}`);

        remove(prestamosRef)
            .then(() => {
                console.log('Prestamo eliminado correctamente.');
            })
            .catch((error) => {
                console.error('Error al eliminar:', error);
            });
    };

    // Más información
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) && isModalOpen) {
                closeModal();
            }
        };

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"><span className="table-head">Cliente</span></th>
                        <th scope="col"><span className="table-head">Estado</span></th>
                        <th scope="col"><span className="table-head">Monto</span></th>
                        <th scope="col"><span className="table-head">Inicio</span></th>
                        <th scope="col"><span className="table-head">Vencimiento</span></th>
                        <th scope="col"><span className="table-head">Interés</span></th>
                        <th scope="col"><span className="table-head">Acciones</span></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(prestamos).map((prestamo) => (
                        <tr key={prestamo.NombreCliente}>
                            <td>
                                <span className="table-content">{prestamo.NombreCliente}</span>
                            </td>
                            <td>
                                <span className="table-content">{prestamo.Estado}</span>
                            </td>
                            <td>
                                <span className="table-content">{prestamo.MontoTotal}</span>
                            </td>
                            <td>
                                <span className="table-content">{prestamo.FechaInicio}</span>
                            </td>
                            <td>
                                <span className="table-content">{prestamo.FechaVencimiento}</span>
                            </td>
                            <td>
                                <span className="table-content">{prestamo.Interes}</span>
                            </td>

                            <td className="actions-container">
                                <button className="ver" onClick={openModal}>
                                    <img src="../src/assets/view.svg" alt="Ver" />
                                </button>
                                <button className="agregar">
                                    <img src="../src/assets/Descargar.svg" alt="Descargar" />
                                </button>
                                <button className="editar">
                                    <img src="../src/assets/Editar.svg" alt="Editar" />
                                </button>
                                <button className="cancelar" onClick={() => deletePrestamo(prestamo.IdCliente)}>
                                    <img src="../src/assets/Borrar.svg" alt="Eliminar" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {
                isModalOpen && (
                    <>
                        <div className="modal-background"></div>
                        <div className="modal-overlay">
                            <div className="modal-container" ref={modalRef}>
                                <ModalPagos closeModal={closeModal} />
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}