import  express  from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import cookieParser from "cookie-parser"
import { db } from "./db.js";
import cors from "cors"
import multer from "multer";

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())


// app.get("/getMysqlStatus", (req, res) => {
//     db.ping((err) => {
//       if(err) return res.status(500).send("MySQL Server is Down");
//       res.send("MySQL Server is Active");
//     })
//   });


// function to store the images into multer storage 
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../blog-app/public/upload')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now()+file.originalname)
//   }
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../blog-app/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage})


app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file;
    res.json(file.filename)
})

app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)

app.listen(8080,()=>{
    console.log("Listenned");
})
