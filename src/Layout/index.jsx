import { Stack } from "@mui/material";
import SidebarComponent from "../components/Sidebar";
import { COLOR } from "../utils/colors";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
   return (
      <div
         style={{
            display: "flex",
         }}
      >
         {/* Left Side */}
         <SidebarComponent />
         {/* Right Side */}
         <div style={{ flex: 1 }}>
            <Outlet />
         </div>
      </div>
   );
};

export default Layout;
