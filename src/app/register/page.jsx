"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { signIn } from "next-auth/react";
export default function NewUser() {
  const [newUser, setNewUser] = useState({
    nombre: "",
    telefono: "",
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const params = useParams();
  const router = useRouter();

  const handleChange = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);

    setIsSubmitting(true);

    // if (params.id) {
    //   await updateTask();
    // } else {
      await createUser();
    // }
  };

  const validate = () => {
    let errors = {};

    if (!newUser.nombre) {
      errors.nombre = "Se requiere un nombre de usuario";
    }
    if (!newUser.telefono) {
      errors.telefono = "Se requiere número de teléfono";
    }
    if (!newUser.email) {
      errors.email = "Se requiere un correo electrónico valido";
    }
    if (!newUser.password) {
      errors.password = "Se requiere un password";
    }

    return errors;
  };

  const createUser = async () => {
    try {
      const signupResponse = await axios.post("/api/auth/signup", newUser);
      const res = await signIn("credentials", {email:signupResponse.email, password:newUser.password, redirect: false})
      if (res?.ok) return router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="contenedor min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between">
          <h1 className="font-bold text-3xl">Registro de Usuario</h1>
        </header>
        <input
          type="text"
          placeholder="Nombre de usuario"
          name="nombre"
          onChange={handleChange}
          value={newUser.nombre}
          autoFocus
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />
        { !errors.nombre ? "" : <p className="text-red-500">{errors.nombre}</p> }
        <input
          type="text"
          placeholder="Teléfono"
          name="telefono"
          onChange={handleChange}
          value={newUser.telefono}
          autoFocus
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />
        { !errors.telefono ? "" : <p className="text-red-500">{errors.telefono}</p> }
        <input
          type="email"
          placeholder="Correo electrónico"
          name="email"
          onChange={handleChange}
          value={newUser.email}
          autoFocus
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />
        { !errors.email ? "" : <p className="text-red-500">{errors.email}</p> }
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={newUser.password}
          autoFocus
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />
        { !errors.password ? "" : <p className="text-red-500">{errors.password}</p> }
        <button type="submit" className="bg-indigo-600 text-white font-semibold px-8 py-2 rounded-lg">
          {params.id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  )
}

