const structure = require('../model/structure');
const path = require('path');


const structures = async (part) =>{ 
    
    const results = await structure.find({tag:part}).exec();
    let tags = {};
    
    for (let i = 0; i < results.length; i++) {
        tags[results[i].tag] = results[i].code;
    }

    return tags;

}
 

module.exports = structures;