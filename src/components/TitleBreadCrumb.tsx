import {
  Breadcrumbs,
  Typography,
  Box,
  Chip,
  Link,
  Button,
  styled,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const HeaderStyled = styled(Box)(({ theme }) => ({
  alignItems: "start",
  justifyContent: "space-between",
  display: "flex",
}));

const MainTitle = () => {
  return (
    <HeaderStyled>
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Quotations
          </Link>
          <Typography color="text.primary">
            Quotation #54f4939c-bdc5-4b2a-96af-a8e187543c42
          </Typography>
        </Breadcrumbs>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4" component={"h1"}>
            PROPOSAL 20231018-1
          </Typography>
          <Chip label="Draft" />
        </Box>
      </div>
      <Button variant="contained" >
        Issue the proposal
      </Button>
    </HeaderStyled>
  );
};

export default MainTitle;
