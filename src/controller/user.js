var util = require('util');
var Pet = util.getModel('Pet');
var async = require('async');
var val = require('validator');

var common_util = require('lib/common_util');

module.exports = function(router) {

    router.get('/', function(req, resp){

        var token = req.query.token;
        var pet_id = req.query.pet_id;

        if(common_util.isStringEmpty(token)){
            return resp.status(400).json({ 
                is_success: false,
                message: 'user not login.' 
            });
        }

        if(!val.isInt(pet_id)){
            return resp.status(400).json({ 
                is_success: false,
                message: 'pet_id can not be null.' 
            });
        }
    
        async.waterfall([
            function(next){
                Pet.findById(pet_id, function(err, pet){
                    if(err){
                        return next(err);     
                    }
                    if(token !== pet.token) {
                        return resp.status(400).json({
                            is_success: false,
                            message: 'User not login.'
                        });
                    }

                    var data = {
                        is_success: true, 
                        pet_name: pet.pet_name,
                        email: pet.email,
                        pet_type: pet.pet_type,
                        bluetooth: pet.bluetooth
                    };

                    return next(null, data);
                });
            }
        ], function(err, result){
            if(err){
                return resp.status(500).json({
                    is_success: false,
                    message: 'System error'
                });  
            }
            return resp.send(result);
        });
        
    });

    router.post('/register', function(req, resp){
        var pet_name = req.body.pet_name;
        var pet_type = req.body.pet_type;
        var password = req.body.password;
        var mail = req.body.mail;
        var bluetooth = req.body.bluetooth;
        
        if(common_util.isStringEmpty(pet_name)||
           common_util.isStringEmpty(pet_type)||
           common_util.isStringEmpty(mail)||
           common_util.isStringEmpty(bluetooth)||
           common_util.isStringEmpty(password)){
            return resp.status(400).json({ 
                is_success: false,
                message: 'params invalid.' 
            });
        }

        async.waterfall([
            function(next){
                Pet.findByName(pet_name, function(err, pet){
                    if(err){
                        return next(err);
                    }
                    if(pet){
                        return resp.status(400).json({ 
                            is_success: false,
                            message: 'User has alreay exist.' 
                        });
                    }
                    return next(null, pet);
                });
            },
            function(pet, next){
                var data = {
                    pet_name: pet_name,
                    password: password,
                    mail: mail,
                    pet_type: pet_type,
                    bluetooth: bluetooth,
                    token: common_util.generateToken(pet_name, password)
                };
                Pet.create(data, function(err, pet){
                    if(err){
                        return next(err);
                    }
                    return next(null, pet);
                });
            }
        ], function(err, pet){
            if(err){
                return resp.status('500').json({
                    is_success: false,
                    message: 'System error'
                });
            }

            return resp.send({
                is_success: true,
                token: pet.token
            });
        });
    });

    router.post('/login', function(req, resp){
        var pet_name = req.body.pet_name;
        var password = req.body.password;

        if(common_util.isStringEmpty(pet_name)){
            return resp.status(400).json({ 
                is_success: false,
                message: 'pet_name can not be null.' 
            });
        }
        if(common_util.isStringEmpty(password)){
            return resp.status(400).json({ 
                is_success: false,
                message: 'password can not be null.' 
            });
        }

        async.waterfall([
            function(next){
                Pet.findByNameAndPassword(pet_name, password, function(err, pet){
                    if(err){
                        return next(err);
                    }

                    return next(null, pet);
                });
            },
            function(pet, next){
                if(!pet){
                    return next(null, null);    
                }

                pet.token = common_util.generateToken(pet_name, password);
                pet.update(function(err, pet){
                    if(err){
                        return next(err);
                    }
                    return next(null, pet);
                });
            }
        ], function(err, pet){
            if(err){
                return resp.status(500).json({
                    is_success: false,
                    message: 'System error'
                });
            }
            if(!pet){
                return resp.status(400).json({
                    is_success: false,
                    message: 'Can not find user or password is wrong.'
                });
            } else {
                return resp.send({
                    is_success: true,
                    token: pet.token
                });                
            }
        });
    });
};
