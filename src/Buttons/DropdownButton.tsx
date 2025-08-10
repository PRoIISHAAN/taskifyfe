import { DownArrow } from "../Icons/DownArrow";

export function DropdownButton({text,onclick}){
    return(
        <div onClick={onclick} className="flex cursor-pointer items-center justify-center mx-3">
            <div className="text-[15px] font-medium">{text}</div>
            <div className="mx-2 "><DownArrow></DownArrow></div>
        </div>
    )
}