import React from 'react'

export default function loading() {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className='flex flex-col items-center px-4 py-2 text-white'>
        <svg className="mr-3 h-5 w-10" width="120" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#fff">
          <circle cx="15" cy="15" r="15">
            <animate attributeName="r" from="15" to="15"
              begin="0s" dur="0.8s"
              values="15;9;15" calcMode="linear"
              repeatCount="indefinite" />
            <animate attributeName="fill-opacity" from="1" to="1"
              begin="0s" dur="0.8s"
              values="1;.5;1" calcMode="linear"
              repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="15" r="9" fillOpacity="0.3">
            <animate attributeName="r" from="9" to="9"
              begin="0s" dur="0.8s"
              values="9;15;9" calcMode="linear"
              repeatCount="indefinite" />
            <animate attributeName="fill-opacity" from="0.5" to="0.5"
              begin="0s" dur="0.8s"
              values=".5;1;.5" calcMode="linear"
              repeatCount="indefinite" />
          </circle>
          <circle cx="105" cy="15" r="15">
            <animate attributeName="r" from="15" to="15"
              begin="0s" dur="0.8s"
              values="15;9;15" calcMode="linear"
              repeatCount="indefinite" />
            <animate attributeName="fill-opacity" from="1" to="1"
              begin="0s" dur="0.8s"
              values="1;.5;1" calcMode="linear"
              repeatCount="indefinite" />
          </circle>
        </svg>
        {/* <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> */}
        Cargando...
      </div>
    </div>
  )
}
