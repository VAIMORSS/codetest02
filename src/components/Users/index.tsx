import React from "react";

import UserCard from "./UserCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { userType } from "../../types";

/**Materil-ui */
import { Grid } from "@material-ui/core";

/**graphql */
import { useQuery } from "@apollo/client";
import { getUsers } from "../../graphql/queries";

function Users(props: any) {
  const { data, loading, error } = useQuery(getUsers);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      {data.users.map((user: userType) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
          <UserCard
            id={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Users;
