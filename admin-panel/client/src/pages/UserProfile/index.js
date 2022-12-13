import React from "react";
import { useAuthContext } from "../../contexts/authContext";

function UserProfile() {
  const { auth } = useAuthContext();
  console.log(auth);

  return (
    <div>
      <h3>User Profile</h3>
    </div>
  );
}

export default UserProfile;
