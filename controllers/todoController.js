const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://test:test@cluster0.e9r4g.mongodb.net/todo?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("connected");
});

const todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model("lists",todoSchema);

// var data = [{item: 'get milk'},{item: 'walk dog'},{item: 'draw iron man'}]
module.exports = function(app){
    app.get('/todo', (req, res) => {
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo',{todos:data});
        });
    });

    app.post('/todo', function(req, res){
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        });

    });

    app.delete('/todo/:item', (req, res) => {
        Todo.find({item: req.params.item.replace(/\- /g, " ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });
};