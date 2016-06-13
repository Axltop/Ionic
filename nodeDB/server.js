const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/*SET UP DATABSE*/
var url = 'mongodb://localhost:27017/nodeDB';
MongoClient.connect(url, (err, database) => {
	if (err) return console.log(err)
	db = database
	app.listen(3000, () => {
		console.log('listening on 3000')
	})
})

/*GET*/
app.get('/',(req,res)=>{
	var cursor = db.collection('quotes').find().toArray(function(err,results){
		console.log(results)
	})

	db.collection('quotes').find().toArray((err,result)=>{
		if(err) return console.log(err)
		res.render('index.ejs',{quotes:result})
	})
})

/*POST*/
app.post('/quotes', (req,res) =>{
	db.collection('quotes').save(req.body,(err,result)=>{
		if(err)	return console.log(err)
		console.log('Saved to Database');
		res.redirect('/')
	})
})

/*PUT*/
app.put('/quotes',(req, res) =>{
	db.collection('quotes')
	.findOneAndUpdate({name:'Yoda'},{
		$set: {
			name:req.body.name,
			quote:req.body.quote
		}
	},
	{
		sort:{_id:-1},
		upsert:true
	}, (err, result) =>{
		if(err) return res.send(err)
		res.send(result)
	})
})

/*DELETE*/
app.delete('/quotes',(req, res) =>{

	db.collection('quotes')
		.findOneAndDelete({
			name:req.body.name
		},
		(err, result) =>{
			if (err) return res.send(500,err)
			res.send('{"delete":"success"}') 
		})
})
