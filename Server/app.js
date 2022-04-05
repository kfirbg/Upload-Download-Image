const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path")

const app = express();

global.filename="";

app.use(cors({ origin: "*" }));
app.use(bodyParser.json({type:"application/json"}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));


const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});

var upload = multer({ storage: storage });

app.post("/file", upload.single("file"), (req, res) => {
  const file = req.file;
  filename=file.filename;  
  res.send(file);
});

app.get("/download",(req,res)=> {
  res.download('./uploads/'+filename)
})

app.listen(3000, () => {
  console.log("The server started on port 3000!!");
});