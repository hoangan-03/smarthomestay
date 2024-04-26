import React from 'react'
import modeicon from '../../assets/icons/modeicon.png';
import bellicon from '../../assets/icons/bellicon.png';
import avataricon from '../../assets/icons/avataricon.png';
import bellicon_dark from '../../assets/icons/bellicon_dark.png';
import darkmode from '../../assets/icons/darkmode.png';
import { useData } from '../DataProvider';
const Header = ({setToggleDarkMode}) => {
    const {toggleDarkMode} = useData()

    return (
        <div className={`flex justify-end gap-8 h-20 pr-10 items-center w-full shadow-custom-shadow bg-[var(--bg-head-foot-item)]`}>
            <img className='cursor-pointer' src={!toggleDarkMode ? modeicon : darkmode} alt="mode" width={18} height={18} onClick={() => setToggleDarkMode(prev => !prev)}/>
            <img className='cursor-pointer' src={!toggleDarkMode ? bellicon : bellicon_dark} alt="bell" width={18} height={18}/>
            <img className='cursor-pointer' src={avataricon} alt="avatar" width={45} height={45}/>
        </div>
    )
}

export default Header