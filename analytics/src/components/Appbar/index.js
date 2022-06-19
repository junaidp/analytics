import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";


const AppBarComponent = ({
  postition = "fixed",
  isBottom = false,
  children,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position={postition}
        sx={{ top: isBottom ? "auto" : 0, bottom: isBottom ? 0 : "auto" }}
      >
        {children}
      </AppBar>
    </Box>
  );
};
export default AppBarComponent;
