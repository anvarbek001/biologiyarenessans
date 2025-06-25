/** @format */
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    full_name: "",
    age: "",
    grade: "",
    region: "",
    district: "",
    phone: "",
  });

  const [initData, setInitData] = useState("");

  useEffect(() => {
    WebApp.ready();
    setInitData(WebApp.initData);
    console.log("✅ Telegram initData:", WebApp.initData); // tekshirish uchun
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!initData) {
      alert("❗ Iltimos, Telegram WebApp tugmasi orqali kiring.");
      return;
    }

    const payload = {
      initData,
      ...form,
    };

    try {
      const res = await fetch("http://localhost:3000/register", {
        // ⬆️ ← bu yerga backend URLingizni yozing (deploy qilsangiz, shu URLni o‘zgartirasiz)
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert(data.message);
      if (data.status === "success") WebApp.close();
    } catch (err) {
      console.error("❌ Xatolik:", err);
      alert("Serverga ulanishda xatolik.");
    }
  };

  return (
    <div className="container">
      <h2>Ro'yxatdan o'tish</h2>
      {Object.entries(form).map(([key, val]) => (
        <input
          key={key}
          name={key}
          type={["age", "phone"].includes(key) ? "number" : "text"}
          placeholder={key.replace("_", " ").toUpperCase()}
          value={val}
          onChange={handleChange}
          className="input"
        />
      ))}
      <button className="button" onClick={handleSubmit}>
        ✅ Yuborish
      </button>
    </div>
  );
}

export default App;
