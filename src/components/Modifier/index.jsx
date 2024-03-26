import React, { useState } from "react";
import data from "../Constant";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import analytic from "../../assets/images/analytic.png";
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 72,
  height: 30,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(42px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#2940b3",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#352074",
      border: "16px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 25,
    height: 25,
  },
  "& .MuiSwitch-track": {
    borderRadius: 30 / 2,
    backgroundColor: "#27272b",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const Modifier = (variable) => {
  const [acceptanceRange, setAcceptanceRange] = useState(50);
  const thisvar = {
    value:
      variable.variable === "temperature" ? data.temperature : data.lightlevel,
  };
  const handleChange = (acceptanceRange) => setAcceptanceRange(acceptanceRange);

  return (
    <div className="w-[1300px] h-auto flex flex-col gap-6">
      <div className="w-[420px] h-[175px] rounded-xl border-4 border-gray-300 bg-white py-[30px] px-[25px] flex flex-row  justify-between items-center">
        <div className="w-auto h-full flex flex-col justify-center items-start gap-3">
          <h1 className="text-black text-4xl">{thisvar.value.text}</h1>
          <h2 className="text-blue-700 text-5xl font-bold">
            {thisvar.value.mockFigure}
          </h2>
        </div>
        <img
          className="w-auto h-[100px] object-cover"
          src={thisvar.value.iconUrl}
          alt=""
        ></img>
      </div>
      <div className="w-full h-[400px] flex flex-row gap-6">
        <div className="w-[420px] h-[400px] border-4 border-gray-300 bg-white rounded-xl px-9 py-8">
          <div className="w-full h-full flex flex-col justify-start items-start gap-4">
            <div className="w-auto h-[80px] flex justify-center items-center  bg-gray-200 rounded-3xl text-black text-2xl font-bold px-6 py-3">
              Acceptance range
            </div>
            <h1 className="text-black font-bold text-2xl ml-4">
              Write something here
            </h1>
            <h1 className="text-black font-semibold text-xl ml-4">
              Write something here
            </h1>
            <div className="w-full h-auto mt-[90px]">
              <Box sx={{ width: 320 }}>
                <Slider
                  value={acceptanceRange}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  onChange={(e, newValue) => handleChange(newValue)}
                />
              </Box>
            </div>
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
                control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              />
            </div>
          </div>
        </div>

        <div className="relative w-[420px] h-[400px] border-4 border-gray-300 bg-white rounded-xl">
          <img
            className="w-full h-full object-cover"
            src={analytic}
            alt=""
          ></img>
          <div className="absolute bottom-0 h-[127px] w-full flex flex-col py-4 px-7 gap-3 justify-center items-start bg-black/80 backdrop-blur-lg">
            <h1 className="text-white font-bold text-2xl ml-4">Analytics</h1>
            <h2 className="text-white font-semibold text-xl ml-4">
              Write something here
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modifier;
