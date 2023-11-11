import { NavLink } from "react-router-dom"

export const Home = () => {
    return (
        <>
            <h1>¡Bienvenido!</h1>
            <p className="subtitle">Esta es la página de Inicio.</p>

            <NavLink to='/cliente' className="button-add">Ver Clientes</NavLink>
            <NavLink to='/prestamos' className="button-add">Ver Préstamos</NavLink>
            <NavLink to='/resumen' className="button-add">Ver Resumen</NavLink>
            <NavLink to='/profile' className="button-add">Ver Perfil</NavLink>
            <NavLink to='/register' className="button-add">Registrar Usuario</NavLink>
        </>
    )
}
