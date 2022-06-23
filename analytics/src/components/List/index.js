import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListSubheader } from "@mui/material";

// const renderRow = ({ title = "", data = [] }) => {
//   return data.map((el, index) => {
//     <ListItem key={index} component="div" disablePadding>
//       <ListItemButton>
//         <ListItemText primary={el} />
//       </ListItemButton>
//     </ListItem>;
//   });
// };

const CustomList = ({ title = "", data = [] }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          overflow: "auto",
          maxHeight: 500,
        }}
      >
        <ListSubheader>{title}</ListSubheader>
        {data.map((el, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${++index}: ${el}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CustomList;
