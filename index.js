const express = require("express");

const app = express();

app.use(express.json({ extended: false }));

app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Node is running on the port  ${PORT}`));
