# NoSQL

## MongoDB

mongodb is a document-oriented NoSQL database used for high volume data storage. Instead of using tables and rows as in the traditional relational databases, MongoDB makes use of collections and documents. Documents consist of key-value pairs which are the basic unit of data in MongoDB. Collections contain sets of documents and function which is the equivalent of relational database tables.

### Installation

```bash
docker run --name test-mongo -dit -p 27017:27017 mongo:4.4.1
```

### Connect to MongoDB

```bash
docker exec -it test-mongo mongo
```

### Mongo shell commands

```bash
show dbs; # show all databases
use adoption; # create and switch to adoption database
db.pets.insertOne({name: "Luna", type: "dog", breed: "Havanese", age: 8}); # insert a document into pets collection if it doesn't exist it will be created
db.pets.count(); # count the number of documents in pets collection
db.pets.help(); # show all commands available for pets collections
db.stats(); # show stats for the current database 
```

### Querying MongoDB

```bash
db.pets.findOne(); # find the first document in pets collection
db.pets.findOne(type: "dog"); # find the first document in pets collection where type is dog
db.pets.find(); # find all documents in pets collection
db.pets.find(type: "dog"); # find all documents in pets collection where type is dog

db.pets.insertMany(
  Array.from({ length: 10000 }).map((_, index) => ({
    name: [
      "Luna",
      "Fido",
      "Fluffy",
      "Carina",
      "Spot",
      "Beethoven",
      "Baxter",
      "Dug",
      "Zero",
      "Santa's Little Helper",
      "Snoopy",
    ][index % 9],
    type: ["dog", "cat", "bird", "reptile"][index % 4],
    age: (index % 18) + 1,
    breed: [
      "Havanese",
      "Bichon Frise",
      "Beagle",
      "Cockatoo",
      "African Gray",
      "Tabby",
      "Iguana",
    ][index % 7],
    index: index,
  }))
); 
# insert 10000 documents into pets collection

db.pets.count({type: "dog", age: 9}); 
# count the number of documents in pets collection where type is dog and age is 9

db.pets.find({type: "dog", age: 9}).limit(40); 
# find the first 40 documents in pets collection where type is dog and age is 9

db.pets.find({type: "dog", age: 9}).limit(40).toArray(); 
# find the first 40 documents in pets collection where type is dog and age is 9 and convert the result to an array

db.pets.count({type: "cat", age: {$gt: 12}}); 
# count the number of documents in pets collection where type is cat and age is greater than 12

db.pets.count({type: "cat", age: {$gte: 12}}); 
# count the number of documents in pets collection where type is cat and age is greater than or equal to 12

db.pets.count({type: "cat", age: {$eq: 12}}); 
# count the number of documents in pets collection where type is cat and age is equal to 12

db.pets.count({type: "cat", age: {$ne: 12}}); 
# count the number of documents in pets collection where type is cat and age is not equal to 12

db.pets.count({type: "cat", age: {$lt: 12}}); 
# count the number of documents in pets collection where type is cat and age is less than 12

db.pets.count({type: "cat", age: {$lte: 12}}); 
# count the number of documents in pets collection where type is cat and age is less than or equal to 12
```

### MongoDB Logical Operators

```bash
db.pets.count({type: "bird", $and: [ { age: { $gte: 4}, age: { $lte: 8 } } ]}); 
# count the number of documents in pets collection where type is bird and age is between 4 and 8

db.pets.count({type: "bird", $or: [ { age: { $lt: 4}, age: { $gt: 8 } } ]}); 
# count the number of documents in pets collection where type is bird and age is less than 4 or greater than 8

db.pets.find({type: "dog"}).sort({age: -1}).limit(500).toArray(); 
# find the first 500 documents in pets collection where type is dog and sort them by age in descending order
```

### Projection in MongoDB

```bash
db.pets.find({ type: "dog"}, {name: 1}).limit(5);
# find the first 5 documents in pets collection where type is dog and return only the name field

db.pets.find({ type: "dog"}, {name: 1, _id: 0}).limit(5);
# find the first 5 documents in pets collection where type is dog and return only the name field and exclude the _id field

db.pets.find({ type: "dog"}, {name: true, breed: true , _id: false}).limit(5);
# find the first 5 documents in pets collection where type is dog and return only the name and breed fields and exclude the _id field

db.pets.find({ type: "dog"}, {_id: false}).limit(5);
# find the first 5 documents in pets collection where type is dog and exclude the _id field
```

### Update in MongoDB

```bash
db.pets.updateOne({type: "dog", name: "Luna", breed: "Havanese" } , {$set: { owner: "Mohamed Shebl"} } );
# update the first document in pets collection where type is dog, name is Luna and breed is Havanese and set the owner field to Mohamed Shebl

db.pets.updateMany( {type: "dog"}, {$inc: {age: 1} } );
# update all documents in pets collection where type is dog and increment the age field by 1
```

### Delete in MongoDB

```bash
db.pets.deleteMany( {type: "reptile", breed: "Havanese"})
# delete all documents in pets collection where type is reptile and breed is Havanese

db.pets.findOneAndDelete({name: "Fido", type: "reptile"});
# find the first document in pets collection where name is Fido and type is reptile and delete it
```

### Indexing in MongoDB

```bash
```
