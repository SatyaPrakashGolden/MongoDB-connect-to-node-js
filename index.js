const { MongoClient } = require("mongodb");
const db=require("prompt-sync")
// Connection URI
const uri ='mongodb://localhost:27017';
const DBname='fruitDB';

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    insertDocuments(db,function(){
 client.close();
    });
  }
}
run().catch(console.dir);


const insertDocuments=function(db,callback){
    const collection=db.collection('fruit');
    collection.insertMany([
    {
        name:"Apple",
        score:8,
        review:"Good fruit"
    },
    {
        name:"Mango",
        score:10,
        review:"nice fruit"
    },
    {
        name:"Orange",
        score:7,
        review:"Nice fruit"
    }
    ],function(err,result){
        assert.equal(err,null);
        assert.equal(3,result.result.n);
        assert.equal(3,result.ops.length);
        console.log("Inserted three documented");
        callback(result);
    });
};