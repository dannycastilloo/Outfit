import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {} from "firebase/firestore"
import { getFirestore, doc, setDoc } from "firebase/firestore"

export const Register = () => {

  const [registerSuccess, setRegisterSuccess] = useState(null);

  const auth = getAuth()
  const firestore = getFirestore()

  const registrarUsuario = async (email, password, rol) => {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase
    })

    const docuRef = doc(firestore, `/usuarios/${infoUsuario.user.uid}`)
    setDoc(docuRef, {correo: email, rol: rol})

    setRegisterSuccess('Usuario registrado correctamente.');
  }

  const registerHandler = (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;

    console.log("Submit:", email, password, rol)

    registrarUsuario(email, password, rol)
  }

  return (
    <div className="register-container">

      <form onSubmit={registerHandler} className="register-inputs">

        <h1 className="title-register">Registrar Usuario</h1>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contrasena" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
          />
        </div>

        <div className="mb-3">
          <label>Rol</label>
          <br />
          <select className="form-control" name="rol" id="rol">
            <option value="Administrador">Administrador</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Asesor">Asesor</option>
          </select>
        </div>

        <button type="submit" className="iniciar">Enviar Datos</button>
        {registerSuccess && <p className="error-message">{registerSuccess}</p>}
      </form>
    </div>
  )
}
