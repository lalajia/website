import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

app.get("/ping", (req, res) => {
  res.send("pong");
});

// show all contents with pagination
app.get("/content", async (req, res) => {
  const contents = await prisma.Content.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(contents);
});

// creates a content
app.post("/content", async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    res.status(400).json({ error: "Title and body are required" });
  } else {
    const content = await prisma.Content.create({
      data: { title, body },
    });
    res.json(content);
  }
});

//show all the content to all people, but when click on certain content it will need authorized to show the details like the comments
app.get("/content/:id", requireAuth, async (req, res) => {
  const { id } = req.params;

  const content = await prisma.content.findUnique({
    where: { id: parseInt(id) },
  });

  if (!content) {
    return res.status(404).json({ error: "Content not found" });
  }

  // Only include comments if user is authenticated
  if (req.auth) {
    content.comments = await prisma.comment.findMany({
      where: { contentId: parseInt(id) },
      include: { user: true },
    });
  }

  res.json(content);
});

// create a comment for a content
app.post("/content/:id/comment", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const auth0Id = req.auth.payload.sub;

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  if (!user) {
    return res.status(403).json({ error: "User not found" });
  }

  const comment = await prisma.comment.create({
    data: {
      body: text,
      userId: user.id,
      contentId: parseInt(id),
    },
  });

  res.json(comment);
});

// delete a comment for a content
app.delete("/content/:id/comment/:commentId", requireAuth, async (req, res) => {
  const { id, commentId } = req.params;
  const auth0Id = req.auth.payload.sub;

  const comment = await prisma.comment.findUnique({
    where: {
      id: parseInt(commentId),
    },
    include: {
      user: true,
    },
  });

  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }

  if (comment.user.auth0Id !== auth0Id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  await prisma.comment.delete({
    where: {
      id: parseInt(commentId),
    },
  });

  res.json({ message: "Comment deleted" });
});

// update a comment for a content
app.put("/content/:id/comment/:commentId", requireAuth, async (req, res) => {
  const { id, commentId } = req.params;
  const { text } = req.body;
  const auth0Id = req.auth.payload.sub;

  const comment = await prisma.comment.findUnique({
    where: {
      id: parseInt(commentId),
    },
    include: {
      user: true,
    },
  });

  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }

  if (comment.user.auth0Id !== auth0Id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const updatedComment = await prisma.comment.update({
    where: {
      id: parseInt(commentId),
    },
    data: {
      body: text,
    },
  });

  res.json(updatedComment);
});

// get Profile information of authenticated user
app.get("/me", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  // user.comments = await prisma.comment.findMany({
  //   where: { userId: parseInt(user.id) },
  // });

  res.json(user);
});

app.put("/user/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (isNaN(parseInt(id))) {
    return res.status(200).json("Invalid id");
  }

  const updateUser = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
    },
  });

  res.json(updateUser);
});

// verify user status, if not registered in our database we will create it
app.post("/verify-user", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  if (user) {
    res.json(user);
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        auth0Id,
        name,
      },
    });

    res.json(newUser);
  }
});

// Starts HTTP Server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
