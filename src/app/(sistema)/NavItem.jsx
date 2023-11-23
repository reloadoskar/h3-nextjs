import { usePathname, useRouter } from "next/navigation"

export default function NavItem({ text, linkto, icon, goTo}) {
    const pathname = usePathname()
    
    const active = pathname === linkto ? true: false

    
    return (
        <li className="">
            <button onClick={()=>goTo(linkto)} className={`
                flex items-center gap-4 w-full
                py-2 px-3 my-1 font-medium 
                cursor-pointer 
                transition-colors group 
                ${active
                    ? "bg-gradient-to-tr from-gray-700 to-gray-400 text-gray-100"
                    : "hover:bg-gray-700 text-gray-400"
                }
            `}>
                {icon}
                <span>{text}</span>
            </button>
        </li>
    )
}
