import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { remove, ref, onValue } from 'firebase/database';

export const TablaClientes = () => {

    const [clientes, setClientes] = useState({});

    useEffect(() => {
        const clientesRef = ref(db, 'clientes');

        onValue(clientesRef, (snapshot) => {
            const clientesData = snapshot.val();
            if (clientesData) {
                setClientes(clientesData);
            }
        });
    }, []);

    const deleteCliente = (clienteId) => {
        const clientesRef = ref(db, `clientes/${clienteId}`);

        remove(clientesRef)
            .then(() => {
                console.log('Cliente eliminado correctamente.');
            })
            .catch((error) => {
                console.error('Error al eliminar el cliente:', error);
            });
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col"> <span className="table-head">Nombre</span> </th>
                    <th scope="col"><span className="table-head">Apellido Paterno</span></th>
                    <th scope="col"><span className="table-head">DNI</span></th>
                    <th scope="col"><span className="table-head">Mercado</span></th>
                    <th scope="col"><span className="table-head">Acciones</span></th>
                </tr>
            </thead>
            <tbody>
                {Object.values(clientes).map((cliente) => (
                    <tr key={cliente.Nombres}>
                        <td>
                            <span className="table-content">{cliente.Nombres}</span>
                        </td>
                        <td>
                            <span className="table-content">{cliente.ApellidoPaterno}</span>
                        </td>
                        <td>
                            <span className="table-content">{cliente.DNI}</span>
                        </td>
                        <td>
                            <span className="table-content">{cliente.Mercado}</span>
                        </td>

                        <td className="actions-container">
                            <button className="editar">
                                <img src="../src/assets/Editar.svg" alt="Editar" />
                            </button>
                            <button className="cancelar" onClick={() => deleteCliente(cliente.IdCliente)}>
                                <img src="../src/assets/Borrar.svg" alt="Eliminar" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
