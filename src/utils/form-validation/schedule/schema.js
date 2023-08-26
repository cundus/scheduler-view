import * as yup from "yup";

export const scheduleSchema = yup.object({
   nama: yup.string().required(),
   template_id: yup.number().positive().integer().required(),
   waktu_kirim: yup.string().required(),
   jam_kirim: yup.string().matches(/(\d){2}:(\d){2}/, 'Hour must have this pattern "00:00"'),
   masa_aktif: yup.date().required(),
   status: yup.number().required(),
});

export const initialValuesSchedule = {
   nama: "",
   template: 0,
   waktu_kirim: "",
   jam_kirim: null,
   masa_aktif: null,
   status: 1,
};
