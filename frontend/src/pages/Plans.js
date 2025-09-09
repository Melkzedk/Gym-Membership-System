import React, { useState, useEffect } from "react";
import api from "../api/axios";

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await api.get("/plans");
      setPlans(res.data);
    };
    fetchPlans();
  }, []);

  const buyPlan = async (planId) => {
    try {
      const res = await api.post("/payments/create-session", { planId });
      window.location.href = res.data.url; // Stripe Checkout redirect
    } catch (err) {
      console.error("Error buying plan", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Membership Plans</h2>
      <div className="row">
        {plans.map((p) => (
          <div className="col-md-4" key={p._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p>Price: ${p.price}</p>
                <p>Duration: {p.durationDays} days</p>
                <button
                  className="btn btn-success"
                  onClick={() => buyPlan(p._id)}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
