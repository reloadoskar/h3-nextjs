import NavItem from "@/app/(sistema)/NavItem";

export default function Dropdown({titulo, icon, items=[]}) {
    return (
        <div className="group inline-block">
            <button
                className="outline-none focus:outline-none px-3 py-2 flex items-center w-full gap-4"
            >
                {icon}
                <span className="font-medium">{titulo}</span>
                <span>
                    <svg
                        className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                    </svg>
                </span>
            </button>
            <ul
                className="bg-gray-900 rounded-sm pl-10 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top w-full"
            >
                {items.length === 0 ? null : items.map(itm=>(
                    <NavItem key={itm.linkto} text={itm.text} linkto={itm.linkto} icon={itm.icon} goTo={itm.goTo}/>
                ))
                }
            </ul>
        </div>
    )
}

// <style>
//   /* since nested groupes are not supported we have to use
//      regular css for the nested dropdowns
//   */
//   li>ul                 { transform: translatex(100%) scale(0) }
//   li:hover>ul           { transform: translatex(101%) scale(1) }
//   li > button svg       { transform: rotate(-90deg) }
//   li:hover > button svg { transform: rotate(-270deg) }

//   /* Below styles fake what can be achieved with the tailwind config
//      you need to add the group-hover variant to scale and define your custom
//      min width style.
//   	 See https://codesandbox.io/s/tailwindcss-multilevel-dropdown-y91j7?file=/index.html
//   	 for implementation with config file
//   */
//   .group:hover .group-hover\:scale-100 { transform: scale(1) }
//   .group:hover .group-hover\:-rotate-180 { transform: rotate(180deg) }
//   .scale-0 { transform: scale(0) }
//   .min-w-32 { min-width: 8rem }
// </style>