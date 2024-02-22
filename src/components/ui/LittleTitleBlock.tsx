import { Typography } from "@mui/material";
import capitalize from "lodash.capitalize";

const LittleTitleBlock = ({ children }: { children: string }) => {
  return (
    <Typography
      variant="body2"
      sx={{
        marginTop: 2,
        color: "#757575",
        size: "12px",
        lineHeight: "14px",
      }}
    >
      {capitalize(children)}
    </Typography>
  );
};

export default LittleTitleBlock;
