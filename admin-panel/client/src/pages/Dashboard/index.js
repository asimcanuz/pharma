import React, { Fragment } from "react";
import Header from "../../components/Header";
import { useAuthContext } from "../../contexts/authContext";
function Dashboard() {
  const { auth } = useAuthContext();
  console.log(auth);
  return (
    <Fragment>
      <Header title={"DASHBOARD"} subTitle="Welcome to your dashboard" />
    </Fragment>
  );
}

export default Dashboard;
