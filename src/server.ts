import app from "./app";

const { NODE_ENV, PORT } = process.env;

const portNum: number = parseInt(PORT || "4000");

app.listen(portNum, () => {
  console.log(`Server runing on port ${portNum} on ${NODE_ENV}`);
});