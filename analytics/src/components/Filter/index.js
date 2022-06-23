import React from "react";
import Box from "@mui/material/Box";
import CustomSelect from "../Select";
import { Button } from "@mui/material";

const queryOptions = [
  { field: 1, headerName: "Empty" },
  { field: 2, headerName: "Duplicate" },
  { field: 3, headerName: "Missing Sequence" },
];

const AdvanceFilter = ({ columns, handleSubmit = (e) => {}, onCancel = () => {} }) => {
  console.log("columns", columns);
  const [filterState, setFilterState] = React.useState({
    column: "",
    query: 1,
  });

  const handleChange = (value, key) => {
    setFilterState({ ...filterState, [key]: value.target.value });
  };

  console.log(filterState);

  return (
    <Box sx={{ minWidth: 120, margin: 2 }}>
      <div style={{ display: "flex", width: "100%" }}>
        <CustomSelect
          data={columns}
          value={filterState.column}
          title={"Column"}
          stateKey="column"
          handleChange={handleChange}
        />
        <CustomSelect
          data={queryOptions}
          title={"Query"}
          value={filterState.query}
          stateKey="query"
          handleChange={handleChange}
        />
      </div>
      <div
        style={{ marginTop: 10, display: "flex", justifyContent: "flex-start" }}
      >
        <Button variant="contained" onClick={() => handleSubmit(filterState)}>Submit</Button>
        <Button variant="contained" onClick={() => onCancel()}>Reset</Button>
      </div>
    </Box>
  );
};
export default AdvanceFilter;
