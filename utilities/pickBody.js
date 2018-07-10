const Genres = require('../models/genresModel');

module.exports = (requestBody) => {

    return new Promise((resolve , reject) => {

        let schemaObj = Genres.schema.obj;
        let schemaKeys = Object.keys(schemaObj);
        let body = {}
        for(let key in schemaKeys)
        {
            if(schemaObj[schemaKeys[key]].ComeFromReq === 'MUST')
            {
                if(!requestBody[schemaKeys[key]])
                {
                    return reject({error : `${schemaKeys[key]} must be included in request`});
                }
                body[schemaKeys[key]] = requestBody[schemaKeys[key]];

            }
            else if(schemaObj[schemaKeys[key]].ComeFromReq === 'MAYBE')
            {
                if(!requestBody[schemaKeys[key]])
                {
                    continue;
                }
                body[schemaKeys[key]] = requestBody[schemaKeys[key]];
            }
            else{
                continue;
            }
        }
        
        return resolve(body);
        
    })
}

