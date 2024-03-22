'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import ModalDialog from '@/components/ModalDialog'
import { useMenu } from './MenuContext'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useCategorias } from './CategoriasContext'
import CrearCategoria from './CrearCategoria'
export default function CrearPlato({database}) {
  const { crearPlato } = useMenu()
  const { categorias, } = useCategorias()
  const [open, setOpen] = useState(false)
  const [openCat, setOpencat] = useState(false)

  // DATOS DEL PLATO
  const [nombre, setNombre] = useState("")
  const [categoria, setCategoria] = useState("")
  useEffect(()=>{
    if(categoria==="NEW"){
      return setOpencat(true)
    }
  },[categoria])
  const [subcategoria, setSubCategoria] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [precio, setPrecio] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState([])

  const clearFields = () => {
    setNombre("")
    setCategoria("")
    setSubCategoria("")
    setDescripcion("")
    setPrecio(0)
    setSelectedFiles([])
  }

  const close = () => {
    setOpen(false)
  }

  const ref = useRef(null)
  const doClose = useCallback(() => {
    close()
    return;

  }, [])
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // console.log(ref.current)
      // console.log(e.target)
      if (!ref.current.contains(e.target)) {
        doClose()
      }
    }
    window.addEventListener("mousedown", handleOutsideClick)

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [ref, doClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.set('database', database);
    formData.set('nombre', nombre);
    formData.set('categoria', categoria);
    formData.set('subcategoria', subcategoria);
    formData.set('descripcion', descripcion);
    formData.set('precio', precio);
    selectedFiles.forEach(file => {
      formData.append('file', file);
    });

    crearPlato(formData).then(res => {
      // console.log(res)
      toast.success(res.message)
      clearFields()
      close()
    }).catch(err => {
      console.log(err)
    })

  }

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    const filesArray = Array.from(fileList);
    // console.log(filesArray)
    setSelectedFiles(filesArray);
  }

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Images uploaded successfully.');
        // Aquí puedes manejar la respuesta del servidor, si es necesario
      } else {
        console.error('Failed to upload images.');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  return (
    <>
      <button className='botonborde' onClick={() => setOpen(!open)}>Crear Plato</button>
      <ModalDialog open={open} close={close}>
        <div className='overflow-scroll'>
          <form ref={ref} className='form' onSubmit={handleSubmit}>
            <h1 className='titulo'>Nuevo Plato</h1>
            <label className='text-gray-400' htmlFor='nombre'>Nombre del plato</label>
            <input id="nombre" name="nombre"
              className='inputbasico mt-0'
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} />

            <label className='text-gray-400' htmlFor='categoria'>Categoría</label>
            <select id="categoria" name="categoria"
              className='inputbasico mt-0'
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)} >
                <option></option>
              {categorias.length > 0 ?
                categorias.map(categoria => (
                  <option key={categoria._id} value={categoria.nombre}>{categoria.nombre}</option>
                ))
                : null}
              <option value="NEW">Agregar categoría...</option>
            </select>
            <CrearCategoria database={database} open={openCat} close={()=>setOpencat(false)}/>

            <label className='text-gray-400' htmlFor='subcategoria'>Sub Categoría</label>
            <select id="subcategoria" name="subcategoria"
              className='inputbasico mt-0'
              value={subcategoria}
              onChange={(e) => setSubCategoria(e.target.value)} >
              <option>Ninguna</option>
              <option>Agregar Sub Categoría...</option>
            </select>

            <label className='text-gray-400' htmlFor='descripcion'>Descripción</label>
            <textarea id="descripcion" name="descripicion"
              rows="5"
              className='inputbasico mt-0'
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)} />

            <label className='text-gray-400' htmlFor='precio'>Precio</label>
            <input id="precio" name="precio"
              type="number"
              step="any"
              className='inputbasico mt-0'
              value={precio}
              onChange={(e) => setPrecio(e.target.value)} />

            <input name="files"
              type="file"
              className='flex flex-row py-3'
              accept="image/*"
              onChange={handleFileChange} />
            <div>
              {selectedFiles.map((file, index) => (
                <div key={index}>
                  <h4>{file.name}</h4>
                  <img src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                </div>
              ))}
            </div>
            <button type="submit" className='botonform'>Guardar</button>
          </form>
        </div>
      </ModalDialog>
    </>
  )
}
