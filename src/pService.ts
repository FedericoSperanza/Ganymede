const Fetch = require('node-fetch');
const _ = require('underscore');
module.exports = {
  startScrapper: async function (searchWord: string) {
    console.log("##Word Sent ",searchWord)
    let data ={
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            searchString: searchWord
          })
    }
    if (process.env.inHeroku){
    console.log("* Using Heroku *")
    const res = await Fetch("https://themisto-api-fsperanza.herokuapp.com/scrapSearch",data)
    let body = await res.json()
    return body
    }else{
    const res = await Fetch("http://localhost:4000/scrapSearch",data)
    let body = await res.json()
    return body
    }
  },
};