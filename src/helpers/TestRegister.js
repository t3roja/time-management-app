import React from "react";

const API_URL = "http://localhost:3000"; // backendin osoite

export default function TestRegister() {

  const handleRegister = async () => {
    const bodyData = {
      email: "testuser@example.com",
      password: "salasana123",
      password_confirmation: "salasana123",
      confirm_success_url: "http://localhost:3000/confirmation-success"
    };

    try {
      const response = await fetch(API_URL + "/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bodyData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Käyttäjä luotu onnistuneesti:", data);
      } else {
        const contentType = response.headers.get("content-type") || "";
        const data = contentType.includes("application/json") 
          ? await response.json() 
          : { message: await response.text() };
        console.error("Virhe:", data);
      }
    } catch (err) {
      console.error("Network tai parsing error:", err);
    }
  };

  return (
    <div>
      <h2>Testaa rekisteröintiä</h2>
      <button onClick={handleRegister}>Luo käyttäjä</button>
    </div>
  );
}
