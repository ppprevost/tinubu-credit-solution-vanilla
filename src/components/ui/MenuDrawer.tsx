import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItem,
  Box,
  Drawer,
} from "@mui/material";

import Toolbar from "@mui/material/Toolbar";
import Star from "@mui/icons-material/Star";

export const drawerWidth: number = 240;

const AppDrawer = () => {
  return (
    <nav>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />

        <Box sx={{ overflow: "auto", marginTop:2 }}>
          {[
            "Dashboard",
            "Submissions",
            "Quotations",
            "Policies",
            "Audit Log",
          ].map((text) => (
            <ListItem sx={{ color: "white" }} key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "#fff", opacity: 0.5 }}>
                  <Star />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </Drawer>
    </nav>
  );
};

export default AppDrawer;
