import React from "react";

import styled from "styled-components";

/**Material-ui */
import { Button, TextField, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

/**Form */
import { useForm, Controller } from "react-hook-form";
import { DonationCardType, FORM_TYPE } from "../../types";

/**graphql */
import { useMutation } from "@apollo/client";
import {
  createDonations,
  updateDonation as updateDonationQuery,
} from "../../graphql/queries";

interface DonationFormType {
  handleClose?: () => void;
  formType: FORM_TYPE;
  donationData?: DonationCardType;
  userId?: string;
}

type Inputs = {
  amount: number;
  tip: number;
};

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    justifyContent: "flex-end",
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
}));

export default function DonationForm(props: DonationFormType) {
  const classes = useStyles();
  const { handleSubmit, errors: fieldsErrors, control } = useForm<Inputs>();
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

  const onSubmit = (formData: any) => {
    if (props.formType == FORM_TYPE.UPDATE && props.donationData != undefined) {
      updateDonation({
        variables: {
          id: props.donationData.id,
          amount: parseFloat(formData.amount),
          tip: parseFloat(formData.tip),
        },
      });
      props.handleClose && props.handleClose();
      console.log(data, error);
    } else if (props.formType == FORM_TYPE.ADD) {
      addDonation({
        variables: {
          userId: props?.userId,
          amount: parseFloat(formData.amount),
          tip: parseFloat(formData.tip),
        },
      });
    }
  };

  return (
    <Grid container component="main" className={classes.image}>
      {props.formType == FORM_TYPE.UPDATE && (
        <FormCloseButton>
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </FormCloseButton>
      )}
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
                defaultValue={
                  (props.donationData && props.donationData.amount) || 0
                }
                helperText={
                  fieldsErrors && fieldsErrors.amount
                    ? fieldsErrors.amount.message
                    : null
                }
                error={(fieldsErrors && fieldsErrors.amount && true) || false}
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
                defaultValue={
                  (props.donationData && props.donationData.tip) || 0
                }
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
            {(props.formType == FORM_TYPE.ADD && `Add`) || `Update`}
          </Button>
        </form>
      </div>
    </Grid>
  );
}

const FormCloseButton = styled.div`
  align-self: right;
`;
