const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

const users =[];
const threadList = [];
const generateId = () => Math.random().toString().substring(2,10);

//Register API
app.post("/api/register", async(req,res)=>{
    const {email, password, username} = req.body;
    const id = generateId();
    const result = users.filter(
        (user) => user.email === email && user.password === password
    );

    if (result.length === 0) {
        const newUser = { id, email, password, username };
        // adds the user to the database (array)
        users.push(newUser);
        // returns a success message
        return res.json({
            message: "Account created successfully!",
        });
    }
    // if there is an existing user
    res.json({
        error_message: "User already exists",
    });
})
//Login API
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    // checks if the user exists
    let result = users.filter(
        (user) => user.email === email && user.password === password
    );
    // if the user doesn't exist
    if (result.length !== 1) {
        return res.json({
            error_message: "Incorrect credentials",
        });
    }
    // Returns the id if successfuly logged in
    res.json({
        message: "Login successfully",
        id: result[0].id,
    });
});

//Thread API
app.post("/api/create/thread", async(req, res) => {
    const {thread, userId } = req.body;
    let threadId = generateId();
    //add post details to the array
    threadList.unshift({
        id: threadId,
        title: thread,
        userId,
        replies: [],
        likes: [],
    });
    // Returns a response containing the posts
    res.json({
        message: "Thread created successfully!",
        threads: threadList,
    });
})

//Get threads API
app.get("/api/all/threads", (req, res) => {
	res.json({
		threads: threadList,
	});
});

//Likes API
app.post("/api/thread/like", async(req, res)=>{
    const {threadId, userId} = req.body;
    const result = threadList.filter((thread)=>thread.id === threadId);
    const threadLikes = result[0].likes;
    const authenticateReaction = threadLikes.filter((user) => user === userId);
    if (authenticateReaction.length === 0) {
        threadLikes.push(userId);
        return res.json({
            message: "You've reacted to the post!",
        });
    }
    // Returns an error user has reacted to the post earlier
    res.json({
        error_message: "You can only react once!",
    });
})

//replies API
app.post("/api/thread/replies", (req, res) => {
    const { id } = req.body;
    const result = threadList.filter((thread) => thread.id === id);
    res.json({
        replies: result[0].replies,
        title: result[0].title,
    });
});

//Post reply API
app.post("/api/create/reply", async (req, res) => {
    const { id, userId, reply } = req.body;
    const result = threadList.filter((thread) => thread.id === id);
    const user = users.filter((user) => user.id === userId);
    result[0]?.replies.unshift({
        userId: user[0]?.id,
        name: user[0]?.username,
        text: reply,
    });

    res.json({
        message: "Response added successfully!",
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});