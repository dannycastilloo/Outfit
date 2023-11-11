import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

export const Profile = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            // Redirige al usuario a la página de inicio de sesión después de cerrar la sesión
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <>
            <div className="profile">
                <h1>Perfil del Usuario</h1>

                <label>Nombres</label>
                <input className="large-input" type="text" id="nombres" name="nombres" value="Danny" disabled />

                <div className="input-flex">
                    <div>
                        <label>Apellido Paterno</label>
                        <br />
                        <input className="text-input" type="text" id="paterno" name="paterno" value="Castillo" disabled />
                    </div>
                    <div>
                        <label>Apellido Materno</label>
                        <br />
                        <input className="text-input" type="text" id="materno" name="materno" value="Otiniano" disabled />
                    </div>
                </div>

                <div className="input-flex">
                    <div>
                        <label>DNI</label>
                        <br />
                        <input className="text-input" type="text" id="dni" value="71618709" disabled />
                    </div>

                    <div>
                        <label>Estado Civil</label>
                        <br />
                        <input className="text-input" type="text" id="dni" value="Soltero" disabled />
                    </div>
                </div>

                <label>Dirección</label>
                <input className="large-input" type="text" id="direccion" name="direccion" value="Lima, Perú" disabled />


                <div className="input-flex">
                    <div>
                        <label>Sexo</label>
                        <br />
                        <input className="text-input" type="text" id="dni" value="Masculino" disabled />
                    </div>

                    <div>
                        <label>Fecha de nacimiento</label>
                        <br />
                        <input className="text-input" type="date" id="date" value="2003-09-27" disabled />
                    </div>
                </div>

                <div className="input-flex">
                    <div>
                        <label>Mercado</label>
                        <br />
                        <input className="text-input" type="text" id="mercado" value="UNIHUAL" disabled />
                    </div>
                    <div>
                        <label>Negocio</label>
                        <br />
                        <input className="text-input" type="text" id="negocio" value="Negocio" disabled />
                    </div>
                </div>

                <button onClick={handleLogout} className="button-add">Cerrar Sesión</button>
            </div>
        </>
    )
}
