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
import { useCallback, useEffect, useState } from "react";
import CreateBroker from "./CreateBroker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@uidotdev/usehooks";
import InfoBroker from "./InfoBroker";
import { Search } from "@mui/icons-material";
import ListAutoComplete from "./AutocompleteList";

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
    defaultValues: {},
  });

  useEffect(() => {
    if (broker) {
      methods.reset(broker);
    } else {
      methods.reset({});
    }
  }, [broker, methods]);

  const { success: brokerSuccess } = BrokerSchemaWithId.safeParse(broker);

  const addNewBroker = useCallback(() => {
    methods.reset();
    setOpenModal(!openModal);
  }, [methods, openModal]);

  const showSearchIcon =
    !broker?.legalName && !isLoadingBroakers && !brokers && !isLoadingBroakers;

  return (
    <FormProvider {...methods}>
      <Paper sx={{ bgcolor: "background.default", p: 2 }}>
        <CreateBroker
          setCurrentBroker={setCurrentBroaker}
          open={openModal}
          handleClose={() => setOpenModal(false)}
        />
        <Typography variant="h5">Managing broker</Typography>
        <Typography sx={{ color: "#757575", fontSize: "14px", marginTop: 0 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Autocomplete
          sx={{
            marginTop: 3,
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
          popupIcon={showSearchIcon ? <Search /> : null}
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
                    addNewBroker();
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
                return addNewBroker();
              }
              return setCurrentBroaker(value.id);
            }
          }}
          onInputChange={(event, newInput) => {
            if (event?.type !== "click") {
              setQuery(newInput);
              setCurrentBroaker(null);
            }
          }}
          id="combo-box-demo"
          options={brokers ?? []}
          getOptionLabel={(option) => option.text as string}
          style={{ width: "100%" }}
          renderOption={(props, option) => (
            <ListAutoComplete key={option.text} option={option} props={props} />
          )}
          renderInput={(params) => {
            if (params.inputProps.value === "") {
              setCurrentBroaker(null);

              if (document.querySelector("#combo-box-demo")?.value) {
                document.querySelector("#combo-box-demo").value = "";
              }
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

        {isLoadingBroaker && <CircularProgress sx={{ marginTop: 3 }} />}
        {brokerSuccess && broker && <InfoBroker />}
        {isErrorBroker && <span>an error occured</span>}
      </Paper>
    </FormProvider>
  );
};

export default Broker;
