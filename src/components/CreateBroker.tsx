import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Broker } from "../models";
import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";

export default function MaxWidthDialog({
  open,
  handleClose,
  setCurrentBroker,
}: {
  open: boolean;
  handleClose: () => void;
  setCurrentBroker: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const { handleSubmit, register, formState, getValues } =
    useFormContext<Broker>();

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
        setCurrentBroker(currentBrokerId);
        handleClose();
      }
    },
  });

  const onSubmit = (data: Broker) => {
    postBroker(data);
  };

  return (
    <React.Fragment>
      <Dialog fullWidth maxWidth={"sm"} open={open} onClose={handleClose}>
        <DialogTitle>Add manually</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "100%",
            }}
          >
            <Box
              component={"div"}
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
                width: "100%",
                gap: 2,
              }}
            >
              <Box>
                <TextField
                  sx={{ width: "100%" }}
                  label="Legal Name"
                  {...register("legalName")}
                />
                <Typography variant="body1" color="error">
                  {formState.errors.legalName?.message}
                </Typography>
              </Box>
              <Box>
                <TextField
                  sx={{ width: "100%" }}
                  label="Address"
                  {...register("address.street")}
                />
                <Typography variant="body1" color="error">
                  {formState.errors.address?.street?.message}
                </Typography>
              </Box>

              <Box>
                <TextField
                  sx={{ width: "100%" }}
                  label="City"
                  {...register("address.city")}
                />
                <Typography variant="body1" color="error">
                  {formState.errors.address?.city?.message}
                </Typography>
              </Box>
              <Box>
                <TextField
                  sx={{ width: "100%" }}
                  label="Country"
                  {...register("country")}
                />
                <Typography variant="body1" color="error">
                  {formState.errors.country?.message}
                </Typography>
              </Box>

              <input
                type="hidden"
                value="0000"
                {...register("address.postalCode")}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            Close
          </Button>

          {isPending ? (
            <LoadingButton loading />
          ) : (
            <Button onClick={handleSubmit(onSubmit)} type="submit">
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
