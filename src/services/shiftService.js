import api from "./api";

export const shiftService = {
  getShiftById: async (userid) => {
    const response = await api.post("/shifts/getShiftById", userid);
    return response;
  },

  createShift: async (staffId, shift, date) => {
    const response = await api.post("/shifts/createShift", {
      staffId,
      shift,
      date,
    });
    return response;
  },

  getShiftByDate: async (userid) => {
    const response = await api.post("/shifts/getShiftByDate", userid);
    return response;
  },

  getStaffData: async () => {
    const response = await api.get("/staff/readStaff");
    return response;
  },
};
