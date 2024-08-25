const express = require("express");
const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));

// POST endpoint to accept JSON and return the required details
app.post("/bfhl", (req, res) => {
  console.log(req.body); // Log the request body
  const { status, userID, collegeEmail, rollNumber, dataArray } = req.body;

  if (!status || !userID || !collegeEmail || !rollNumber || !dataArray) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const numberArray = dataArray.filter((item) => typeof item === "number");
  const alphabetArray = dataArray.filter(
    (item) => typeof item === "string" && /^[a-zA-Z]$/.test(item)
  );
  const highestLowercaseAlphabet = alphabetArray
    .filter((item) => /^[a-z]$/.test(item))
    .sort()
    .pop();

  res.json({
    status: status,
    userID: userID,
    collegeEmailID: collegeEmail,
    collegeRollNumber: rollNumber,
    numberArray: numberArray,
    alphabetArray: alphabetArray,
    highestLowercaseAlphabet:
      highestLowercaseAlphabet || "No lowercase letters found",
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
// GET endpoint to return an operation code
app.get("/bfhl", (req, res) => {
  console.log("Hello World");
  const operationCode = Math.floor(Math.random() * 10000); // Example operation code generation
  res.json({ operationCode: operationCode });
});

// Server listening on port 3000
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
