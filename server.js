const express = require("express");
const userRoutes = require ('./routes/userRoutes.js');
const driverRoutes = require ('./routes/driverRoutes.js');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.get("/", (req, res) => {
   res.send("This is home page.");
});

app.post("/", (req, res) => {
   res.send("This is home page with post request.");
});

// PORT
const PORT = 3500;

app.listen(PORT, () => {
   console.log(`Server is running on PORT: ${PORT}`);
});
