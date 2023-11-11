import { TablaPagos } from "./TablaPagos"

export const ModalPagos = () => {

  return (
    <div className="modal">
      <h1>Datos del Cliente</h1>
      <div className="input-flex">
        <div>
          <label>Nombre</label>
          <br />
          <input className="text-input" type="text" id="nombres" name="nombres" value="Raul Solano" disabled />
        </div>
        <div>
          <label>Mercado</label>
          <br />
          <input className="text-input" type="text" id="mercado" name="mercado" value="UNIHUAL" disabled />
        </div>
      </div>

      <h1>Datos del Préstamo</h1>
      <div className="input-flex">
        <div>
          <label>Fecha de Inicio</label>
          <br />
          <input className="text-input" type="date" id="nombres" name="inicio" value="2023-07-09" disabled />
        </div>
        <div>
          <label>Fecha de Vencimiento</label>
          <br />
          <input className="text-input" type="date" id="mercado" name="vencimiento" value="2023-08-08" disabled />
        </div>
      </div>
      <div className="input-flex">
        <div>
          <label>Estado</label>
          <br />
          <input className="text-input" type="text" id="estado" name="estado" value="Pendiente" disabled />
        </div>
        <div>
          <label>Cuota Pago</label>
          <br />
          <input className="text-input" type="number" id="cuota" name="cuota" value="8.46" disabled />
        </div>
      </div>
      <div className="input-flex">
        <div>
          <label>Capital</label>
          <br />
          <input className="text-input" type="number" id="capital" name="capital" value="200.00" disabled />
        </div>
        <div>
          <label>Monto Total</label>
          <br />
          <input className="text-input" type="number" id="monto" name="monto" value="200.00" disabled />
        </div>
      </div>
      <div className="input-flex">
        <div>
          <label>Interés (%)</label>
          <br />
          <input className="text-input" type="number" id="interes" name="interes" value="10" disabled />
        </div>
        <div>
          <label>Saldo</label>
          <br />
          <input className="text-input" type="number" id="saldo" name="saldo" value="50.00" disabled />
        </div>
      </div>
      <div className="input-flex">
        <div>
          <label>Número de Impagos</label>
          <br />
          <input className="text-input" type="number" id="impagos" name="impagos" value="12" disabled />
        </div>
        <div>
          <label>Mercado</label>
          <br />
          <input className="text-input" type="number" id="numero-cuota" name="numero-cuota" value="0" disabled />
        </div>
      </div>

      <h1>Listado de Pagos</h1>
      <TablaPagos />
    </div >
  )
}
