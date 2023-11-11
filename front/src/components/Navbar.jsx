import { NavLink } from "react-router-dom"

export const Navbar = () => {
    return (
        <>
            <header>
                <nav>
                    <NavLink to='/home'>
                        <img className="brand" src="../src/assets/logo.png" alt="Logo" />
                    </NavLink>
                    <ul className="u-list">
                        <li>
                            <NavLink to='/cliente' className="nav-head">CLIENTES</NavLink>
                        </li>
                        <li>
                            <NavLink to='/prestamos' className="nav-head">PRÉSTAMOS</NavLink>
                        </li>

                        <li>
                            <NavLink to='/resumen' className="nav-head">RESUMEN</NavLink>
                        </li>
                        <li>
                            <NavLink to='profile' className="nav-head">USUARIO</NavLink>
                        </li>
                    </ul>
                </nav >
            </header >

        </>
    )
}
