import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { AiOutlineClockCircle } from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa";
import { COLOR } from "../../utils/colors";

const SidebarComponent = () => {
   const [isCollapsed, setIsCollapsed] = useState(true);
   return (
      <Sidebar collapsed={isCollapsed} style={{ height: "100vh", backgroundColor: COLOR.LIGHT_BG }}>
         <Stack justifyContent={isCollapsed ? "center" : "flex-end"} my={"2"} alignItems={"center"} direction={"row"}>
            {!isCollapsed && (
               <motion.div
                  transition={{
                     duration: 1,
                  }}
                  animate={{
                     flex: isCollapsed ? 0 : 1,
                  }}
                  style={{
                     marginLeft: "12px",
                  }}
               ></motion.div>
            )}

            <motion.div
               transition={{ duration: 0.5 }}
               animate={{
                  rotateY: isCollapsed ? 180 : 0,
               }}
            >
               <Button variant={"ghost"} onClick={() => setIsCollapsed(!isCollapsed)}>
                  <Typography color={COLOR.CONTENT} fontSize={"1.5rem"}>
                     <FaChevronLeft />
                  </Typography>
               </Button>
            </motion.div>
         </Stack>

         <Menu
            menuItemStyles={{
               button: {
                  fontWeight: 600,
                  // the active class will be added automatically by react router
                  // so we can use it to style the active menu item
                  [`&.active`]: {
                     backgroundColor: "#13395e",
                     color: "#b6c8d9",
                  },
               },
            }}
         >
            <MenuItem
               title="Scheduler"
               icon={
                  <Typography fontSize={"1.5rem"}>
                     <AiOutlineClockCircle />
                  </Typography>
               }
               component={
                  <motion.div
                     style={{
                        backgroundColor: "transparent",
                        color: COLOR.CONTENT,
                        display: "flex",
                        alignItems: "center",
                     }}
                     whileHover={{
                        color: COLOR.LIGHT_BG,
                        backgroundColor: COLOR.CONTENT,
                     }}
                     animate={{
                        backgroundColor: "transparent",
                     }}
                  >
                     <Link to={"/"} />
                  </motion.div>
               }
            >
               Scheduler
            </MenuItem>
         </Menu>
      </Sidebar>
   );
};

export default SidebarComponent;
