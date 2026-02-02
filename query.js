//mongosh
//use amazon
//show dbs
//show collections

db.products.insertOne(
    {
        name: "Iphone",
        price: 10000,
        rating: 4.5
    }
)

db.products.insertMany([
    {
        name: "Samsung",
        price: 80000,
        rating: 4.3
    },
    {
        name: "OnePlus",
        price: 60000,
        rating: 4.4
    },
    {
        name: "Realme",
        price: 25000,
        rating: 4.1
    }
])

db.products.find({name: "Iphone"})

db.products.find().limit(2)

db.products.find().limit(3).skip(1)

db.products.find().sort()

db.products.find().sort({price: 1}) //ascending order

db.products.find().sort({price: -1}) //descending order

db.products.find().count()

db.products.find({price: {$eq: 25000}}) //greater than

db.products.find({price: {$gt: 25000}}) //greater than

db.products.find({price: {$gte: 25000}})

db.products.find({price: {$ne: 25000}})

db.products.find({price: {$lte: 25000}})

db.products.find({$and: [{price: {$gte: 25000}}, {rating: {$gte: 4.0}}]})

db.products.find({$or: [{price: {$gte: 80000}}, {rating: {$gte: 4.5}}]})

db.products.updateOne(
    {name: "Iphone"},
    {$set:{name: "Iphone 15 Pro Max"}}
)
db.products.updateOne(
    {price:10000},{$inc:{price:90000}}
)

db.products.updateMany(
    {},{$inc:{rating:0.1}}
)

db.products.updateMany(
    {name:{$in: ["Samsung","OnePlus"]}},{$inc:{price: 10000}}
)
db.products.deleteOne(
    {name: "Realme"}
)

db.products.find({name:{$exists: true}})

db.products.find({name:{$exists: false}})
