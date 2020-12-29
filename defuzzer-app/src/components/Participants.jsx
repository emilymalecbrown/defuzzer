import React from "react";
import { useSelector } from "react-redux";

export const Participants = () => {
  const users = useSelector((state) =>
    state.users ? Object.values(state.users) : []
  );

  return (
    <div>
      <ul>
        {users &&
          users.map((user, index) => <li key={`${user}-${index}`}>{user}</li>)}
      </ul>
    </div>
  );
};
