import {
  Typography,
  TextField,
  Paper,
  Autocomplete,
  CircularProgress,
  Box,
  Divider,
  Link,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { BrokerWithId, BrokerSchemaWithId, BrokerSchema } from "../models";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import CreateBroker from "./CreateBroker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@uidotdev/usehooks";
import InfoBroker from "./InfoBroker";
import { Search } from "@mui/icons-material";
import parse from "html-react-parser";
const idAddBroker = 220000;

const Broker = () => {
  const [query, setQuery] = useState<string>("");
  const [currentBroker, setCurrentBroaker] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const debounceQuery = useDebounce(query, 400);
  const { data: { brokers } = {}, isLoading: isLoadingBroakers } = useQuery<{
    brokers: { id: number; text: string }[];
  }>({
    enabled: !!debounceQuery,
    queryKey: ["brokers", debounceQuery],
    queryFn: () =>
      fetch("/brokers?name=" + debounceQuery).then(async (broker) =>
        broker.json()
      ),
  });

  const {
    data: broker,
    isLoading: isLoadingBroaker,
    isError: isErrorBroker,
  } = useQuery<BrokerWithId>({
    enabled: !!currentBroker,
    queryKey: ["broker", currentBroker],
    queryFn: () =>
      fetch("/broker/" + currentBroker).then(async (broker) => broker.json()),
  });

  const methods = useForm({
    resolver: zodResolver(BrokerSchema),
  });

  useEffect(() => {
    if (broker) {
      methods.reset(broker);
    }
  }, [broker, methods]);

  const { success: brokerSuccess } = BrokerSchemaWithId.safeParse(broker);

  return (
    <FormProvider {...methods}>
      <Paper sx={{ bgcolor: "background.default", p: 2 }}>
        <CreateBroker
          setCurrentBroker={setCurrentBroaker}
          open={openModal}
          handleClose={() => setOpenModal(false)}
        />
        <Typography component="h5">Managing broker</Typography>
        <Typography sx={{ color: "#757575", fontSize: "14px", marginTop: 0 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Autocomplete
          sx={{
            "& .MuiAutocomplete-paper": {
              backgroundColor: "#363636",
            },
          }}
          filterOptions={(options) => {
            if (options?.length) {
              const result = [...options];
              result.push({
                id: idAddBroker,
                text: "<span>or <u>Add manually</u></span>",
              });
              return result;
            }
            return options;
          }}
          popupIcon={
            !broker?.legalName &&
            !isLoadingBroakers &&
            !brokers &&
            !isLoadingBroakers ? (
              <Search />
            ) : null
          }
          noOptionsText={
            isLoadingBroakers ? (
              <CircularProgress />
            ) : (
              <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                <span>No results</span>
                <Divider />
                <Typography
                  variant="body1"
                  onClick={() => {
                    setCurrentBroaker(null);
                    //methods.reset();
                    setOpenModal(!openModal);
                  }}
                >
                  <span>or </span>
                  <Link href="#" color="inherit">
                    Add manually
                  </Link>
                </Typography>
              </Box>
            )
          }
          disablePortal
          onChange={(event, value) => {
            if (event && value) {
              setQuery("");
              if (value.id === idAddBroker) {
              //  methods.reset();
                return setOpenModal(!openModal);
              }
              return setCurrentBroaker(value.id);
            }
          }}
          onInputChange={(event, newInput) => {
            if (newInput === "or Add manually") {
              return setQuery("");
            }
            if (event?.type !== "click") {
              setQuery(newInput);
              setCurrentBroaker(null);
            }
          }}
          id="combo-box-demo"
          options={brokers ?? []}
          getOptionLabel={(option) => parse(option.text) as string}
          style={{ width: "100%" }}
          renderInput={(params) => {
            if (params.inputProps.value === "") {
              setCurrentBroaker(null);
              methods.reset();
            }
            return (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  value: broker?.legalName,
                }}
                label="Name"
                variant="outlined"
              />
            );
          }}
          open={Boolean(debounceQuery?.length)}
        />

        {isLoadingBroaker && <CircularProgress />}
        {brokerSuccess && broker && <InfoBroker />}
        {isErrorBroker && <span>an error occured</span>}
      </Paper>
    </FormProvider>
  );
};

export default Broker;
