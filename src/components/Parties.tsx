import { Box, Typography, TextField, Paper } from "@mui/material";
import LittleTitleBlock from "./ui/LittleTitleBlock";
import Broker from "./Broker";

const Parties = () => {
  return (
    <Box sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
      <Paper sx={{ bgcolor: "background.default", marginTop: "20px", p: 2 }}>
        <Typography variant="h5">Joint insured</Typography>
        <Typography sx={{ color: "#757575", fontSize: "14px", marginTop: 0 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>

        <TextField
          sx={{ width: "100%", marginTop:3 }}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
        <LittleTitleBlock>Address</LittleTitleBlock>
        <Typography variant="body2">
          E Stutts Truck Trail, Manistique, MI 49854
        </Typography>
        <LittleTitleBlock>Country</LittleTitleBlock>
        <Typography variant="body2">United States</Typography>
      </Paper>
   <Broker />
      <Paper sx={{ bgcolor: "background.default", p: 2 }}>
        <Typography variant="h5">Introducing broker</Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <TextField
          sx={{ width: "100%", marginTop:3 }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
      </Paper>
    </Box>
  );
};

export default Parties;
