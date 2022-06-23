import React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, CircularProgress } from "@mui/material";

const LinearLoader = ({ isVisible }) => {
  return (
    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
      {isVisible ? <LinearProgress color="secondary" /> : null}
    </Stack>

  );
};
export default LinearLoader;
