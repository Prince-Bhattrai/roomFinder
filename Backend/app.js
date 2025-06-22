import express from "express"
import { configDotenv } from "dotenv"
import cors from "cors";
import { getUser, login, signup } from "./Controller/controller.user.js";
import { deletePost, getAllPost, getOnePost, post, searchPost, updatepost } from "./Controller/controller.post.js";
import { upload } from "./auth/multerSetup.js";
import { verifyToken } from "./auth/veryfyToken.js"; // If JWT is used


//middleware
const app = express()
app.use(express.json())
app.use(cors())
app.use("/uploads",express.static("uploads/"))
app.use(express.urlencoded({ extended: true }))



//User Routes
app.post("/user/signup",signup)
app.post("/user/login",login)
app.get("/user/one/:id",getUser)

//Post routes
app.post("/user/post",upload.single("video"),verifyToken,post)
app.delete("/user/post/delete/:id",/*verifyToken,*/deletePost)
app.put("/user/post/update/:id",verifyToken,updatepost)
app.get("/user/post/getone/:id",/*verifyToken,*/getOnePost)
app.get("/user/post/all",/*verifyToken,*/getAllPost)
app.get("/user/post/search",searchPost)





export default app;