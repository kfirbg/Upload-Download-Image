const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

global.filename="";
app.listen(3000, () => {
  console.log("The server started on port 3000!!");
});

app.use(cors({ origin: "*" }));
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});

var upload = multer({storage: storage });

app.post("/file", upload.single("file"), (req, res) => {
  const file = req.file;
  res.send(file);
});

app.post("/multipleFiles", upload.array('files'), (req, res) => {
  const files = req.files;
  res.send(files);
});

app.get("/download",(req,res)=> {
  res.download('./uploads/'+req.headers.content)
})