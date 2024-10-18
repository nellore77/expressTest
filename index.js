import express from "express";

const app = express();

const port = 3000;

/* app.get("/",(req,res)=>{
    res.send("Hello from app.get")
})
 */

app.use(express.json()); // accept data coming in json format

let arrData = [];
let nextID = 1;

// add new data
app.post("/data", (req, res) => {
  console.log("post /data called --> req.body: ", req.body);
  const { name, price } = req.body; // extract data from request

  const newData = { id: nextID++, name, price };
  arrData.push(newData);

  // status -> 201 ->   request succeeded, and a new resource was created as a result.
  res.status(201).send(newData);
});

//get all data
app.get("/data", (req, res) => {
  console.log("get /data called ");
  // status -> 200 ->  request succeeded
  res.status(200).send(arrData);
});

//get individual data
app.get("/data/:id", (req, res) => {
  console.log("get /data/id called ");

  const t = arrData.find((t) => t.id === parseInt(req.params.id));
  if (!t) {
    return res.status(404).send(" data not present");
  }
  res.status(200).send(t);
});

//update data
app.put("/data/:id", (req, res) => {
  const t = arrData.find((t) => t.id === parseInt(req.params.id));

  if (!t) {
    return res.status(404).send(" data not present");
  }
  const { name, price } = req.body;

  t.name = name;
  t.price = price;
  res.status(200).send(t);
});

//delete data
app.delete("/data/:id", (req, res) => {
  const t = arrData.findIndex((t) => t.id === parseInt(req.params.id));
  if (t === -1) {
    return res.status(404).send(" data not present");
  }

  arrData.splice(t, 1);
  return res.status(204).send(" data deleted ");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
