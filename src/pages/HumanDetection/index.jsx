import { React, useState, useEffect } from "react";
import "./humandetection.css"
import PowerSwitch from "../../components/PowerSwitch";
import AlertDialog from "../../components/AlertDialog";
import { useData } from "../../components/DataProvider";
import { FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getDetectionData } from "../../services/TableApi.service";
import axios from "axios";
import client from "../../mqtt/mqttclient";
const AIO_USERNAME = process.env.REACT_APP_AIO_USERNAME;
const HumanDetection = () => {
  const [openDetection, setOpenDetection] = useState(false);

  const [stateDetection, setStateDetection] = useState(true);

  const [detectionData, setDetectionData] = useState(null);
  const { handleClick, autoMode, getCookie } = useData();

  useEffect(() => {
    client.publish(`${AIO_USERNAME}/feeds/detectorBtn`, stateDetection ? '1' : '0');
  }, [stateDetection]);
  const handleDetectionChange = () => {
    if (stateDetection) {
      setOpenDetection(true)
    }
    else {
      setStateDetection((prev) => !prev)
      handleClick("Detection has been turned on successfully", "success")()
      const control = {
        Dev_id: "humandetect_device_1",
        Room_id: 1,
        Action: "Detection has been turned on successfully",
        Ctrl_mode: "Manual",
        Timestamp: new Date().toISOString(),
        Isviewed: false,
      };
      axios
        .post("https://smart-homestay-backend-f109bac03e4d.herokuapp.com/controlling", control)
        .then((res) => {
          console.log("Log added successfully");
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 400) {
              console.log(err.response.data.error);
            } else if (err.response.status === 500) {
              console.error("Internal Server Response");
            }
          } else {
            console.error(err);
          }
        });
    }
  }

  const handleConfirmDetection = () => {
    setStateDetection((prev) => !prev)
    setOpenDetection(false)
    handleClick("Detection has been turned off successfully", "success")()
    const control = {
      Dev_id: "humandetect_device_1",
      Room_id: 1,
      Action: "Detection has been turned off successfully",
      Ctrl_mode: "Manual",
      Timestamp: new Date().toISOString(),
      Isviewed: false,
    };
    axios
      .post("https://smart-homestay-backend-f109bac03e4d.herokuapp.com/controlling", control)
      .then((res) => {
        console.log("Log added successfully");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            console.log(err.response.data.error);
          } else if (err.response.status === 500) {
            console.error("Internal Server Response");
          }
        } else {
          console.error(err);
        }
      });

  }

  const handleCloseDetection = () => {
    setOpenDetection(false)
  }
  const navigate = useNavigate();


  useEffect(() => {
    const user = getCookie('cookieUser')
    if (!user) {
      navigate('/auth');
    }
  }, [navigate, getCookie]);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const DetecData = await getDetectionData();
      setDetectionData(DetecData);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
  const intervalId = setInterval(fetchData, 500);
  return () => clearInterval(intervalId);
}, []);

  return (
    <div className="w-full h-auto flex flex-col gap-6">
      <div className="w-full h-auto flex flex-row  gap-6">
        <div className="w-full itemContainer min-h-[550px] h-[calc(100vh-200px)]  flex  flex-col px-16 py-5 ">
          <div className="relative text-start border-b-2 text-black font-bold text-2xl pb-4 h-auto flex justify-between ">
            <p className="absolute left-1/2 transform -translate-x-1/2">DETECTION NOFICATION</p>
            <div className="flex items-center gap-5">
              <p>Set Detection</p>
              <FormControlLabel

                  control={
                    <PowerSwitch
                      checked={stateDetection}
                      onClick={handleDetectionChange}
                      disabled={autoMode}
                      // onChange={handleDetectionChange}
                    />
                  }
                />

            </div>
          </div>

          <div className="scroll h-[625px] w-auto overflow-y-scroll text-base tracking-wide">
            <table className="w-full table-fixed whitespace-nowrap">
              <thead className="sticky top-0 bg-blue-200 ">
                <tr className="roboto border-b text-left font-bold text-black">
                  <th className="w-[35%] px-4 py-3 text-center">Date</th>
                  <th className="w-[35%] px-4 py-3 text-center">Time</th>
                  <th className="w-[30%] px-4 py-3 text-center">State</th>
                </tr>
              </thead>
              <tbody className="roboto h-auto divide-y w-full font-bold text-black">
              {detectionData && [...detectionData].reverse().map((row, index) => (
                  <tr key={index}>
                    <td className="w-[35%] px-4 py-3 text-center"><p>{row.timestamp.substring(0, 10)}</p></td>
                    <td className="w-[35%] px-4 py-3 text-center"><p>{row.timestamp.substring(11, 19)}</p></td>

                    <td className="w-full max-w-[200px]">
                      <div className="flex items-center justify-center">
                        <h2
                          className={`flex w-fit items-center justify-center rounded-2xl px-3 py-1 text-base  font-normal text-white ${row.value === "human detected" ? "bg-green-700" : "bg-red-700 "
                            }`}
                        >
                          <p style={{ color: "white" }}>{row.value === "human detected" ? "Human presence" : "Human absence"}</p>
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



        <AlertDialog title={"Turn Off Detection Confirm"} description={"Disabling this feature may compromise the security of your system. Are you sure you want to proceed with disabling it?"} open={openDetection} handleClose={handleCloseDetection} handleConfirm={handleConfirmDetection} />
      </div>
    </div>
  );
};

export default HumanDetection;
