import { API } from "../config";

export const getTemplates = async () => {
   const { data } = await API.get("/templates");

   return data.data;
};
