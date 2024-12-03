
const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

const mongoURI = "mongodb+srv://karlekar22:Pass%40123@cluster0.rwbau.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
            
         
                console.log('Connected to MongoDB');
            
            fetchData();
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
   
};

async function fetchData() {
    try {
        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function(err,data){
          
            const foodCategory = await  mongoose.connection.db.collection("foodCategory");
            foodCategory.find({}).toArray(function (err,catData){
                if(err) console.log(err);
                else{
                    global.food_items=data;
                    global.foodCategory= catData;
                }
            })
      
               
         
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

module.exports = mongoDB;

