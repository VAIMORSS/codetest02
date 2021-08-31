import React from "react";
import styled from "styled-components";

/**material-ui */
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { DonationCardType } from "../../types";
import { useRouter } from "next/router";

export default function DonationCard(props: DonationCardType) {
  const router = useRouter();

  const updateDonation = () => {
    router.push(
      {
        pathname: "/DonationForm",
        query: {
          formType: "UPDATE",
          id: props.id,
          amount: props.amount,
          tip: props.tip,
          userId: props.userId,
        },
      },
      "/DonationForm"
    );
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
        </DonationCurd>
      </DonationCardRows>
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
