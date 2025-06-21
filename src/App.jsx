/** @format */

import { useState, useEffect } from "react";
import WebApp from "@twa-dev/sdk";

function App() {
  const [form, setForm] = useState({
    full_name: "",
    age: "",
    grade: "",
    region: "",
    district: "",
    phone: "",
  });

  useEffect(() => {
    WebApp.ready();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const tgUser = WebApp.initDataUnsafe?.user;

    if (!tgUser) {
      alert("Telegram foydalanuvchisi aniqlanmadi.");
      return;
    }

    const payload = {
      telegram_id: tgUser.id,
      ...form,
    };

    await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    WebApp.close();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Ro'yxatdan o'tish</h2>

      <input
        name="full_name"
        placeholder="Ism Familiya"
        onChange={handleChange}
      />
      <br />
      <br />
      <input
        name="age"
        placeholder="Yosh"
        type="number"
        onChange={handleChange}
      />
      <br />
      <br />
      <input
        name="grade"
        placeholder="Sinf (masalan: 9)"
        onChange={handleChange}
      />
      <br />
      <br />
      <input name="region" placeholder="Viloyat" onChange={handleChange} />
      <br />
      <br />
      <input
        name="district"
        placeholder="Shahar / Tuman"
        onChange={handleChange}
      />
      <br />
      <br />
      <input name="phone" placeholder="Telefon raqam" onChange={handleChange} />
      <br />
      <br />
      <button onClick={handleSubmit}>✅ Yuborish</button>
    </div>
  );
}

export default App;
