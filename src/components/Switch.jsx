
export default function Switch({value, action}) {
    return (
        <label htmlFor="switch" className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100">
            {/* <span>Left</span> */}
            <span className="relative">
                <input id="switch" type="checkbox" className="hidden peer" checked={value} onChange={action}/>
                <div className="w-10 h-6 rounded-full shadow-inner dark:bg-gray-600 peer-checked:dark:bg-teal-400"></div>
                <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-gray-800"></div>
            </span>
            {/* <span>Right</span> */}
        </label>
    )
}
