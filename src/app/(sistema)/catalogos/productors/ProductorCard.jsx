import ModalDialog from "@/components/ModalDialog"
import { useProductors } from "./ProductorsContext"
import { useState } from "react"

export default function ProductorCard({ open, close }) {
    const { productor, setProductor } = useProductors()
    const [selectedImage, setImagen] = useState()
    const [selectedFile, setFile] = useState()
    const [uploading, setUploading] = useState(false)
    const handleClose = () => {
        setImagen(null)
        setFile(null)
        close()
    }
    return (
        <ModalDialog open={open} close={handleClose}>
            {!productor ? null :
                <div className="flex w-[70%] bg-gray-700 mx-auto p-6" >
                    <div className="basis-1/4">
                        <div>
                            <label className="flex flex-col gap-2">
                                <input type="file"
                                    hidden
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            const file = e.target.files[0]
                                            setImagen(URL.createObjectURL(file))
                                            setFile(file)

                                        }
                                    }} />
                                <div className="w-40 h-50 aspect-video justify-center cursor-pointer border-2  border-dashed">
                                    {selectedImage ?
                                        <img src={selectedImage} alt="" />
                                        :
                                        <p className="text-center">no hay imagen</p>
                                    }
                                </div>

                                <button 
                                    disabled={uploading}
                                    className="botonborde py-0 w-full"
                                >
                                    { uploading? "Subiendo..." : "Subir" }
                                </button>
                            </label>
                        </div>
                    </div>
                    <div className="basis-3/4 flex gap-2">
                        <div className="basis-1/3">
                            <div className="text-xs text-gray-500">nombre:</div>
                            <div className="border px-2 py-1 rounded-md border-gray-800">{productor.nombre}</div>
                        </div>
                        <div className="basis-1/3">
                            <div className="text-xs text-gray-500">eMail</div>
                            <div className="border px-2 py-1 rounded-md border-gray-800">{productor.email}</div>
                        </div>
                        <div className="basis-1/3">
                            <div className="text-xs text-gray-500">clave</div>
                            <div className="border px-2 py-1 rounded-md border-gray-800">{productor.clave}</div>
                        </div>

                    </div>
                </div>
            }
        </ModalDialog>
    )
}
