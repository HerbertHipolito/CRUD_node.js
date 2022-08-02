const express = require('express');
router = express.Router();
const path = require('path');
const structure = require('../controller/structureEJS');

router.get( '^/$|/index(.html)?',(req,res) =>{
    structure(['header','footer']).then((tags)=>{
        res.render(path.join('..','views','index'),{
            header: tags['header'],
            footer:tags['footer'] 
            });
        }
    )  
});

module.exports = router;
