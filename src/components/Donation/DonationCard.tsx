import React from "react";
import styled from "styled-components";

/**material-ui */
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import { FORM_TYPE, DonationCardType } from "../../types";
import DonationForm from "./DonationForm";
import { useMutation } from "@apollo/client";
import { removeDonations } from "../../graphql/queries";
import { CircularProgress } from "@material-ui/core";

export default function DonationCard(props: DonationCardType) {
  const [isFormOpen, setIsFormOpenModal] = React.useState(false);
  const [
    removeDonation,
    {
      data: removeDonationData,
      loading: removeDonationLoading,
      error: removeDonationError,
    },
  ]: any = useMutation<{ id: string }>(removeDonations);

  const updateDonation = () => {
    setIsFormOpenModal(true);
  };

  const onRemoveDonation = () => {
    removeDonation({ variables: { id: props.id } });
  };

  const closeModal = () => {
    console.log("this is getting called");
    setIsFormOpenModal(false);
  };

  return (
    <CardContent>
      <DonationCardRows>
        ✨
        <DonationInfo>
          <Typography variant="h6">Amount : {props.amount}</Typography>
          <Typography variant="body2">Amount : {props.tip}</Typography>
        </DonationInfo>
        <DonationCurd>
          <IconButton onClick={updateDonation}>
            <EditIcon />
          </IconButton>
          {(removeDonationLoading && <CircularProgress />) || (
            <IconButton onClick={onRemoveDonation}>
              <DeleteForeverIcon />
            </IconButton>
          )}
        </DonationCurd>
      </DonationCardRows>
      {isFormOpen && (
        <DonationForm
          handleClose={closeModal}
          formType={FORM_TYPE.UPDATE}
          donationData={props}
        />
      )}
    </CardContent>
  );
}

const DonationCardRows = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DonationInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const DonationCurd = styled.div``;
