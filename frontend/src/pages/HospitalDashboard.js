import { useEffect, useState } from "react";
import axios from "axios";

export default function HospitalDashboard() {

    const [profile, setProfile] = useState({
        name: "",
        licenseNumber: "",
        mobile: "",
        address: {
            street: "",
            city: "",
            state: "",
            pin: ""
        }
    });

    useEffect(() => {
        axios.post(process.env.REACT_APP_API + "/hospital/session", {
            email: localStorage.getItem("email"),
            sessionKey: localStorage.getItem("sessionKey")
        }).then(res => {
            if (res.data.status === "authenticated") {
                if (res.data.data.profile)
                    setProfile(res.data.data.profile);
            } else {
                alert("Session expired. Login again.");
            }
        });
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;

        if (["street", "city", "state", "pin"].includes(name)) {
            setProfile({
                ...profile,
                address: {
                    ...profile.address,
                    [name]: value
                }
            });
        } else {
            setProfile({
                ...profile,
                [name]: value
            });
        }
    }

    function handleSave() {
        axios.post(process.env.REACT_APP_API + "/hospital/profile", {
            email: localStorage.getItem("email"),
            sessionKey: localStorage.getItem("sessionKey"),
            ...profile
        }).then(res => {
            if (res.data.status === "updated") {
                alert("Profile Updated Successfully");
            } else {
                alert("Error updating profile");
            }
        });
    }

    return (
        <div style={{ padding: "30px" }}>
            <h2>Hospital Dashboard</h2>

            <input name="name" placeholder="Hospital Name"
                value={profile.name} onChange={handleChange} /><br /><br />

            <input name="licenseNumber" placeholder="License Number"
                value={profile.licenseNumber} onChange={handleChange} /><br /><br />

            <input name="mobile" placeholder="Mobile"
                value={profile.mobile} onChange={handleChange} /><br /><br />

            <input name="street" placeholder="Street"
                value={profile.address.street} onChange={handleChange} /><br /><br />

            <input name="city" placeholder="City"
                value={profile.address.city} onChange={handleChange} /><br /><br />

            <input name="state" placeholder="State"
                value={profile.address.state} onChange={handleChange} /><br /><br />

            <input name="pin" placeholder="Pin"
                value={profile.address.pin} onChange={handleChange} /><br /><br />

            <button onClick={handleSave}>Save</button>
        </div>
    );
}