var ResponseService = {
    unauthorized(res, err){
        res.status(401).send(err);
    },
    
    success(res, data, isJson){
        if(isJson){
            res.status(200).json(data);
        } else {
            res.status(200).send(data);
        }
    },
    
    error(res, err){
        res.status(500).send(err);
    }
}

module.exports = ResponseService;