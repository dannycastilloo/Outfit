import { SearchPrestamos } from "../components/SearchPrestamos"
import { TablaPrestamos } from "../components/TablaPrestamos"

export const Prestamos = () => {
  return (
    <>
      <h1>Lista de Préstamos</h1>
      <SearchPrestamos />
      <TablaPrestamos />
    </>
  )
}
