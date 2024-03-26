import React, { useState } from "react";
import PowerSwitch from "../../components/PowerSwitch";
import FormControlLabel from "@mui/material/FormControlLabel";


const HumanDetection = () => {

  return (
    <div className="w-[1300px] h-auto flex flex-col gap-6">
      
      <div className="w-full h-[400px] flex flex-row gap-6">
        <div className="w-[860px] h-[540px] flex flex-col px-3 py-5">
          
        </div>
       
        <div className="w-[420px] h-[400px] border-4 border-gray-300 bg-white rounded-xl px-9 py-8">
          <div className="w-full h-full flex flex-col justify-start items-start gap-4">
            <div className="w-auto h-[80px] flex justify-center items-center  bg-gray-200 rounded-3xl text-black text-2xl font-bold px-6 py-3">
              Power
            </div>
            <h1 className="text-black font-bold text-2xl ml-4">
              Write something here
            </h1>
            <h2 className="text-black font-semibold text-xl ml-4">
              Write something here
            </h2>
            <div className="w-full h-auto mt-[90px] flex justify-end items-center">
              <FormControlLabel
                control={<PowerSwitch sx={{ m: 1 }} defaultChecked />}
              />
            </div>

          
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default HumanDetection;
