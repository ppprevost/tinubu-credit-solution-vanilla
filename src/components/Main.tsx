import { Box, Toolbar, Grid, Tabs, Tab, Container } from "@mui/material";

import MainAside from "./MainAside";
import TitleBreadCrumb from "./TitleBreadCrumb";
import Parties from "./Parties";
import { useState } from "react";

const tabsText = [
  "parties",
  "coverage",
  "premium",
  "fees",
  "Discretionary credit limit",
  "claims",
  "political risk",
];

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AppMain = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth={false} disableGutters>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, }}
      >
        <Toolbar />
        <TitleBreadCrumb />

        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {tabsText.map((tab, index) => (
                  <Tab key={tab} label={tab} {...a11yProps(index)} />
                ))}
              </Tabs>
            </Box>
            <Parties />
          </Grid>
          <Grid item xs={3}>
            <MainAside />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AppMain;
