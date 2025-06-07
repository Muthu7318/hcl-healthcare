import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

export const ViewShift = () => {
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
  const viewTypes = [
    { id: "day", name: "Day View" },
    { id: "week", name: "Week View" },
  ];
  const [selectedStaff, setSelectedStaff] = useState("select");
  const [selectedTechnician, setSelectedTechnician] = useState("select");
  const [staffShift, setStaffShift] = useState({});
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedShift, setSelectedShift] = useState("");
  const [viewType, setViewType] = useState("day"); // "day" or "week"

  const generateWeekDates = (date) => {
    const startOfWeek = dayjs(date).startOf("week");
    return Array.from({ length: 7 }, (_, i) =>
      startOfWeek.add(i, "day").format("MMM DD, YYYY")
    );
  };
  useEffect(() => {
    if (viewType === "week") {
      const weekDates = generateWeekDates(selectedDate);
      console.log("Week Dates: ", weekDates);
    }
  }, [selectedDate, viewType]);
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

      {selectedDate !== "" && (
        <div
          style={{
            textAlign: "center",
            // justifyItems: "center",
            marginTop: 20,
          }}
        >
          <Select
            labelId="staff-select-label"
            id="staff-select"
            value={viewType}
            // label="Select Staff"
            onChange={(event) => {
              setViewType(event.target.value);
            }}
          >
            {/* <MenuItem key={0} value={"select"}>
          {"Select Staff"}
        </MenuItem> */}
            {viewTypes.map((view) => (
              <MenuItem key={view.id} value={view.id}>
                {view.name}
              </MenuItem>
            ))}
          </Select>
          {viewType === "day" ? (
            <div
              style={{
                width: "300px",
                // backgroundColor: "red",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <span>{dayjs(selectedDate).format("MMM DD, YYYY")}</span>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span style={{ width: 100 }}>Morning</span>
                <div
                  style={{
                    height: 100,
                    border: "1px solid black",
                    backgroundColor:
                      selectedShift === "Morning" ? "#f58c84" : "",
                    //   backgroundColor: "blue",
                    width: "280px",
                  }}
                  //   onClick={() => setSelectedShift("Morning")}
                ></div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span style={{ width: 100 }}>Afternoon</span>
                <div
                  style={{
                    height: 100,
                    border: "1px solid black",
                    backgroundColor:
                      selectedShift === "Afternoon" ? "#f58c84" : "",
                    width: "280px",
                  }}
                  //   onClick={() => setSelectedShift("Afternoon")}
                ></div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span style={{ width: 100 }}>Night</span>
                <div
                  style={{
                    height: 100,
                    border: "1px solid black",
                    backgroundColor: selectedShift === "Night" ? "#f58c84" : "",
                    width: "280px",
                  }}
                  //   onClick={() => setSelectedShift("Night")}
                ></div>
              </div>

              {/* <Button
                style={{ marginTop: 20 }}
                disabled={selectedShift === ""}
                variant="contained"
              >
                Save
              </Button> */}
            </div>
          ) : (
            <div
              style={{
                width: "300px",
                // backgroundColor: "red",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                {/* <span style={{ width: 100 }}>Morning</span> */}

                <div style={{ display: "flex", flexDirection: "row" }}>
                  {generateWeekDates(selectedDate).map((date, index) => (
                    <div
                      style={{
                        height: 20,
                        border: "1px solid black",
                        backgroundColor:
                          selectedShift === "Morning" ? "#f58c84" : "",
                        //   backgroundColor: "blue",
                        width: "180px",
                      }}
                      //   onClick={() => setSelectedShift("Morning")}
                    >
                      <span>{date}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {/* <span style={{ width: 100 }}>Morning</span> */}

                <div style={{ display: "flex", flexDirection: "row" }}>
                  {generateWeekDates(selectedDate).map((date, index) => (
                    <div
                      style={{
                        height: 200,
                        border: "1px solid black",
                        backgroundColor:
                          selectedShift === "Morning" ? "#f58c84" : "",
                        //   backgroundColor: "blue",
                        width: "180px",
                      }}
                      //   onClick={() => setSelectedShift("Morning")}
                    ></div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {/* <span style={{ width: 100 }}>Afternoon</span> */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {generateWeekDates(selectedDate).map((date, index) => (
                    <div
                      style={{
                        height: 200,
                        border: "1px solid black",
                        backgroundColor:
                          selectedShift === "Morning" ? "#f58c84" : "",
                        //   backgroundColor: "blue",
                        width: "180px",
                      }}
                      //   onClick={() => setSelectedShift("Morning")}
                    ></div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {/* <span style={{ width: 200 }}>Night</span> */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {generateWeekDates(selectedDate).map((date, index) => (
                    <div
                      style={{
                        height: 200,
                        border: "1px solid black",
                        backgroundColor:
                          selectedShift === "Morning" ? "#f58c84" : "",
                        //   backgroundColor: "blue",
                        width: "180px",
                      }}
                      //   onClick={() => setSelectedShift("Morning")}
                    ></div>
                  ))}
                </div>
              </div>

              {/* <Button
                style={{ marginTop: 20 }}
                disabled={selectedShift === ""}
                variant="contained"
              >
                Save
              </Button> */}
            </div>
          )}
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
