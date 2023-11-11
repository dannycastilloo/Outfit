import { SearchClientes } from "../components/SearchClientes"
import { TablaClientes } from "../components/TablaClientes"

export const Cliente = () => {
  return (
    <>
      <h1>Lista de Clientes</h1>
      <SearchClientes />
      <TablaClientes />
    </>
  )
}
