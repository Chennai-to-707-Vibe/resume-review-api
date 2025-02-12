
// export MONGO_URI=mongodb://appUser:resumereviewey-admin@localhost:27017/resume-reviewer?authSource=resume-reviewer 
//export JWT_SECRET = "6b9f3c8d7aaf1c2e5e3b59d4c4a8e9f0324b7d9c1a3e6d5f8c2e4a7b6d9f1e3c"


db.createUser({
    user: "appUser",
    pwd: "resumereviewey-admin",
    roles: [{ role: "readWrite", db: "resume-reviewer" }]
});

