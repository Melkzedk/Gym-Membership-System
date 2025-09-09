import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">Dashboard</h2>
          {user ? (
            <>
              <div className="mb-3">
                <p className="mb-1 fw-bold">Welcome, <span className="text-success">{user.name}</span></p>
                <p className="mb-1">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="mb-1">
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
              {user.subscription ? (
                <div className="alert alert-success mt-3">
                  <strong>Active Plan:</strong> {user.subscription.plan?.name} <br />
                  <strong>Expires on:</strong>{" "}
                  {new Date(user.subscription.expiresAt).toLocaleDateString()}
                </div>
              ) : (
                <div className="alert alert-warning mt-3">
                  No active subscription
                </div>
              )}
            </>
          ) : (
            <div className="alert alert-info">Loading user...</div>
          )}
        </div>
      </div>
    </div>
  );
}
