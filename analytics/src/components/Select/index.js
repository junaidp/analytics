import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
const CustomSelect = ({
  data = [],
  title,
  value,
  stateKey,
  handleChange = (a, b) => {},
}) => {
  const OptionGenerator = (data = []) =>
    data.map((e, index) => (
      <MenuItem key={e.field} value={e.field}>
        {e.headerName}
      </MenuItem>
    ));

  return (
    <>
      {" "}
      <FormControl style={{ width: "50%" }}>
        <InputLabel id={stateKey}>{title}</InputLabel>
        <Select
          id={stateKey}
          value={value}
          onChange={(e) => handleChange(e,stateKey)}
        >
          {OptionGenerator(data)}
        </Select>
      </FormControl>
    </>
  );
};

export default CustomSelect;
