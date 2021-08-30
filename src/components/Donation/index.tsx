import { useQuery, gql } from "@apollo/client";
import { getDonationByUserId } from "../../graphql/queries";
import { donationType, FORM_TYPE } from "../../types";
import DonationCard from "./DonationCard";
import DonationForm from "./DonationForm";

interface DonationsType {
  userId: string;
}

export default function Donations(props: DonationsType) {
  const { data, loading, error } = useQuery(getDonationByUserId(props.userId));

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const donations: donationType[] = data.getDonationByUserId;

  return (
    <div>
      {donations.map((donation: donationType) => (
        <DonationCard
          key={donation.id}
          id={donation.id}
          amount={donation.amount}
          tip={donation.tip}
        />
      ))}
      <DonationForm formType={FORM_TYPE.ADD} userId={props.userId} />
    </div>
  );
}
