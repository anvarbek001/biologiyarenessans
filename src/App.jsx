/** @format */
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import "./App.css";

function App() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [phone, setPhone] = useState("");
  const [initData, setInitData] = useState("");

  useEffect(() => {
    WebApp.ready();
    const safeInit = WebApp.initData;
    const unsafeInit = WebApp.initDataUnsafe?.query_id;

    console.log("✅ INIT DATA:", safeInit);
    console.log("🧠 INIT UNSAFE:", WebApp.initDataUnsafe);

    setInitData(safeInit || unsafeInit || "");
  }, []);

  const handleSubmit = async () => {
    if (!initData) {
      alert("❗ Iltimos, Telegram WebApp tugmasi orqali kiring.");
      return;
    }

    const payload = {
      initData,
      full_name: fullName,
      age,
      grade,
      region,
      district,
      phone,
    };

    try {
      const res = await fetch("https://webappbot-ozlh.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert(data.message);
      if (data.status === "success") WebApp.close();
    } catch (err) {
      console.error("❌ Server xatosi:", err);
      alert("Serverga ulanishda xatolik.");
    }
  };

  return (
    <div className="container">
      <h2>Ro'yxatdan o'tish</h2>

      <input
        name="full_name"
        type="text"
        placeholder="Ism Familiya"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="input"
      />
      <input
        name="age"
        type="number"
        placeholder="Yosh"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="input"
      />
      <input
        name="grade"
        type="number"
        placeholder="Sinf"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="input"
      />
      <input
        name="region"
        type="text"
        placeholder="Viloyat"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="input"
      />
      <input
        name="district"
        type="text"
        placeholder="Tuman/Shaxar"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        className="input"
      />
      <input
        name="phone"
        type="number"
        placeholder="Telefon raqam"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="input"
      />

      <button className="button" onClick={handleSubmit}>
        ✅ Yuborish
      </button>
    </div>
  );
}

export default App;
