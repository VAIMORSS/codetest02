import React from "react";

import styled from "styled-components";

/**Material-ui */
import { Button, TextField, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

/**Form */
import { useForm, Controller } from "react-hook-form";

/**graphql */
import { useMutation, useQuery } from "@apollo/client";
import {
  updateDonation as updateDonationQuery,
  createDonations,
  getDonationByUserId,
  removeDonations,
} from "./../src/graphql/queries";

import { useRouter } from "next/router";

type Inputs = {
  amount: number;
  tip: number;
};

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    margin: theme.spacing(2, 2),
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  commonFormField: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  remove: {
    backgroundColor: "red",
  },
}));

function donationForm() {
  const classes = useStyles();
  const { handleSubmit, errors: fieldsErrors, control } = useForm<Inputs>();
  const router = useRouter();
  const formPayload = router.query;

  const [updateDonation, { data, loading, error }]: any =
    useMutation<{ id: string; amount: number; tip: number }>(
      updateDonationQuery
    );

  const [
    addDonation,
    {
      data: addDonationData,
      loading: addDonationLoading,
      error: addDonationError,
    },
  ]: any =
    useMutation<{ id: string; amount: number; tip: number }>(createDonations);

  const [
    removeDonation,
    {
      data: removeDonationData,
      loading: removeDonationLoading,
      error: removeDonationError,
    },
  ]: any = useMutation<{ id: string }>(removeDonations);

  const onSubmit = (formData: any) => {
    if (formPayload.formType == "UPDATE" && formPayload.id != undefined) {
      updateDonation({
        variables: {
          id: formPayload.id,
          amount: parseFloat(formData.amount),
          tip: parseFloat(formData.tip),
        },
      });
    } else if (formPayload.formType == "ADD") {
      addDonation({
        variables: {
          userId: formPayload?.userId,
          amount: parseFloat(formData.amount),
          tip: parseFloat(formData.tip),
        },
      });
    }
    onBackClicked();
  };

  const onBackClicked = () => {
    router.push("/");
  };

  const onRemoveDonation = () => {
    removeDonation({ variables: { id: formPayload.id } });
    onBackClicked();
  };

  return (
    <Grid container component="main" className={classes.image}>
      <FormCloseButton>
        <IconButton onClick={onBackClicked}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </FormCloseButton>

      <div className={classes.paper}>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item>
              <Controller
                name="amount"
                type="number"
                as={TextField}
                variant="filled"
                margin="normal"
                required
                fullWidth
                id="amount"
                label="Amount"
                defaultValue={(formPayload.amount && formPayload.amount) || 0}
                helperText={
                  fieldsErrors && fieldsErrors.amount
                    ? fieldsErrors.amount.message
                    : null
                }
                error={(fieldsErrors.amount && true) || false}
                className={classes.commonFormField}
                control={control}
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item>
              <Controller
                name="tip"
                type="number"
                as={TextField}
                variant="filled"
                margin="normal"
                required
                fullWidth
                id="tip"
                label="Tip"
                defaultValue={formPayload.tip || 0}
                helperText={
                  fieldsErrors && fieldsErrors.tip
                    ? fieldsErrors.tip.message
                    : null
                }
                error={(fieldsErrors && fieldsErrors.tip && true) || false}
                className={classes.commonFormField}
                control={control}
                rules={{
                  required: true,
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {(formPayload.formType == "ADD" && `Add`) || `Update`}
          </Button>
          {formPayload.formType == "UPDATE" && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.remove}
              onClick={onRemoveDonation}
            >
              Remove
            </Button>
          )}
        </form>
      </div>
    </Grid>
  );
}

const FormCloseButton = styled.div`
  align-self: right;
`;

export default donationForm;
