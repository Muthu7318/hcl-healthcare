import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { shiftService } from "../services/shiftService";
import SimpleLayout from "../pages/simpleLayout";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const ViewAllShiftTable = () => {
  const [allStaffDetails, setAllStaffDetails] = useState([]);
  const [staffDetails, setStaffDetails] = useState([]);

  const [selectedStaff, setSelectedStaff] = useState("select");
  const [selectedTechnician, setSelectedTechnician] = useState("select");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedShift, setSelectedShift] = useState("");
  const [allShifts, setAllShifts] = useState([]);

  const getAllShifts = async (userid) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/shifts/getShiftById",
        { userid },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // console.log("All shifts fetched successfully:", response.data);
      if (response.status === 200) {
        setAllShifts(response.data.data);
        if (response.data.data.length === 0) {
          alert("No shifts found for the selected staff.");
        }
        console.log("All Shifts", response.data.data);

        // console.log("All Shifts", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching all shifts:", error);
    }
  };
  useEffect(() => {
    // getAllShifts("");
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/staff/readStaff",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      //   console.log("User data fetched successfully:", response.data);

      if (response.status === 200) {
        // setTechnicianDetails([...department]);
        // console.log(console.log("Technician Details", [...department]));
        setAllStaffDetails(response.data.data);
        setStaffDetails(response.data.data);
        console.log(response.data.data);

        // console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <SimpleLayout>
      <div
        style={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          padding: 20,
          alignSelf: "center",
        }}
      >
        <span style={{ marginTop: 20 }}>Select Date</span>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            //   label="Select D"
            //   value={}
            onChange={(v) => setSelectedDate(v)}
            value={selectedDate}
          />
        </LocalizationProvider>
        {/* <span style={{ marginTop: 20 }}>Select Department</span>
      <Select
        labelId="technician-select-label"
        id="technician-select"
        value={selectedTechnician}
        // label={"Select Department"}
        onChange={(event) => {
          setSelectedTechnician(event.target.value);
          setStaffDetails(
            allStaffDetails.filter((staff) => staff.role === event.target.value)
          );
          console.log(
            allStaffDetails.filter((staff) => staff.role === event.target.value)
          );

          if (selectedTechnician === "select") {
            setStaffDetails([]);
          }
        }}
      >
        <MenuItem key={0} value={"select"}>
          {"Select Department"}
        </MenuItem>
        {technicianDetails.map((techinician) => (
          <MenuItem key={techinician} value={techinician}>
            {techinician}
          </MenuItem>
        ))}
      </Select> */}
        <span style={{ marginTop: 20 }}>Select Staff</span>
        <Select
          labelId="staff-select-label"
          id="staff-select"
          value={selectedStaff}
          // label="Select Staff"
          onChange={(event) => {
            setSelectedStaff(event.target.value);
            getAllShifts(event.target.value);
          }}
        >
          <MenuItem key={0} value={"select"}>
            {"Select Staff"}
          </MenuItem>
          {allStaffDetails.map((staff) => (
            <MenuItem key={staff.staffId} value={staff.staffId}>
              {staff.name}
            </MenuItem>
          ))}
        </Select>

        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Staff</TableCell>
                <TableCell align="right">Shift</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allShifts.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.staffId}
                  </TableCell>
                  <TableCell align="right">{row.shift}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </SimpleLayout>
  );
};
