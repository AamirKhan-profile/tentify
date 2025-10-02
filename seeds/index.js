const mongoose = require("mongoose");
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');
const tentify = require('../models/tentify');
mongoose.connect("mongodb://127.0.0.1:27017/tentify", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected successfully!");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedb = async()=>
{ 
await tentify.deleteMany({});
for(let i=0; i<=100; i++)
{
let random700 = Math.floor(Math.random()*700);
const add = new tentify({
  location:`${cities[random700].city}, ${cities[random700].state}`,
  title:`${sample(descriptors)} ${sample(places)}`
});
add.save();
}
}
seedb();