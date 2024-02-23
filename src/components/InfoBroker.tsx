import {
  Typography,
  TextField,
  Box,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import LittleTitleBlock from "./ui/LittleTitleBlock";

const InfoBroker = () => {
  const methods = useFormContext();
  const contact = methods.getValues("contact");

  return (
    <Box>
      <Box>
        <LittleTitleBlock>Address</LittleTitleBlock>
        <Typography variant="body1">
          {`${methods.getValues("address.street")}, ${methods.getValues(
            "address.city"
          )}, ${methods.getValues("address.postalCode")}`}
        </Typography>
      </Box>
      <Box>
        <LittleTitleBlock>Country</LittleTitleBlock>
        <Typography variant="body1">{methods.getValues("country")}</Typography>
      </Box>
      <Box
        sx={{ marginTop: 2, display: "flex", gap: 2, flexDirection: "column" }}
      >
        <TextField
          sx={{ width: "100%" }}
          label="commission"
          variant="outlined"
          type="text"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          {...methods.register("commission")}
        />
        <Select
          sx={{ width: "100%" }}
          labelId="contact"
          id="select"
          label="contact"
          {...methods.register("contact")}
        >
          {[contact].map((option, index) => (
            <MenuItem
              sx={{ backgroundColor: "white" }}
              key={index}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default InfoBroker;
