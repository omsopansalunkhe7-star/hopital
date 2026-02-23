import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios.post(process.env.REACT_APP_API + "/doctor/session", {
      email: localStorage.getItem("email"),
      sessionKey: localStorage.getItem("sessionKey")
    }).then(res => {
      if (res.data.status === "authenticated") {
        setDoctor(res.data.data);
      }
    });
  }, []);

  if (!doctor) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>Doctor Dashboard</h2>

      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Registration:</strong> {doctor?.profile?.registration || "Not Set"}</p>
      <p><strong>Name:</strong> {doctor?.profile?.name?.FName || "Not Set"}</p>
    </div>
  );
}