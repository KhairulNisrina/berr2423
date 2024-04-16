const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');

app.use(express.json())

// new user registration
app.post('/user', async (req, res) => {
  // check if username already exist
  let existing = await client.db("sample_mflix").collection("users").findOne({
    username: req.body.username
  })

  if (existing) {
    res.status(400).send("username already exist")
  } else {
  // insertOne the registration data to mongo
  const hash = bcrypt.hashSync(req.body.password, 10);
  let result = await client.db("sample_mflix").collection("users").insertOne(
    {
      username: req.body.username,
      password: hash,
      name: req.body.name,
      email: req.body.email
    }
  )
  res.send(result)
}
  // console.log(req.body)
})

// user login api
app.post('/login', async (req, res) => {
  // step #1:
  if(req.body.username != null && req.body.password !== null) {
  let result = await client.db("sample_mflix").collection("users").findOne({
    username: req.body.username
  })

  if (result) {
    // step #2: if user exist, check if password is correct
    // console.log(req.body.password)
    // console.log(result.password)
     if(bcrypt.compareSync(req.body.password, result.password) == true) {
      // password is correct
      res.send("login successfully " + result.name)
    } else {
      // password is incorrect
      res.send('wrong password')
    };

  } else {
    // step #3: if user not found
    res.status(401).send("username is not found")
  }
} else {
  res.status(400).send("missing username or password")
}
})

// get user profile
app.get('/user/:siapadia/:emaildia', async (req, res) => {
  // findOne
})

app.get('/', (req, res) => { // '/' defined endpoint
  res.send('Hi World!')
})

app.post('/hello', (req, res) => {
  res.status(200).send('Hello World!')
})

app.get('/subjects', async (req, res) => {
  let subjects = await client.db('sample_mflix').collection('subjects').find().toArray()
  console.log(subjects)
  res.send(subjects)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://B022210192:Nisrina03@cluster0.1xclluv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect(); //promise-async function
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // insert a subjects into sample_mflix database
    // let result = await client.db('sample_mflix').collection('subjects').insertOne(
    //   {
    //    subject: 'BERR 2423',
    //    description: 'Database and Cloud',
    //    code: 'BERR 2423',
    //    credit: 3
    //   }
    // )
    // console.log(result)

    // to find subjects
    // let subjects = await client.db('sample_mflix').collection('subjects').find(
    //  {
    //    credit: 3
    //  }
    // ).toArray()
    // console.log(subjects)

    // to update document
    // let updated = await client.db('sample_mflix').collection('subjects').updateOne(
    //  { code: 'BERR 3532' },
    //  {
    //    $set: {
    //      description: 'Data Science',
    //       lecturer: 'Dr Soo',
    //       sem: 3
    //     }
    //   }
    // )
    // console.log(updated)

    // let deleted = await client.db('sample_mflix').collection('subjects').deleteOne(
    //   {
    //     _id: new ObjectId('660b6424e3de0954262c99b2')
    //   }
    // )

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

