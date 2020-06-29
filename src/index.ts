const Express = require('express')
const mongoose = require('mongoose')


class App{
    app = Express();
    port: number = 3000;
    constructor(){
        this.app.use(require('body-parser').json())
        this.app.use(require('body-parser').urlencoded({ extended: true }));
        this.database()
        this.routes()
        this.app.listen(process.env.PORT || this.port,() => {
            console.log(`Listening Port ${this.port || process.env.PORT } *Ganymede*`)
        })
    }


    routes(){
        this.app.use(require('./routes/routing'))
    }

    database(){
    mongoose.connect(`mongodb://federico:1234@cluster0-shard-00-00-7zdru.mongodb.net:27017,cluster0-shard-00-01-7zdru.mongodb.net:27017,cluster0-shard-00-02-7zdru.mongodb.net:27017/SearchOrders?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology:true});
    mongoose.connection.on('error',() => {
        console.log("Se produjo error en BD")
    })
    }
}

new App();
