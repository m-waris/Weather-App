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
                className=' mt-10 py-[12px] px-[28px] border-none rounded-[8px] bg-[#22222F] w-full'
                onChange={onInputChange}
                value={search}
            />
            {list.length > 0 && (
                <ul className='absolute top-24  left-0 right-0 shadow-lg rounded-[8x]'>
                    {list.map((option:listType , index:number) => (
                        <li key={index} className='w-full bg-[#3B3B54]  border-[#1E1E29] border-b-2'>
                            <button
                                className='w-full py-4 px-8 text-left hover:bg-[#333344] focus:bg-[#333344]'
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
