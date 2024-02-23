import {
  Typography,
  TextField,
  Box,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import LittleTitleBlock from "./ui/LittleTitleBlock";

const InfoBroker = () => {
  const methods = useFormContext();
  const contact =
    methods.getValues("contact") ?? (methods.watch("contact") as string);

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
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          {...methods.register("commission")}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...methods.register("contact")}
          value={contact}
          label="Age"
        >
          <MenuItem value={contact}>{contact}</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default InfoBroker;
