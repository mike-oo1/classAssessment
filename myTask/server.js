const express = require("express");
const mongoose = require("mongoose");
PORT = 8980;

const app = express();
app.use(express.json());

const databaseUrl = "mongodb://127.0.0.1/todoDB";


mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e.message);
  });

const DBSchema = mongoose.Schema({
  name: { type: String, required: [true, "name is required"] },
  course: { type: String, required: [true, "course is required"] },
  designation: { type: String, required: [true, "designation  is required"] },
  score: {
    html:{type:Number,required:[true,"html score is required"]},
    css:{type:Number,required:[true,"css score is required"]},
    node:{type:Number,required:[true,"node score is required"]},
    javascript:{type:Number,required:[true,"javascript score is required"]}
  }
});


const DBModel = mongoose.model("DB", DBSchema);


app.post("/data", async (req, res) => {
  try {
    const data = await DBModel.create(req.body);
    if (!data) {
      res.status(400).json({
        message: "error creating data",
      });
    } else {
      res.status(201).json({
        message: "data created",
        data: data,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});


app.get("/data", async (req, res) => {
  try {
    const datas = await DBModel.find();
    if (!datas) {
      res.status(404).json({
        message: "data database not found",
      });
    } else if (datass.length == 0) {
      res.status(200).json({
        message: "no data on the database",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: datas,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/data/:id", async (req, res) => {
  try {
    const dataId = req.params.id;
    const task = await DBModel.findById(dataId);
    if (!data) {
      res.status(404).json({
        message: "data not found",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: datas,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


app.put("/data/:id", async (req, res) => {
  try {
    const dataId = req.params.id;
    const updatedTask = await DBModel.findByIdAndUpdate(dataId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedData) {
      res.status(404).json({
        message: "data not found",
      });
    } else {
      res.status(200).json({
        message: "data updated",
        data: updatedData,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


app.delete("/data/:id", async (req, res) => {
  try {
    const dataId = req.params.id;
    const deletedData = await DBModel.findByIdAndDelete(dataId);
    if (!deletedData) {
      res.status(404).json({
        message: "data not found",
      });
    } else {
      res.status(200).json({
        message: "data deleted",
        data: deletedData,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("server is workinmg on ", PORT);
});
