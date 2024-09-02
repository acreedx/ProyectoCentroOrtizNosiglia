import app from "./app.js";
const port = 4000;
import Account from "./models/Account.js";
mongoose
  .connect(
    "mongodb+srv://ah5474129:72009919Believer@clusterortiznosiglia.jexab.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOrtizNosiglia",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.get("/", (req, res) => {
  res.json("Welcome");
});
