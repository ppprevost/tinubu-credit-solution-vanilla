import { Paper, Typography } from "@mui/material";
import { ReactNode } from "react";
import LittleTitleBlock from "./ui/LittleTitleBlock";

type BlockAsideProps = {
  block: { title: string; data: Record<string, string | ReactNode> };
};

const BlockAside = ({ block }: BlockAsideProps) => {
  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: "background.default",
        flexGrow: 1,
      }}
    >
      <Typography variant="h6">{block.title}</Typography>
      {Object.entries(block.data).map(([key, val]) => (
        <div key={key}>
          <LittleTitleBlock>{key}</LittleTitleBlock>
          <p>{val}</p>
        </div>
      ))}
    </Paper>
  );
};

export default BlockAside;
