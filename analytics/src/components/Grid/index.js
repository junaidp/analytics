import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const DataTableGrid = ({ columns, gridData = [] }, isCheckbox = false) => {
  return (
    <Box sx={{ height: "calc(100vh - 50px)", width: "97%", padding: 2 }}>
      <DataGrid
        rows={gridData}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default DataTableGrid;
