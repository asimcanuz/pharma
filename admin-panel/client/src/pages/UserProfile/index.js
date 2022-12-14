import React from "react";
import { useAuthContext } from "../../contexts/authContext";

function UserProfile() {
  const { auth } = useAuthContext();

  return (
    <div>
      <h3>User Profile</h3>
    </div>
  );
}

export default UserProfile;
