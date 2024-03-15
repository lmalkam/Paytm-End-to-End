const express = require('express');
const app = express();
const port = 3000;
const jwtPassword = "123456";
require('dotenv').config()
const jwt = require('jsonwebtoken');
const AuthMiddleware = require('./middleware');
const PasswordSchema = require('./db');
const User = require('./models/User');

async function UserExists(name, password) {
    try {
        const user = await User.findOne({ name: name });
        return user !== null;
    } catch (error) {
        // Handle any errors that occur during the query
        console.error("Error in UserExists:", error);
        return false; // Return false in case of any error
    }
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.get('/signup', async function (req, res) {

    const { name, password } = req.body;

    console.log(req.body);
    try {
        PasswordSchema.parse(password)
    }
    catch (error) {
        return res.status(411).json(error.msg)
    }

    if ((await UserExists(name, password))) {
        return res.status(403).json({
            msg: "User exist in our database",
        })
    }

    const UserDetails = new User({
        name: name,
        password: password
    });

    UserDetails.save().then(doc => {
        res.send(doc);
    })
        .catch(err => console.log(err))
})


app.post('/signin', async function (req, res) {
    const { name, password } = req.body;

    if (!(await UserExists(name, password))) {
        return res.status(403).json({
            msg: "User doesn't exist in our database",
        })
    }

    var token = jwt.sign({ name: name, password: password }, jwtPassword);
    return res.json({
        token,
    });
})

app.get('/users', AuthMiddleware, async function (req, res) {
    const token = req.headers.authorization;

    console.log("Token:", token); // Check if the token is being received

    try {
        const decoded = jwt.verify(token, jwtPassword);
        console.log("Decoded:", decoded); // Check the decoded information

        const name = decoded.name;
        let people = [];
        const data = await User.find({ name: name });

        if (data) {
            const allUsers = await User.find({});
            for (let i = 0; i < allUsers.length; i++) {
                if (allUsers[i].name !== data[0].name) {
                    people.push(allUsers[i]);
                }
            }
            res.status(200).json(people);
        }
    } catch (err) {
        console.error(err); // Log the error for further investigation
        return res.status(403).json({
            msg: "Invalid Token",
        });
    }
});


app.put("/update", AuthMiddleware, async (req, res) => {

    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, jwtPassword);
        const name = decoded.name;

        const { NewPassword } = req.body;

        try {
            PasswordSchema.parse(NewPassword);

            const user = await User.findOne({ name: name });

            if (user) {
                user.password = NewPassword;
                await user.save();
                return res.status(200).json({msg:"Sucess"});
            }
            else {
                return res.status(403);
            }

        }
        catch (error) {
            return res.status(411).json({ msg: "PAssword length is short" });
        }
    }
    catch (error) {
        return res.status(403).json({ msg: "error in update" });
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})