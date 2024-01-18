


const express = require("express");
const userRoutes = require ('./routes/userRoutes.js');
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
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
