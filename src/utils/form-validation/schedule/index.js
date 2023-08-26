import { useForm } from "react-hook-form";
import { initialValuesSchedule, scheduleSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";

const useScheduleValidation = () => {
   const { control, reset, watch, handleSubmit, setValue } = useForm({
      defaultValues: initialValuesSchedule,
      resolver: yupResolver(scheduleSchema),
      mode: "all",
      reValidateMode: "onBlur",
   });

   return { control, reset, watch, handleSubmit, setValue };
};

export default useScheduleValidation;
