use mydatabase
db.createUser(
  {
    user: "admin",
    pwd: "pass",
    roles: [
       { role: "readWrite", db: "mydatabase" }
    ]
  }
)

use mytestdatabase
db.createUser(
  {
    user: "admin",
    pwd: "pass",
    roles: [
       { role: "readWrite", db: "mydatabase" }
    ]
  }
)