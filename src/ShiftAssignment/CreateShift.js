import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import Button from "@mui/material/Button";

export const CreateShift = () => {
  const staffDetails = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ];
  const technicianDetails = [
    { id: 1, name: "Doctor" },
    { id: 2, name: "Care Giver" },
    { id: 3, name: "Care Coordinator" },
  ];
  const [selectedStaff, setSelectedStaff] = useState("select");
  const [selectedTechnician, setSelectedTechnician] = useState("select");
  const [staffShift, setStaffShift] = useState({});
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedShift, setSelectedShift] = useState("");
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
      <span style={{ marginTop: 20 }}>Select Department</span>
      <Select
        labelId="technician-select-label"
        id="technician-select"
        value={selectedTechnician}
        // label={"Select Department"}
        onChange={(event) => {
          setSelectedTechnician(event.target.value);
        }}
      >
        <MenuItem key={0} value={"select"}>
          {"Select Department"}
        </MenuItem>
        {technicianDetails.map((techinician) => (
          <MenuItem key={techinician.id} value={techinician.id}>
            {techinician.name}
          </MenuItem>
        ))}
      </Select>
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
          <MenuItem key={staff.id} value={staff.id}>
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
              >
                Save
              </Button>
            </div>
          </div>
        )}

      {/* <Scheduler data={sampleData} defaultDate={displayDate}>
        <DayView
          title="Two-Day-View"
          numberOfDays={2}
          slotDuration={60}
          slotDivisions={2}
          startTime={"07:00"}
          endTime={"19:00"}
          workDayStart={"08:00"}
          workDayEnd={"18:00"}
        />
      </Scheduler> */}
    </div>
  );
};
