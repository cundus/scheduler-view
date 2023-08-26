import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Scheduler from "./pages/Scheduler";

const Router = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<Scheduler />} />

               {/* <Route path="scheduler">
                  <Route index element={<Scheduler />} />
               </Route> */}
            </Route>
         </Routes>
      </BrowserRouter>
   );
};

export default Router;
