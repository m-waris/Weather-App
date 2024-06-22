"use client"

import { ChangeEvent } from "react"

type listType = {
    name: string,
    lat: number,
    lon: number,
}

type props = {
    search: string,
    list: Array<listType>,
    onOptionSelect: (option: listType) => void,
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Search ({
    search,
    list,
    onOptionSelect,
    onInputChange

}: props
): JSX.Element {
  
    return (
 
            <>   
            
            <input
                type="search"
                name="search"
                placeholder='Search Location'
                className='  py-4 px-8 border-none text-white bg-[#22222F] w-full'
                onChange={onInputChange}
                value={search}
            />
            {list.length > 0 && (
                <ul className='absolute top-16 left-0 right-0  bg-[#22222F] rounded-md shadow-lg'>
                    {list.map((option:listType , index:number) => (
                        <li key={index} className='w-full'>
                            <button
                                className='w-full py-4 px-8 text-left text-white hover:bg-[#333344] focus:bg-[#333344]'
                                onClick={() => onOptionSelect(option)}
                            >
                                {option.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            </>
   
    )
}
