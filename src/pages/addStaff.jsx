import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Box } from '@mui/material';
import { addStaff } from '../slices/authSlice';

const AddStaff=()=> {
    const dispatch = useDispatch();
    const [form,setForm] = useState({
       name: '',
       staffId: '',
       role: '',
       shiftPreference: '',
       contactNumber: '',
     });


    const handleChange = (event) => {
       setForm({
         ...form,
         [event.target.name]: event.target.value,
       });
     };

    const handleSubmit = async (e) => {
        e.preventDefault();
      try {
            const response = dispatch(addStaff(form));

            const result = await response.json();
            console.log("Server response:", result);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return(
        <div id="addStaff" ClassName="container">
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
            <h2>Add Staff Details</h2>
                <div>
                    <TextField
        label="Staff ID"
        name="staffId"
        value={form.staffId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
                </div>
                <div>
                   <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
                </div>
                <div>
                    <FormControl fullWidth margin="normal">
           <InputLabel id="role-label">Role</InputLabel>       
        <Select
            labelId="role-label"
            id="demo-simple-select"
            value={form.role}
            label="Role"
            name="role"
            fullWidth
            onChange={handleChange}
        >
            <MenuItem value="Doctor">Doctor</MenuItem>
            <MenuItem value="Nurse">Nurse</MenuItem>
            <MenuItem value="Technician">Technician</MenuItem>
        </Select>
        </FormControl>
                </div>
                <div>
    <FormControl fullWidth margin="normal">
        <InputLabel id="shift-label">Shift Preferences</InputLabel>
        <Select
            labelId="shift-label"
            id="demo-simple-select"
            value={form.shiftPreference}
            label="Shift"
            name="shiftPreference"
            fullWidth
            onChange={handleChange}
        >
            <MenuItem value="Morning">Morning</MenuItem>
            <MenuItem value="Afternoon">Afternoon</MenuItem>
            <MenuItem value="Night">Night</MenuItem>
        </Select>
        </FormControl>
                </div>
                <div>
                    <TextField
        label="Contact Number"
        name="contactNumber"
        value={form.contactNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
      />
        <TextField
        label="Emergency Contact Number"
        name="emergencyContactNumber"
        value={form.emergencyContactNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
      />
                </div>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
           
    </Box>


        </div>
    )
}

export default AddStaff;