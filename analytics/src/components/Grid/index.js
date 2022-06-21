import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const DataTableGrid = ({columns,data = []} , isCheckbox = false) => {
  return (
    <Box sx={{ height: "calc(100vh - 50px)", width: "100%" }}>
      <DataGrid 
        rows={data}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[5]}
        checkboxSelection = {false}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default DataTableGrid;
