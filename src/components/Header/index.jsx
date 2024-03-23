import React from 'react'
import "./header.css"
import modeicon from '../../assets/icons/modeicon.png';
import bellicon from '../../assets/icons/bellicon.png';
import avataricon from '../../assets/icons/avataricon.png';
const Header = () => {
    return (
        <div className='header'>
            <img src={modeicon} alt="mode" width={18} height={18} />
            <img src={bellicon} alt="bell" width={18} height={18}/>
            <img src={avataricon} alt="avatar" width={45} height={45}/>
        </div>
    )
}

export default Header