const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.use("/patient", require("./routes/patient"));
app.use("/doctor", require("./routes/doctor"));
app.use("/hospital", require("./routes/hospital"));
app.use("/insurance", require("./routes/insurance"));
app.use("/admin", require("./routes/admin"));
app.use("/payments", require("./routes/payments"));

const port = process.env.PORT || "5000";
app.listen(port, () => {
    console.log("Server is Started on PORT: " + port);
});