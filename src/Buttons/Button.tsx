export function Button({text, onclick, href}){
        return(
            <a href={href}>
            <div onClick={onclick} className="flex cursor-pointer items-center justify-center  mx-3 mr-6">
                <div className="text-[15px]">{text}</div>
            </div>
            </a>
        )
    }