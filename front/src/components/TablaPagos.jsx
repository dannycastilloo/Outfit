import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { ref, push, set, onValue } from 'firebase/database';

export const TablaPagos = () => {

    const [pagos, setPagos] = useState({});

    useEffect(() => {
        const pagosRef = ref(db, 'pagos');

        onValue(pagosRef, (snapshot) => {
            const pagosData = snapshot.val();
            if (pagosData) {
                setPagos(pagosData);
            }
        });
    }, []);

    const [idprestamo, setIdPrestamo] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');
    const [saldo, setSaldo] = useState('');

    const handleGuardarClick = () => {
        if (idprestamo && monto && fecha && saldo) {
            const pagosRef = ref(db, 'pagos');
            const newPagoRef = push(pagosRef);

            const newPagoId = newPagoRef.key;

            const newPagoData = {
                Id: newPagoId,
                IdPrestamo: idprestamo,
                Monto: monto,
                Fecha: fecha,
                Saldo: saldo
            };

            const specificPagoRef = ref(db, `pagos/${newPagoId}`);

            set(specificPagoRef, newPagoData).then(() => {
                console.log('Pago registrado correctamente.')
            }).catch((error) => {
                console.error('Error al guardar:', error);
            });
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"> <span className="table-head">Id Préstamo</span> </th>
                        <th scope="col"><span className="table-head">Monto</span></th>
                        <th scope="col"><span className="table-head">Fecha</span></th>
                        <th scope="col"><span className="table-head">Saldo</span></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(pagos).map((pago) => (
                        <tr key={pago.IdPrestamo}>
                            <td>
                                <span className="table-content">{pago.IdPrestamo}</span>
                            </td>
                            <td>
                                <span className="table-content">{pago.Monto}</span>
                            </td>
                            <td>
                                <span className="table-content">{pago.Fecha}</span>
                            </td>
                            <td>
                                <span className="table-content">{pago.Saldo}</span>
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <td>
                            <input
                                className="input-pagos"
                                type="text"
                                id="idprestamo"
                                placeholder="id"
                                value={idprestamo}
                                onChange={(e) => setIdPrestamo(e.target.value)} />
                        </td>
                        <td>
                            <input
                                className="input-pagos"
                                type="number"
                                id="monto"
                                placeholder="monto"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)} />
                        </td>
                        <td>
                            <input
                                className="input-pagos"
                                type="date"
                                id="fecha"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)} />
                        </td>
                        <td>
                            <input
                                className="input-pagos"
                                type="number"
                                id="saldo"
                                placeholder="saldo"
                                value={saldo}
                                onChange={(e) => setSaldo(e.target.value)} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleGuardarClick} className="button-add">Registrar Pago</button>
        </>
    )
}
