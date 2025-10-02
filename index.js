const express = require('express')
const app = express();
const path = require('path');
const methodOveride = require('method-override');
const mongoose = require("mongoose");
const tentify = require('./models/tentify');

mongoose.connect("mongodb://127.0.0.1:27017/tentify", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected successfully!");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride('_method'));



app.post('/tentifies', async(req, res) =>
{
  console.log(req.body);
   const tentifie = new tentify(req.body);
   await  tentifie.save();

   res.redirect(`/tentifies`);
});
app.get('/', (req, res)=>
{
    res.render('home');
});

app.get('/tentifies/new', async (req, res)=>{
    res.render('addForm');
});

app.get('/tentifies', async (req, res)=>
{
  const tenties = await tentify.find({});
    res.render('tentifies', { tenties });
});

app.get('/tentifies/:id/edit', async (req, res) =>
{
   const tenty = await tentify.findById(req.params.id);
    res.render('editForm', { tenty });
})


app.get('/tentifies/:id', async (req, res)=>
{    const tenty = await tentify.findById(req.params.id);
    res.render('singletenty', { tenty });
});

// app.delete('/tentifies/:id/deleting', async (req, res)=>
// {    const { id } = await tentify.findByIdAndDelete(id);
//     res.redirect('/tentifies')
// });
app.get('/tentifies/:id/deleting', async (req, res)=>
{    const { id } = req.params
 await tentify.findByIdAndDelete(id);
    res.redirect('/tentifies');
});


app.put('/tentifies/:id/edit', async (req, res) =>
{
  const {id}  = req.params;
  const tenty = await tentify.findByIdAndUpdate(id, {...req.body});
  tenty.save();
  res.redirect(`/tentifies/${id}`);
})






app.listen('3000', ()=>{
    console.log('Server is listening ta 3000 port');

})