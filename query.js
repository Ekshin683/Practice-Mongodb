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

db.createCollection("user")
db.users.renameCollection("users")

db.users.insertMany(
    [
        {
            name:"Ekshin",
            age:21,
            email:"ekshin@gmail.com"
        },
        {
            name:"Leela",
            age:22,
            email:"leela@gmail.com"
        },
        {
            name:"ajay",
            age:21,
            email:"ajay@gmail.com"
        },
        {
            name:"vijay",
            age:23,
            email:"vijay@gmail.com"
        }
    ]
);

db.users.updateMany(
    {},
    {$push:{products:["Iphone 15 Pro Max","Samsung"]}}
)

db.users.updateOne(
    {name:"Ekshin"},
    {$push:{products:"Realme"}}
)

db.users.find({name:{$eq:"Ekshin"}})

db.users.updateOne(
    {name:"Ekshin"},
    {$pop:{products:1}} 
)

db.users.updateOne(
    {name:"Ekshin"},
    {$addToSet:{products:"Samsung"}}
)

db.users.updateOne(
    {name:"Ekshin"},
    {$pull:{products:"Samsung"}}
)

db.users.find(
    {email:"ekshin@gmail.com"}
).explain("executionStats")

db.users.getIndexes()

db.users.createIndexes({email:1})

db.users.find(
    {},
    {_id:0,name:1}
)

db.users.find(
    {},
    {_id:0,name:1}
).sort({name:1})

db.users.find(
    {},
    {_id:0,name:1}
).collation({locale:"en",strength:2}).sort({name:1})

db.users.aggregate(
    [
        {$match:{age:{$gt:20}}}
    ]
)

db.users.aggregate(
    [
        {$project:{_id:0,name:0,age:0}}
    ]
)

db.users.aggregate(
    [
        {$project:{_id:0,name:1,age:1}}
    ]
)

db.users.aggregate(
    [
        {$project:{_id:0,name:1,age:1}},
        {$sort:{name:1}},
        {$collation:{locale:"en",strength:2}},
        {$match:{age:{$gt:21}}},
        {$skip:1},
        {$limit:2}
    ]
) //getting error

db.users.aggregate(
    [
        {$project:{_id:0,name:1,age:1}},
        {$sort:{name:1}},
        {$match:{age:{$gt:21}}},
        {$skip:1},
        {$limit:2}
    ]
)

db.users.aggregate(
    [
        {$group:{_id:"$age", totalUsers:{$sum:1}}}
    ]
)
db.users.aggregate(
    [
        {$group:{_id:"$name", Maximumage:{$max:"$age"}}}
    ]
)
//$min, $avg, $sum, $first, $last,$multiply

// 04/02/2026

db.users.updateOne(
    {name:"vijay"},
    {$set:{address:
        {
            address1:"xyz street",
            city:"chennai",
            state:"Tamil Nadu",
        }
    }}
)

db.users.find({},{name:1,age:1,"address.city":1})

db.users.updateMany(
    {},
    {$set:{skills:["communication","teamwork"]}}
)

db.users.updateMany(
    {},
    {$unset:{skills:""}}
)
db.users.aggregate([
    {$project:
        {
            _id:0,
            name:1,
            products:1,
        }
    },
    {$unwind:"$products"}
])

db.users.updateOne(
    {name:"ajay"},
    {$set:{
        salary:120000
    }}
)

db.users.aggregate([
    {$project:{
        _id:0,
        name:1,
        salary:1,
        grade:{
            $cond:[
                {$gt:["$salary",100000]},
                "Grade A",
                "Grade B"
            ]
        }
    }}
])

db.users.aggregate([
    {$project:{
        _id:0,
        name:1,
        salary:1,
        grade:{
            $cond:{
            if:{$gt:["$salary",100000]},
            then:"Grade A",
            else:"Grade B",
            }
        }
    }}
])

db.users.aggregate([
    {$project:{
        _id:0,
        name:1,
        salary:1,
        grade:{
            $switch:{
                branches:[
                    {
                        case:{$gte:["$salary",100000]},
                        then:"Grade A"
                    },
                    {
                        case:{$gt:["$salary",70000]},
                        then:"Grade B",
                    }
                ],
                default:"grade C"
            }
        }
    }}
])


db.orders.insertMany([
    {
        usd: ObjectId('6982012d057833ac9a628ca0'),
        product: "Iphone 15 Pro Max",
        price:120000,
        quantity:1 
    },
    {
        usd: ObjectId('6982012d057833ac9a628ca1'),
        product: "Samsung",
        price:90000,
        quantity:2
    },
    {
        usd: ObjectId('6982012d057833ac9a628ca2'),
        product: "OnePlus",
        price:70000,
        quantity:1
    },
    {
        usd: ObjectId('6982012d057833ac9a628ca3'),
        product: "Iphone 15 Pro Max",
        price:120000,
        quantity:1
    }
])

db.orders.aggregate([
    {$project:{
        _id:0,
        product:1,
        price:1,
        totalAmount:{$multiply:["$price","$quantity"]}
    }}
])

db.users.aggregate([
    {$lookup:{
        from:"orders",
        localField:"_id",
        foreignField:"usd",
        as:"user_orders"
    }}
])

db.users.aggregate([
    {$lookup:{
        let:{userId:"$_id"},
        from:"orders",
        pipeline:[
            {
                $match:{
                    $expr:{
                        $eq:["$usd","$$userId"]
                    }
                }
            }
        ],
        as:"user_orders"
    }}
])


db.users.aggregate([
    {$lookup:{
        from:"orders",
        localField:"_id",
        foreignField:"usd",
        as:"user_orders"
    }},
    {$project:{
        _id:0,
        name:1,
        orders:"$user_orders.product"
    }}
])

db.users.aggregate([
    {$lookup:{
        let:{userId:"$_id"},
        from:"orders",
        pipeline:[
            {
                $match:{
                    $expr:{
                        $eq:["$usd","$$userId"]
                    }
                }
            }
        ],
        as:"user_orders"
    }},
    {$project:{
        _id:0,
        name:1,
        orders:"$user_orders.product"
    }}
])

db.users.aggregate([
    {$lookup:{
        let:{userId:"$_id"},
        from:"orders",
        pipeline:[
            {
                $match:{
                    $expr:{
                        $eq:["$usd","$$userId"]
                    }
                }
            }
        ],
        as:"user_orders"
    }},
    {$unwind:"$user_orders"},
    {$project:{
        _id:0,
        name:1,
        orders:"$user_orders.product"
    }}
])
