import express from "express"
import { createServer } from "node:http";
import "./config/db.mjs"
import "./config/auth-local-startegy.mjs"
import authRoutes from "./routes/auth.mjs"
import cookieParser from "cookie-parser"; //useri loginde saxlamaq uchun
import expressSession from "express-session"
import usersRoutes from "./routes/users.mjs"
import passport from "passport";
import postsRouter from "./routes/post.mjs"
import commentRoutes from "./routes/comment.mjs"
import friendRoutes from "./routes/friendship.mjs"
import cors from "cors";
import { initalizeSocket } from "./socket/index.mjs";
import conversationRoutes from "./routes/conversation.mjs";


const app = express();
const server = createServer(app);
initalizeSocket(server);

app.use(cors({
  origin: process.env.FE_BASE_URL,
  credentials: true, 
}));
app.use(express.json());

app.use(cookieParser())

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false, // false elemesek sessionun ichindeki data deyishmese bele onu tekrar-tekrar db-ye yazacaq
    saveUninitialized: false, // false elemesek session yaradacaq her defe, false edende sessiona data yazanda save edir 
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30
    }
  }))
app.use(passport.initialize())
app.use(passport.session())
app.get('/', (req, res) => {
  res.send('Hello, Welcome to Social Media');
});

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Method: ${req.method}`);
  console.log(`Request Headers:`, req.headers);
  console.log(`Request Body:`, req.body);
  next();
});


app.use("/post", postsRouter)

app.use("/public", express.static("src/public"));

app.use("/auth", authRoutes)

app.use("/users", usersRoutes)

app.use ("/comment", commentRoutes)

app.use ("/friendship", friendRoutes)

app.use("/conversation", conversationRoutes);


app.use('/images', express.static('public/images'));




app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);


});
