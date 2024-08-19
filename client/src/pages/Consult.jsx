import React, { useState } from "react";

export default function Consult() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    mobile: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      setSuccess("Successfully booked your consultation!");
      setFormData({
        name: "",
        address: "",
        email: "",
        mobile: "",
      });
      // Refresh the page after a delay
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  const labelStyle = {
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "bold",
  };

  const buttonStyle = {
    width: "50%",
    alignSelf: "center",
    marginTop: "10px",
    padding: "10px 15px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <main style={{ padding: "20px" }}>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Book Your Consultation
      </div>
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}
      {success && (
        <div style={{ color: "green", textAlign: "center" }}>{success}</div>
      )}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label htmlFor="name" style={labelStyle}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="address" style={labelStyle}>
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="mobile" style={labelStyle}>
            Mobile:
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </main>
  );
}
