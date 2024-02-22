import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import { Broker } from "../models";
import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

export default function MaxWidthDialog({
  open,
  handleClose,
  setCurrentBroker,
}: {
  open: boolean;
  handleClose: () => void;
  setCurrentBroker: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const { handleSubmit, register, formState } = useFormContext<Broker>();

  const { mutate: postBroker, isPending } = useMutation<
    { id: number },
    { error: string },
    Broker
  >({
    mutationFn: (data) =>
      fetch("/broker", { method: "POST", body: JSON.stringify(data) }).then(
        (_) => _.json()
      ),
    mutationKey: ["postBroker"],
    onSuccess(data) {
      if (data.id) {
        const currentBrokerId = data.id;
        setCurrentBroker(currentBrokerId); //////
        handleClose(); //
      }
    },
  });

  const onSubmit = (data: Broker) => {
    postBroker(data);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add manually</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "100%",
            }}
          >
            <FormControl sx={{ mt: 2, width: "100%", gap: 2 }}>
              <TextField label="Legal Name" {...register("legalName")} />
              <TextField label="Address" {...register("address.street")} />
              <TextField label="City" {...register("address.city")} />
              <TextField label="Country" {...register("country")} />
              <input
                type="hidden"
                value="0000"
                {...register("address.postalCode")}
              />
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            Close
          </Button>
          {isPending ? (
            <LoadingButton loading variant="outlined" />
          ) : (
            <Button
              variant="outlined"
              onClick={handleSubmit(onSubmit, (e) => console.log(e))}
              type="submit"
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
