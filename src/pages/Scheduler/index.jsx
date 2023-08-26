import { getSchedule } from "../../api/call/scheduler";
import React, { useCallback, useState } from "react";
import Table from "./Table";
import { Box, Button, Stack } from "@mui/material";
import { COLOR } from "../../utils/colors";
import UpsertSchedule from "./UpsertSchedule";

const Scheduler = () => {
   const [open, setOpen] = useState(false);
   const [schedules, setSchedules] = React.useState([]);
   const [isEdit, setIsEdit] = useState(false);
   const [selected, setSelected] = useState({});
   const fetchSchedule = async () => {
      try {
         const response = await getSchedule();
         setSchedules(response);
      } catch (error) {
         alert(error.response.data.message);
      }
   };
   React.useEffect(() => {
      fetchSchedule();
   }, []);

   const handleClickAddSchedules = useCallback(() => {
      setIsEdit(false);
      setSelected({});
      setOpen(true);
   }, [selected, isEdit, open]);

   const handleClickEdit = useCallback(
      (data) => {
         setSelected(schedules.find((item) => item.id === data.id));
         setIsEdit(true);
         setOpen(true);
      },
      [selected, isEdit, open]
   );

   const handleClose = useCallback(() => {
      setIsEdit(false);
      setSelected({});
      setOpen(false);
      fetchSchedule();
   }, []);

   return (
      <Box flexDirection={"column"} bgColor={"white"} padding={"2rem"} m={2} shadow={"xl"} border={`1px ${COLOR.LIGHT_BG} solid`} borderRadius={5}>
         <Stack my={5} direction={"row"}>
            <Button variant="contained" onClick={handleClickAddSchedules}>
               Tambah Schedule
            </Button>
         </Stack>
         <Table data={schedules} onClickEdit={handleClickEdit} refetch={fetchSchedule} />
         <UpsertSchedule isEdit={isEdit} schedule={selected} open={open} handleClose={handleClose} />
      </Box>
   );
};

export default Scheduler;
