const express = require('express')
const mongoDB = require("./db")
const cors = require('cors');
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
app.use('/api',require("./Routes/OrderData"));

app.post('/api/auth/OrderData', cors({
    origin: 'http://localhost:3000',
    methods: ['POST'],
    credentials: true
}), (req, res) => {
    console.log('Order Data:', req.body);
    res.status(200).send({ message: 'Order received successfully!' });
});


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
