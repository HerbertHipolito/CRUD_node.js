const {format} = require('date-fns');
const {v4: uuid} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) =>{
    
    const date = `${format(new date(),'dd/MM/yyyy\tHH:mm:ss')}`;
    const logData = `${date} ${uuid()} ${message}`;

    console.log(logid);

    try{
        await fsPromises.appendFile(path.join(__dirname,'logs','eventLogs.txt'),logData);
    }catch(error){
        console.log(error);
    }

}


const registerLogger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}


module.exports = {registerLogger,logEvents};
