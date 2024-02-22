import { Toolbar, Grid, Box, Paper, Container, Chip } from "@mui/material";
import BlockAside from "./BlockAside";

const FirstBlock = {
  title: "Quotation overview",
  data: {
    product: "Whole turnover",
    origin: "Submission",
    "Commercial Owner": "Richar Adlana",
    creation: "05/10/2023",
    update: "05/10/2023",
    status: <Chip label="IN PROGRESS" />,
  },
};

const secondBlock = {
  title: "Submission Overview",
  data: {
    "business developer": "Richard Alana",
    creation: "05/10/2023",
    status: <Chip label="DONE" />,
  },
};

const displayBlocks = [FirstBlock, secondBlock];

const MainAside = () => {
  return (
    <Box>
      <Container>
        {displayBlocks.map((block) => (
          <BlockAside key={block.title} block={block} />
        ))}
      </Container>
    </Box>
  );
};

export default MainAside;
