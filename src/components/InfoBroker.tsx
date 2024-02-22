import { Typography, TextField, Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import LittleTitleBlock from "./ui/LittleTitleBlock";

const InfoBroker = () => {
  const methods = useFormContext();

  return (
    <Box>
      <Box>
        <LittleTitleBlock>Address</LittleTitleBlock>
        <Typography variant="body1">
          {methods.getValues("address.street")}
        </Typography>
      </Box>
      <Box>
        <LittleTitleBlock>Country</LittleTitleBlock>
        <Typography variant="body1">{methods.getValues("country")}</Typography>
      </Box>
      <Box>
        <TextField
          sx={{ width: "100%" }}
          label="commission"
          variant="outlined"
          type="text"
          {...methods.register("commission")}
        />
      </Box>
      <Box>
        <TextField
          sx={{ width: "100%" }}
          label="contact"
          variant="outlined"
          type="text"
          {...methods.register("contact")}
        />
      </Box>
    </Box>
  );
};

export default InfoBroker;
