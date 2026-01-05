import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import prisma from "../prismaClient.js";

//bcrypt is used for encrypting passwords
//jwt is a json web token which is a alhpha numberic secure password to authenticate users without needing them to sign up again

const router = express.Router();

//Register a new user endpoint -> auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  //encrypt the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  //save the new user and hashed password to the db
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    //now that we have a user, we want to add their first todo for them
    const defaultTodo = `Hello! Add your first todo!`;
    await prisma.todo.create({
      data: {
        task,
        userId: user.id,
      },
    });

    //create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503); //Internal server error (backend error)
  }
});

//Login -> auth/login
router.post("/login", async (req, res) => {
  //we get user's email, and we look up the password associated with that email in the database
  //but we get it back and see it's encrypted, which means that we cant compare it to the one the user just used trying to login
  // so what we can do is that we encrypt the password again and compare

  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }
    //hash the entered password by bcrypt and compare with the password in database
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    console.log(user);
    //then we have a successful authentification
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.sendStatus(503);
  }
});

export default router;
