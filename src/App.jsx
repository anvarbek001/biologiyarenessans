/** @format */

import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import "./App.css"; // 🎨 CSS faylni ulaymiz

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
    WebApp.ready(); // 📲 Telegram WebApp’ni ishga tayyorlaydi
    console.log("Telegram foydalanuvchisi:", WebApp.initDataUnsafe?.user);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const tgUser = WebApp.initDataUnsafe?.user;

    if (!tgUser) {
      alert("❗ Telegram foydalanuvchisi aniqlanmadi");
      return;
    }

    const payload = {
      telegram_id: tgUser.id,
      full_name: form.full_name,
      age: form.age,
      grade: form.grade,
      region: form.region,
      district: form.district,
      phone: form.phone,
    };

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("✅ Ro'yxatdan muvaffaqiyatli o'tdingiz!");
        WebApp.close(); // 🔐 Telegram oynasini yopadi
      } else {
        alert("❌ Serverda xatolik. Keyinroq urinib ko‘ring.");
      }
    } catch (error) {
      console.error("Xatolik:", error);
      alert("❌ Ulanishda muammo.");
    }
  };

  return (
    <div className="container">
      <h2>Ro'yxatdan o'tish</h2>

      <input
        className="input"
        name="full_name"
        placeholder="Ism Familiya"
        onChange={handleChange}
      />
      <input
        className="input"
        name="age"
        type="number"
        placeholder="Yosh"
        onChange={handleChange}
      />
      <input
        className="input"
        name="grade"
        placeholder="Sinf (masalan: 9)"
        onChange={handleChange}
      />
      <input
        className="input"
        name="region"
        placeholder="Viloyat"
        onChange={handleChange}
      />
      <input
        className="input"
        name="district"
        placeholder="Shahar / Tuman"
        onChange={handleChange}
      />
      <input
        className="input"
        name="phone"
        placeholder="Telefon raqam"
        onChange={handleChange}
      />
      <button className="button" onClick={handleSubmit}>
        ✅ Yuborish
      </button>
    </div>
  );
}

export default App;
