import AppBarComponent from "../Appbar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Layout = ({ children }) => {
  return (
    <div className="main-container">
      <AppBarComponent>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBarComponent>
      <div >{children}</div>
      <AppBarComponent postition="static" isBottom={true}>
        Footer
      </AppBarComponent>
    </div>
  );
};

export default Layout;
