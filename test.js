const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://melodurai_db_user:Bobbystudio123@cluster0.ueeuz5s.mongodb.net/bobbymedia?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
  console.log("✅ Connected");
  process.exit();
})
.catch(err => {
  console.error(err);
  process.exit();
});