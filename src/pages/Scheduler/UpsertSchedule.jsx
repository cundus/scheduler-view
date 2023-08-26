import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, TextField } from "@mui/material";
import useScheduleValidation from "../../utils/form-validation/schedule";
import { initialValuesSchedule } from "../../utils/form-validation/schedule/schema";
import { Controller } from "react-hook-form";
import { getTemplates } from "../../api/call/templates";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { addSchedule } from "../../api/call/scheduler";

const UpsertSchedule = ({ isEdit, schedule, open, handleClose }) => {
   const { control, handleSubmit, reset, watch, setValue } = useScheduleValidation();
   const [templates, setTemplates] = useState([]);

   useEffect(() => {
      if (isEdit) {
         reset({
            ...schedule,
         });
      }
      const fetchTemplates = async () => {
         try {
            const res = await getTemplates();

            setTemplates(res);
         } catch (error) {
            console.log(error);
         }
      };

      fetchTemplates();
   }, [isEdit]);

   const handleOnClose = () => {
      reset(initialValuesSchedule);
      handleClose();
   };

   const [selectedTime, setSelectedTime] = useState(null);

   const handleTimeChange = (newTime) => {
      setValue("jam_kirim", moment(newTime).format("HH:mm"));
   };

   const handleOnSubmit = useCallback(async (data) => {
      console.log("handle on submit", data);

      try {
         await addSchedule(data);

         alert("Sukses ");

         handleOnClose();
      } catch (error) {
         console.log(error);
         alert("Error : " + error.message);
      }
   }, []);

   const onErrorSubmit = (err) => {
      console.log(err);
   };

   return (
      <Dialog open={open} onClose={handleOnClose} fullWidth>
         <DialogTitle>{isEdit ? "Update Schedule" : "Tambah Schedule"}</DialogTitle>
         <DialogContent>
            <form>
               <Box mt={2} mb={5}>
                  <Controller
                     control={control}
                     name="nama"
                     render={({ field, fieldState }) => (
                        <TextField {...field} fullWidth label="Nama Schedule" error={!!fieldState.error?.message} helperText={fieldState.error?.message} placeholder="Nama Schedule..." />
                     )}
                  />
               </Box>
               <Box mb={5}>
                  <Controller
                     control={control}
                     name="template_id"
                     render={({ field, fieldState }) => (
                        <TextField
                           select
                           fullWidth
                           {...field}
                           label="Template"
                           placeholder="silakan pilih template pesan..."
                           error={!!fieldState.error?.message}
                           helperText={fieldState.error?.message}
                        >
                           <MenuItem value={0}>silakan pilih template pesan...</MenuItem>
                           {templates.map((item) => (
                              <MenuItem value={item.id} key={item.id}>
                                 {item.title}
                              </MenuItem>
                           ))}
                        </TextField>
                     )}
                  />
               </Box>
               <Box mb={5}>
                  <Controller
                     control={control}
                     name="waktu_kirim"
                     render={({ field, fieldState }) => (
                        <TextField
                           select
                           fullWidth
                           {...field}
                           defaultValue={field.value}
                           label="Dikirim Setiap"
                           placeholder="silakan pilih template pesan..."
                           error={!!fieldState.error?.message}
                           helperText={fieldState.error?.message}
                        >
                           <MenuItem value={""}>--Pilih waktu kirim--</MenuItem>
                           <MenuItem value={"hari"}>Dikirim setiap hari</MenuItem>
                           <MenuItem value={"minggu"}>Dikirim setiap Senin</MenuItem>
                           <MenuItem value={"bulan"}>Dikirim tiap tanggal 1</MenuItem>
                        </TextField>
                     )}
                  />
               </Box>

               <Box mt={2} mb={5}>
                  <Controller
                     control={control}
                     name="jam_kirim"
                     render={({ field, fieldState }) => (
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                           <TimePicker label="Jam Kirim" value={moment(field.value, "HH:mm")} onChange={handleTimeChange} renderInput={(params) => <TextField {...params} />} />
                        </LocalizationProvider>
                     )}
                  />
               </Box>
               <Box mt={2} mb={5}>
                  <Controller
                     control={control}
                     name="masa_aktif"
                     render={({ field, fieldState }) => (
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                           <DatePicker
                              label="Masa Aktif Sampai"
                              value={moment(field.value, "HH:mm")}
                              onChange={(val) => setValue("masa_aktif", val)}
                              renderInput={(params) => <TextField {...params} />}
                           />
                        </LocalizationProvider>
                     )}
                  />
               </Box>
               <Box mb={5}>
                  <Controller
                     control={control}
                     name="status"
                     render={({ field, fieldState }) => (
                        <TextField select fullWidth {...field} defaultValue={field.value} label="Status" error={!!fieldState.error?.message} helperText={fieldState.error?.message}>
                           <MenuItem value={0}>NONAKTIF</MenuItem>
                           <MenuItem value={1}>AKTIF</MenuItem>
                        </TextField>
                     )}
                  />
               </Box>
            </form>
         </DialogContent>
         <DialogActions>
            <Button color="error" onClick={handleOnClose}>
               Cancel
            </Button>
            <Button onClick={handleSubmit(handleOnSubmit, onErrorSubmit)}>Simpan</Button>
         </DialogActions>
      </Dialog>
   );
};

export default UpsertSchedule;
