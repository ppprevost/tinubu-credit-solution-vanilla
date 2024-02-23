import parse from "html-react-parser";
import { Box, Divider } from "@mui/material";

const ListAutoComplete = ({
  props,
  option,
}: {
  props: React.HTMLAttributes<HTMLLIElement>;
  option: { text: string; id: number };
}) => {
  return (
    <li  {...props}>
      <Box
        sx={{
          width: "100%",
          borderBottom: "1px solid #757575",
          "&:last-child": {
            borderBottom: "none",
          },
        }}
      >
        {parse(option.text)}
        <Divider />
      </Box>
    </li>
  );
};

export default ListAutoComplete;
