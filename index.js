const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
//a small edit in a branch!!!!
// ------------------ MONGODB CONNECTION ------------------ //
mongoose
  .connect("mongodb+srv://siddharthareddy0227_db_user:zCRta0SHxnU8RGm1@cluster0.fseisep.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// ------------------ STUDENT MODEL ------------------ //
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  branch: String,
});

const Student = mongoose.model("Student", studentSchema);

// ------------------ ROUTES ------------------ //

// GET all students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// GET student by ID
app.get("/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

// POST – Add new student
app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).json(student);
});

// PATCH – Update student
app.patch("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!student) return res.status(404).json({ message: "Student not found" });

  res.json(student);
});

// DELETE – Remove student
app.delete("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });

  res.json({ message: "Student removed successfully" });
});

// ------------------ START SERVER ------------------ //
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
