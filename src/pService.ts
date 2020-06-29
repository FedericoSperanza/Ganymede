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
    const res = await Fetch("http://localhost:4000/scrapSearch",data)
    let body = await res.json()
    return body
  },
};