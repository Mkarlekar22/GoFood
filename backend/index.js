const express = require('express')
const mongoDB = require("./db")

const port = 5000;

const app = express();

mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",
        "http://localhost:3000"
    );
    res.header("Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
}) 

app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
// Routes
app.get('/', (req, res) => {
    res.send('Hello World....');
});


app.post('/api/createuser', (req, res) => {
    res.send({ success: true });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
