"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Logo from '@/images/logob_h_sola_180.svg'
export default function Login() {
  const [newUser, setNewUser] = useState({
    nombre: "",
    telefono: "",
    email: "",
    dbname: "",
    password: "",
  })
  const {data: session, status} = useSession()
  const router = useRouter();
  useEffect(()=>{
    if(status==="authenticated"){
      router.push('/dashboard')
    }
  },[status])
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    console.log("enviando...")
    await logIn();
  };

  const logIn = async () => {
    try {
      const res = await signIn("credentials", {email:newUser.email, password:newUser.password, dbname:newUser.dbname, redirect: false})
      if(res.error){
        setIsSubmitting(false)
        return setError({...error, signin: res.error })
      } 
        
      if (res?.ok) return router.push("/dashboard");
    } catch (error) {
      setIsSubmitting(false)
      console.error(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-700 py-5 px-12 rounded-md pt-16">
      { !error.signin ? "" : <p className="bg-red-500 text-white p-2 mb-2">{error.signin}</p> }
        <header className="flex justify-between">
          <Image priority={false} alt="logo hadria" src={Logo} width={100}  className="aspect-square mx-auto inset-x-0"/>
        </header>
        {isSubmitting ?
          <h3 className="mx-auto text-center font-bold text-3xl">Enviando...</h3>
          :
          <>
        <input
          type="email"
          placeholder="Correo electrónico"
          name="email"
          onChange={handleChange}
          value={newUser.email}
          autoFocus
          className="bg-gray-800 border-2 w-full p-3 rounded-lg my-4"
        />
        <input
          type="text"
          placeholder="Número de cliente"
          name="dbname"
          onChange={handleChange}
          value={newUser.dbname}
          className="bg-gray-800 border-2 w-full p-3 rounded-lg my-4"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={newUser.password}
          autoFocus
          className="bg-gray-800 border-2 w-full p-3 rounded-lg my-4"
        />
        <button type="submit" className="boton text-white font-semibold px-8 py-2 rounded-lg w-full">
          Enviar
        </button>
          </>
        }
      </form>
    </div>
  )
}

