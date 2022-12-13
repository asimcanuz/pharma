import React from "react";
import { useAuthContext } from "../../contexts/authContext";
function Dashboard() {
  const { auth } = useAuthContext();
  console.log(auth);
  return (
    <div>
      <h3>Dashboard</h3>
    </div>
  );
}

export default Dashboard;
