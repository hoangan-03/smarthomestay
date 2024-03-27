import React from 'react'
import modeicon from '../../assets/icons/modeicon.png';
import bellicon from '../../assets/icons/bellicon.png';
import avataricon from '../../assets/icons/avataricon.png';
const Header = () => {
    return (
        <div className='flex justify-end gap-8 h-20 pr-10 items-center w-full bg-white shadow-custom-shadow'>
            <img className='cursor-pointer' src={modeicon} alt="mode" width={18} height={18} />
            <img className='cursor-pointer' src={bellicon} alt="bell" width={18} height={18}/>
            <img className='cursor-pointer' src={avataricon} alt="avatar" width={45} height={45}/>
        </div>
    )
}

export default Header