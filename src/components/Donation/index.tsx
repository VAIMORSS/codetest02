import { useQuery } from "@apollo/client";
import { getDonationByUserId } from "../../graphql/queries";
import { donationType } from "../../types";
import DonationCard from "./DonationCard";
import { useRouter } from "next/router";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

interface DonationsType {
  userId: string;
}

export default function Donations(props: DonationsType) {
  const { data, loading, error, refetch } = useQuery(
    getDonationByUserId(props.userId)
  );
  const router = useRouter();

  React.useEffect(() => {
    refetch();
  }, [data]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const donations: donationType[] = data.getDonationByUserId;

  const onAddClick = () => {
    router.push(
      {
        pathname: "/donationForm",
        query: {
          formType: "ADD",
          userId: props.userId,
        },
      },
      "/donationForm"
    );
  };

  return (
    <DonationsWrapper>
      {donations.map((donation: donationType) => (
        <DonationCard
          key={donation.id}
          id={donation.id}
          amount={donation.amount}
          tip={donation.tip}
          userId={donation.userId}
        />
      ))}
      <IconButton onClick={onAddClick}>
        <AddIcon />
      </IconButton>
    </DonationsWrapper>
  );
}

const DonationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
