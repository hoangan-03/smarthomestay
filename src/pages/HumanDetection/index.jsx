import React, { useState } from "react";
import PowerSwitch from "../../components/PowerSwitch";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./humandetection.css"
import noficationdata from "../../components/NoficationData";
const rowsToDisplay = noficationdata;
const HumanDetection = () => {
  return (
    <div className="w-[1300px] h-auto flex flex-col gap-6">
      <div className="w-full h-auto flex flex-row  gap-6">
        <div className="w-[760px] h-[540px] bg-white flex  flex-col px-16 py-9">
          <div className="text-start border-b-2  text-black font-bold text-2xl pb-4 h-auto">
            Nofication
          </div>
          <div className="scroll h-[625px] w-auto overflow-y-scroll text-base tracking-wide">
            <table className="w-full table-fixed whitespace-nowrap">
              <thead className="sticky top-0 bg-blue-200 ">
                <tr className="roboto border-b text-left font-bold text-black">
                  <th className="w-[25%] px-4 py-3">Date</th>
                  <th className="w-[20%] px-4 py-3">Time</th>
                  <th className="w-[30%] px-4 py-3 text-center">State</th>
                  <th className="flex  justify-center px-4 py-3"></th>
                  <th className=" px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="roboto h-auto divide-y w-full font-bold text-black ">
                {rowsToDisplay.map((row, index) => (
                  <tr key={index}>
                    <td className="w-[30%] px-4 py-3">{row.date}</td>
                    <td className="w-[30%] px-4 py-3">{row.time}</td>

                    <td className="w-full max-w-[200px]">
                      <div className="flex items-center justify-center">
                        <h2
                          className={`flex w-fit items-center justify-center rounded-2xl px-3 py-1 text-base  font-normal text-white ${
                            row.state ? "   bg-green-700" : "  bg-red-700 "
                          }`}
                        >
                          {row.state ? "Human presence" : "Human absence"}
                        </h2>
                      </div>
                    </td>
                    <td className="px-4 py-3"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
