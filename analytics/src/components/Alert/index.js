import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const BasicAlerts = ({ severity = "success", text = "No Text Found" }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      {}
      <Alert severity={severity}>{text}</Alert>
    </Stack>
  );
};
export default BasicAlerts;
