'use client'

import { useEffect, useRef } from "react"

export default function ModalDialog({ open, close, children }) {
    const ref = useRef(null)
    useEffect(() => {
        const handleOutsideClick = (e) => {
            // console.log(ref.current)
            // console.log(e.target)
            if (ref.current===e.target) {
                console.log("ajale!")
                close()
            }
        }
        window.addEventListener("mousedown", handleOutsideClick)

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [ref])
    return (
        <div className={`relative z-10 ${!open ? "hidden" : ""}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-950 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto mx-auto">
                <div ref={ref} className="flex min-h-full items-end  p-4 sm:items-center sm:p-0">
                    {children}                   
                </div>
            </div>
        </div>
    )
}
