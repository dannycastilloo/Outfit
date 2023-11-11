import React, { useState } from 'react';
import { db } from '../config/firebaseConfig';
import { ref, push, set } from 'firebase/database';

export const RegisterCliente = ({ closeModal }) => {

    const [nombres, setNombres] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [dni, setDni] = useState('');
    const [sexo, setSexo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [civil, setCivil] = useState('');
    const [nacimiento, setNacimiento] = useState('');
    const [mercado, setMercado] = useState('');
    const [negocio, setNegocio] = useState('');
    const [archivosUtilizados, setArchivosUtilizados] = useState({
        "Boleta de Venta": false,
        "Recibo de Gas": false,
        "Constancia de Posesión": false,
        "Factura": false,
        "Boleto de Compra": false,
        "Título de Propiedad": false,
        "Tarjeta de Propiedad": false,
        "Contrato de Alquiler": false,
        "Recibo de Teléfono": false,
        "Recibo de Agua": false,
        "Recibo de Luz": false,
        "Copia de DNI": false,
    });

    const handleGuardarClick = () => {
        if (nombres && paterno && materno && dni && direccion && sexo && civil && nacimiento && mercado && negocio) {
            // Crea un nuevo registro en la base de datos
            const clientesRef = ref(db, 'clientes');
            const newClienteRef = push(clientesRef);

            // Clave única
            const newClienteId = newClienteRef.key;

            const archivosSeleccionados = Object.entries(archivosUtilizados)
                .filter(([nombreArchivo, seleccionado]) => seleccionado)
                .map(([nombreArchivo]) => nombreArchivo);

            // Define los datos
            const newClienteData = {
                Id: newClienteId,
                Nombres: nombres,
                ApellidoPaterno: paterno,
                ApellidoMaterno: materno,
                DNI: dni,
                Sexo: sexo,
                EstadoCivil: civil,
                Direccion: direccion,
                FechaNacimiento: nacimiento,
                Mercado: mercado,
                Negocio: negocio,
                ArchivosUtilizados: archivosSeleccionados,
            };

            // Referencia para el nuevo registro
            const specificClienteRef = ref(db, `clientes/${newClienteId}`);

            // Sube los datos
            set(specificClienteRef, newClienteData).then(() => {
                closeModal();
            }).catch((error) => {
                console.error('Error al guardar:', error);
            });
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };

    return (
        <div className="modal">
            <h1>Registrar Cliente</h1>

            <label>Nombres</label>
            <input
                className="large-input"
                type="text"
                id="nombres"
                name="nombres"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)} />

            <div className="input-flex">
                <div>
                    <label>Apellido Paterno</label>
                    <br />
                    <input
                        className="text-input"
                        type="text"
                        id="paterno"
                        name="paterno"
                        value={paterno}
                        onChange={(e) => setPaterno(e.target.value)} />
                </div>
                <div>
                    <label>Apellido Materno</label>
                    <br />
                    <input
                        className="text-input"
                        type="text"
                        id="materno"
                        name="materno"
                        value={materno}
                        onChange={(e) => setMaterno(e.target.value)} />
                </div>
            </div>

            <div className="input-flex">
                <div>
                    <label>DNI</label>
                    <br />
                    <input
                        className="text-input"
                        type="text"
                        id="dni"
                        name="dni"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)} />
                </div>

                <div>
                    <label>Estado Civil</label>
                    <br />
                    <select className="text-input" name="civil" id="civil" onChange={(e) => setCivil(e.target.value)}>
                        <option value="">Seleccionar</option>
                        <option value="Soltero">Soltero</option>
                        <option value="Casado">Casado</option>
                    </select>
                </div>
            </div>

            <label>Dirección</label>
            <input
                className="large-input"
                type="text"
                id="direccion"
                name="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)} />


            <div className="input-flex">
                <div>
                    <label>Sexo</label>
                    <br />
                    <select className="text-input" name="sexo" id="sexo" onChange={(e) => setSexo(e.target.value)}>
                        <option value="">Seleccionar</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>

                <div>
                    <label>Fecha de nacimiento</label>
                    <br />
                    <input
                        className="text-input"
                        type="date"
                        id="date"
                        value={nacimiento}
                        onChange={(e) => setNacimiento(e.target.value)} />
                </div>
            </div>

            <div className="input-flex">
                <div>
                    <label>Mercado</label>
                    <br />
                    <input
                        className="text-input"
                        type="text"
                        id="mercado"
                        value={mercado}
                        onChange={(e) => setMercado(e.target.value)} />
                </div>
                <div>
                    <label>Negocio</label>
                    <br />
                    <input
                        className="text-input"
                        type="text"
                        id="negocio"
                        value={negocio}
                        onChange={(e) => setNegocio(e.target.value)} />
                </div>
            </div>

            <div className="checkbox-group">
                <div className="checkbox-column">
                    <div className="input-flex">
                        <input
                            className="checkbox"
                            type="checkbox"
                            name="venta"
                            id="check-venta"
                            checked={archivosUtilizados["Boleta de Venta"]}
                            onChange={(e) => {
                                setArchivosUtilizados({
                                    ...archivosUtilizados,
                                    "Boleta de Venta": e.target.checked,
                                });
                            }} />
                        <label htmlFor="check-venta">Boleta de Venta</label>
                    </div>

                    <div className="input-flex">
                        <input
                            className="checkbox"
                            type="checkbox"
                            name="gas"
                            id="check-gas"
                            checked={archivosUtilizados["Recibo de Gas"]}
                            onChange={(e) => {
                                setArchivosUtilizados({
                                    ...archivosUtilizados,
                                    "Recibo de Gas": e.target.checked,
                                });
                            }} />
                        <label htmlFor="check-gas">Recibo de Gas</label>
                    </div>

                    <div className="input-flex">
                        <input
                            className="checkbox"
                            type="checkbox"
                            name="posesion"
                            id="check-posesion"
                            checked={archivosUtilizados["Constancia de Posesión"]}
                            onChange={(e) => {
                                setArchivosUtilizados({
                                    ...archivosUtilizados,
                                    "Constancia de Posesión": e.target.checked,
                                });
                            }} />
                        <label htmlFor="check-posesion">Constancia de Posesión</label>
                    </div>

                    <div className="input-flex">
                        <input
                            className="checkbox"
                            type="checkbox"
                            name="factura"
                            id="check-factura"
                            checked={archivosUtilizados["Factura"]}
                            onChange={(e) => {
                                setArchivosUtilizados({
                                    ...archivosUtilizados,
                                    "Factura": e.target.checked,
                                });
                            }} />
                        <label htmlFor="check-factura">Factura</label>
                    </div>

                    <div className="input-flex">
                        <input
                            className="checkbox"
                            type="checkbox"
                            name="compra"
                            id="check-compra"
                            checked={archivosUtilizados["Boleto de Compra"]}
                            onChange={(e) => {
                                setArchivosUtilizados({
                                    ...archivosUtilizados,
                                    "Boleto de Compra": e.target.checked,
                                });
                            }} />
                        <label htmlFor="check-compra">Boleto de Compra</label>
                    </div>

                    <div className="input-flex">
                        <input
                            className="checkbox"
                            type="checkbox"
                            name="titulo"
                            id="check-titulo"
                            checked={archivosUtilizados["Título de Propiedad"]}
                            onChange={(e) => {
                                setArchivosUtilizados({
                                    ...archivosUtilizados,
                                    "Título de Propiedad": e.target.checked,
                                });
                            }} />
                        <label htmlFor="check-titulo">Título de Propiedad</label>
                    </div>
                </div>

                <div className="checkbox-column">
                    <div className="input-flex">
                        <input
                            className="checkbox"
                            type="checkbox"
                            name="propiedad"
                            id="check-propiedad"
                            checked={archivosUtilizados["Tarjeta de Propiedad"]}
                            onChange={(e) => {
                                setArchivosUtilizados({
                                    ...archivosUtilizados,
                                    "Tarjeta de Propiedad": e.target.checked,
                                });
                            }} />
                        <label htmlFor="check-propiedad">Tarjeta de Propiedad</label>
                    </div>

                    <div className="input-flex">
                        <input
                            className="checkbox"
                            type="checkbox"
                            name="alquiler"
                            id="check-alquiler"
                            checked={archivosUtilizados["Contato de Alquiler"]}
                            onChange={(e) => {
                                setArchivosUtilizados({
                                    ...archivosUtilizados,
                                    "Contato de Alquiler": e.target.checked,
                                });
                            }} />
                        <label htmlFor="check-alquiler">Contato de Alquiler</label>
                    </div>

                    <div className="input-flex">
                        <input
                            className="checkbox"
                            type="checkbox"
                            name="telefono"
                            id="check-telefono"
                            checked={archivosUtilizados["Recibo de Teléfono"]}
                            onChange={(e) => {
                                setArchivosUtilizados({
                                    ...archivosUtilizados,
                                    "Recibo de Teléfono": e.target.checked,
                                });
                            }} />
                        <label htmlFor="check-telefono">Recibo de Teléfono</label>
                    </div>

                    <div className="input-flex">
                        <input
                            className="checkbox"
                            type="checkbox"
                            name="agua"
                            id="check-agua"
                            checked={archivosUtilizados["Recibo de Agua"]}
                            onChange={(e) => {
                                setArchivosUtilizados({
                                    ...archivosUtilizados,
                                    "Recibo de Agua": e.target.checked,
                                });
                            }} />
                        <label htmlFor="check-agua">Recibo de Agua</label>
                    </div>

                    <div className="input-flex">
                        <input
                            className="checkbox"
                            type="checkbox"
                            name="luz"
                            id="check-luz"
                            checked={archivosUtilizados["Recibo de Luz"]}
                            onChange={(e) => {
                                setArchivosUtilizados({
                                    ...archivosUtilizados,
                                    "Recibo de Luz": e.target.checked,
                                });
                            }} />
                        <label htmlFor="check-luz">Recibo de Luz</label>
                    </div>

                    <div className="input-flex">
                        <input
                            className="checkbox"
                            type="checkbox"
                            name="dni"
                            id="check-dni"
                            checked={archivosUtilizados["Copia de DNI"]}
                            onChange={(e) => {
                                setArchivosUtilizados({
                                    ...archivosUtilizados,
                                    "Copia de DNI": e.target.checked,
                                });
                            }} />
                        <label htmlFor="check-dni">Copia de DNI</label>
                    </div>
                </div>
            </div>

            <button className="button-add" onClick={handleGuardarClick}>Enviar Datos</button>
        </div >
    )
}
