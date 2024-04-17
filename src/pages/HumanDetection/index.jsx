import React from "react";
import { useState } from "react";
import "./humandetection.css"
import noficationdata from "../../components/NoficationData";
import DeleteIcon from '@mui/icons-material/Delete';
import PowerSwitch from "../../components/PowerSwitch";
import AlertDialog from "../../components/AlertDialog";
import { FormControlLabel } from "@mui/material";
// import handle from "mqtt/lib/handlers/index";
const HumanDetection = (props) => {
  const [rowsToDisplay, setRowsToDisplay] = useState(noficationdata);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openDetection, setOpenDetection] = useState(false);
  const [stateDetection, setStateDetection] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null)
  const { setOpenAlert, setAlertSeverity, setAlertMessage } = props;

  const handleDetectionChange = () => {
    if (stateDetection) {
      setOpenDetection(true)
    }
    else setStateDetection((prev) => !prev)
  }

  const handleConfirmDetection = () => {
    // Check if the detection is turned off successfully
    setStateDetection((prev) => !prev)
    setOpenDetection(false)
    setOpenAlert(true)
    setAlertSeverity("success")
    setAlertMessage("Detection has been turned off successfully")
  }

  const handleCloseDetection = () => {
    setOpenDetection(false)
  }

  const handleDelete = (index) => {
    setDeleteIndex(index)
    setOpenAlertDialog(true)
  };
  const handleConfirmDelete = () => {
    // Needs to be implemented later
    if (deleteIndex !== null) {
      // Create a new array by filtering out the element at the specified index
      const updatedRows = rowsToDisplay.filter((_, i) => i !== deleteIndex);
      // Update the state with the new array
      setRowsToDisplay(updatedRows);
    }
    setOpenAlertDialog(false); // Close the AlertDialog
    setDeleteIndex(null); // Reset the deleteIndex state
    setOpenAlert(true)
    setAlertSeverity("success")
    setAlertMessage("Notification has been removed successfully")
  }
  const handleCancelDelete = () => {
    setOpenAlertDialog(false); // Close the AlertDialog
    setDeleteIndex(null); // Reset the deleteIndex state
  }


  return (
    <div className="w-full h-auto flex flex-col gap-6">
      <div className="w-full h-auto flex flex-row  gap-6">
        <div className="w-full border-4 border-lightgray rounded-2xl min-h-[550px] h-[calc(100vh-200px)] bg-white flex  flex-col px-16 py-5 ">
          <div className="text-start border-b-2  text-black font-bold text-2xl pb-4 h-auto flex justify-between">
            Nofication
            <div className="flex items-center gap-5">
              <p>Set Detection</p>
              <FormControlLabel
                  control={
                    <PowerSwitch
                      defaultChecked
                      checked={stateDetection}
                      onClick={handleDetectionChange}
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
                  <th className="w-[25%] px-4 py-3">Date</th>
                  <th className="w-[25%] px-4 py-3">Time</th>
                  <th className="w-[25%] px-4 py-3 text-center">State</th>
                  <th className="w-[25%] px-4 py-3 text-center">Remove</th>
                  <th className="flex  justify-center px-4 py-3"></th>
                  <th className=" px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="roboto h-auto divide-y w-full font-bold text-black">
                {rowsToDisplay.map((row, index) => (
                  <tr key={index}>
                    <td className="w-[25%] px-4 py-3">{row.date}</td>
                    <td className="w-[25%] px-4 py-3">{row.time}</td>

                    <td className="w-full max-w-[200px]">
                      <div className="flex items-center justify-center">
                        <h2
                          className={`flex w-fit items-center justify-center rounded-2xl px-3 py-1 text-base  font-normal text-white ${row.state ? "   bg-green-700" : "  bg-red-700 "
                            }`}
                        >
                          {row.state ? "Human presence" : "Human absence"}
                        </h2>
                      </div>
                    </td>
                    <td className="w-[full] h-[50px] flex justify-center items-center">
                      <DeleteIcon onClick={() => handleDelete(index)} className="text-red-700 cursor-pointer" />
                    </td>

                    
                    <td className="px-4 py-3"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AlertDialog title={"Remove Confirm"} description={"Do you want to remove this notification?"} open={openAlertDialog} handleClose={handleCancelDelete} handleConfirm={handleConfirmDelete}/>

        <AlertDialog title={"Turn Off Detection Confirm"} description={"Disabling this feature may compromise the security of your system. Are you sure you want to proceed with disabling it?"} open={openDetection} handleClose={handleCloseDetection} handleConfirm={handleConfirmDetection}/>
      </div>
    </div>
  );
};

export default HumanDetection;
