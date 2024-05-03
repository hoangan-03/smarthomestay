import React from 'react'
import {Link} from "@mui/material"
const Footer = () => {
  return (
    <footer className="w-screen h-14 z-100 fixed bottom-0 left-0 pl-[120px] pr-[80px] flex justify-between bg-[var(--bg-head-foot-item)] items-center">
        <p className='text-[1.2vw] font-medium text-[var(--text-normal)]'>Group CC01_CNPM_7</p>
        <div className='flex gap-16'>
            <p className='text-[1.2vw] font-medium text-[var(--text-normal)]'>© 2024 Smart Homestay</p>
            <Link sx={{textDecoration: "none", color: "black"}} href="https://github.com/hoangan-03/smarthomestay" target="_blank">
                <p className='text-[1.2vw] no-underline font-medium text-[var(--text-normal)]'>Github</p>
            </Link>
            <Link sx={{textDecoration: "none", color: "black"}} href="https://github.com/hoangan-03/smarthomestay">
            <p className='text-[1.2vw] no-underline font-medium text-[var(--text-normal)]'>Contact</p>
            </Link>
            <Link sx={{textDecoration: "none", color: "black"}} href="https://github.com/hoangan-03/smarthomestay">
            <p className='text-[1.2vw] no-underline font-medium text-[var(--text-normal)]'>Report</p>
            </Link>
        </div>
    </footer>
  )
}

export default Footer