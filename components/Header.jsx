import { useGlobal } from '@/global/GlobalContext';
import React,{useState, useEffect} from 'react'

const Header = () => {
    const {setNightMode, isNightMode, setLogin} = useGlobal()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearchFocus, setIsSearchFocus] = useState(false)
    const [inputValue, setInputValue] = useState('');
    let timeout
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };
    
      const clearInput = () => {
        setInputValue('');
      };

  return (
    <header className={`${isNightMode ? 'bg-[#252927]  text-white' : 'bg-white text-black'} w-full h-20 fixed flex justify-between items-center p-5 px-24 `}>
        <div className="flex flex-row items-center gap-1">
            <i className="bi bi-currency-bitcoin text-3xl bg-green-500 p-2 rounded-md"></i>
            <p className="text-2xl font-bold font-serif">Crypto~Art</p>
        </div>
        <div className={`${isSearchFocus && 'border-2 border-white'} flex flex-row items-center justify-center bg-[#9e8c8c25] duration-200 hover:bg-[#9e8c8c75] p-2 w-96 overflow-hidden rounded-md`}>
            <i className="bi bi-search"></i>
            <input className="outline-none p-2 bg-transparent w-80" onChange={handleInputChange} value={inputValue} type="text" onFocus={()=>setIsSearchFocus(true)} onBlur={() => setIsSearchFocus(false)} placeholder="Search"/>
            {inputValue ? 
            <i className=" rounded-md bg-[#cfc3c322] text-lg px-2 shadow-lg cursor-pointer bi bi-x" onClick={clearInput}></i>
            :
            <i className=" rounded-md bg-[#cfc3c322] text-lg px-2 shadow-lg">/</i>
            }
        </div>
        <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row p-2 px-3 gap-1 bg-[#9e8c8c25] duration-200 hover:bg-[#9e8c8c75] rounded-md font-bold cursor-pointer" onClick={setLogin}>
                <i className="bi bi-wallet text-lg"></i>
                <p className="text-lg">Login</p>
            </div>
            <div className="p-2 bg-[#9e8c8c25] duration-200 hover:bg-[#9e8c8c75] rounded-md px-3 cursor-pointer relative focus:outline-none"
            onMouseEnter={() => {
                clearTimeout(timeout)
                setIsDropdownOpen(true)
            }
            }
            onMouseLeave={() => {
                timeout = setTimeout(() => {
                    setIsDropdownOpen(false);
                }, 100);
            }
            }
            >
                {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-60 p-3 bg-[#9e8c8c75] rounded shadow-lg transition-all duration-300 delay-100" onMouseEnter={()=>clearTimeout(timeout)}>
                    <ul className=''>
                        <li className="py-2 px-4 hover:bg-[#9e8c8c] cursor-pointer flex flex-row items-center gap-3 font-bold rounded-md ">
                            <i className='bi bi-person font-bold text-xl'></i>
                            <p>Profile</p>
                        </li>
                        <li className="py-2 px-4 hover:bg-[#9e8c8c] cursor-pointer flex flex-row items-center gap-3 font-bold rounded-md ">
                            <i className='bi bi-eye font-bold text-xl'></i>
                            <p>Watchlist</p>
                        </li>
                        <hr className='my-2' />
                        <li className="py-2 px-4 hover:bg-[#9e8c8c] cursor-pointer flex flex-row items-center gap-3 font-bold rounded-md ">
                            <i className='bi bi-gear font-bold text-xl'></i>
                            <p>Settings</p>
                        </li>  
                         <li className="py-2 px-4 hover:bg-[#9e8c8c] cursor-pointer flex flex-row items-center gap-3 font-bold rounded-md ">
                            <i className='bi bi-moon font-bold text-xl'></i>
                            <p>Night Mode</p>
                            <i className={`bi ${isNightMode ? 'bi-toggle-on' : 'bi-toggle-off'} font-bold text-3xl text-blue-500 ms-3 hover:text-blue-700`} onClick={()=>setNightMode()}></i>
                        </li>                        
                    </ul>
                    </div>
                )}
                <i className="bi bi-person-circle text-lg"></i>
            </div>
            <div className="p-2 bg-[#9e8c8c25] duration-200 hover:bg-[#9e8c8c75] rounded-md px-3 cursor-pointer">
                <i className="bi bi-cart3 font-bold text-lg"></i>
            </div>
        </div>
        </header>
  )
}

export default Header