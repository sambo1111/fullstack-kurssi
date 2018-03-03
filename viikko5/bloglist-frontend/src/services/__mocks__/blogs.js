let token = null

const blogs = [
    {
        "_id": {
            "$oid": "5a932cc2f6b60612ab3c8d67"
        },
        "title": "Algorithms",
        "author": "Dijkstra",
        "url": "www.algo.com",
        "likes": 534,
        "user": {
            "$oid": "5a9082e2cd21517013faa851"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5a934c2e0ea57350b9c1dbe7"
        },
        "title": "Big Guns",
        "author": "Arnold",
        "url": "www.guns.com",
        "likes": 15,
        "user": {
            "$oid": "5a9082e2cd21517013faa851"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5a934dec0ea57350b9c1dbe9"
        },
        "title": "Quik mafs",
        "author": "Albert",
        "url": "www.mafs.com",
        "likes": 11,
        "user": {
            "$oid": "5a9082e2cd21517013faa851"
        },
        "__v": 0
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }