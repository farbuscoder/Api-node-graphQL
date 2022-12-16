import User from "../models/users.js";

//REGISTER AN USER

export const signUp = (req, res, next) => {
  res.json({ message: "Registrado" });
  console.log("Registrado");
};

//LOGIN AN USER

export const signIn = (req, res, next) => {
  res.json({ message: "Logged" });
  console.log("Logged");
};
