import { API } from "../config";

export const getSchedule = async () => {
   const { data } = await API.get("/schedules");

   return data.data;
};

export const addSchedule = async (body) => {
   const { data } = await API.post("/schedule/create", body);

   return data.data;
};

export const deleteSchedule = async (id) => {
   const { data } = await API.delete("/schedule/" + id);

   return data.data;
};
