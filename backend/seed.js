const mongoose = require("mongoose");
const dotenv = require("dotenv");
const MembershipPlan = require("./models/MembershipPlan"); // ✅ Correct model

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error(err));

// Sample Membership Plans
const plans = [
  {
    name: "Monthly",
    price: 30,
    duration: "1 Month",
  },
  {
    name: "Quarterly",
    price: 80,
    duration: "3 Months",
  },
  {
    name: "Yearly",
    price: 300,
    duration: "12 Months",
  },
];

// Insert Plans
const seedPlans = async () => {
  try {
    await MembershipPlan.deleteMany(); // clear old plans
    await MembershipPlan.insertMany(plans);
    console.log("Membership Plans inserted successfully 🌟");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding membership plans:", error);
    mongoose.connection.close();
  }
};

seedPlans();
