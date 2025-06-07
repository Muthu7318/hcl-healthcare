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

export const CreateShift = () => {
  const [allStaffDetails, setAllStaffDetails] = useState([]);
  const [staffDetails, setStaffDetails] = useState([]);
  const [technicianDetails, setTechnicianDetails] = useState([]);

  const [selectedStaff, setSelectedStaff] = useState("select");
  const [selectedTechnician, setSelectedTechnician] = useState("select");
  const [staffShift, setStaffShift] = useState({});
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedShift, setSelectedShift] = useState("");

  const createShift = async () => {
    if (selectedStaff === "select" || selectedTechnician === "select") {
      alert("Please select both staff and technician.");
      return;
    }
    if (selectedShift === "") {
      alert("Please select a shift.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/shifts/createShift",
        {
          staffId: selectedStaff,
          date: selectedDate.format("YYYY-MM-DD"),
          shift: selectedShift,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Here you would typically send the data to your backend
      if (response.status === 201) {
        alert("Shift created successfully!");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error creating shift:", error);
      alert("Shift already exists for this staff on this date.");
      return;
    }

    // Reset the form after submission
    setSelectedStaff("select");
    setSelectedTechnician("select");
    setSelectedDate(dayjs());
    setSelectedShift("");
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/staff/readStaff"
      );
      //   console.log("User data fetched successfully:", response.data);

      if (response.status === 200) {
        let department = new Set([
          ...response.data.data.map((staff) => staff.role),
        ]);

        setTechnicianDetails([...department]);
        console.log(console.log("Technician Details", [...department]));
        setAllStaffDetails(response.data.data);
        setStaffDetails(response.data.data);

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
        }}
      >
        <MenuItem key={0} value={"select"}>
          {"Select Staff"}
        </MenuItem>
        {staffDetails.map((staff) => (
          <MenuItem key={staff.staffId} value={staff.staffId}>
            {staff.name}
          </MenuItem>
        ))}
      </Select>

      {selectedStaff !== "select" &&
        selectedTechnician !== "select" &&
        selectedDate !== "" && (
          <div
            style={{
              textAlign: "center",
              justifyItems: "center",
              marginTop: 20,
            }}
          >
            <span>Available Slots</span>
            <div
              style={{
                width: "300px",
                // backgroundColor: "red",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <div
                style={{
                  height: 100,
                  border: "1px solid black",
                  backgroundColor: selectedShift === "Morning" ? "#f58c84" : "",
                  //   backgroundColor: "blue",
                  //   width: "280px",
                }}
                onClick={() => setSelectedShift("Morning")}
              >
                <span>Morning</span>
              </div>
              <div
                style={{
                  height: 100,
                  border: "1px solid black",
                  backgroundColor:
                    selectedShift === "Afternoon" ? "#f58c84" : "",
                }}
                onClick={() => setSelectedShift("Afternoon")}
              >
                <span>Afternoon</span>
              </div>
              <div
                style={{
                  height: 100,
                  border: "1px solid black",
                  backgroundColor: selectedShift === "Night" ? "#f58c84" : "",
                }}
                onClick={() => setSelectedShift("Night")}
              >
                <span>Night</span>
              </div>
              <Button
                style={{ marginTop: 20 }}
                disabled={selectedShift === ""}
                variant="contained"
                onClick={() => createShift()}
              >
                Save
              </Button>
            </div>
          </div>
        )}
    </div>
  );
};
