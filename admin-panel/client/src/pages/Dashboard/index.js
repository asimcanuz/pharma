import React, { Fragment } from "react";
import Header from "../../components/Header";
import { useAuthContext } from "../../contexts/authContext";
function Dashboard() {
  const { auth } = useAuthContext();
  return (
    <Fragment>
      <Header title={"DASHBOARD"} subTitle="Welcome to your dashboard" />
    </Fragment>
  );
}

export default Dashboard;
