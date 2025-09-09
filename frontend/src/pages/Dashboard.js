import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          {user.subscription ? (
            <p>
              Active Plan: {user.subscription.plan?.name} until{" "}
              {new Date(user.subscription.expiresAt).toLocaleDateString()}
            </p>
          ) : (
            <p>No active subscription</p>
          )}
        </>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
}
