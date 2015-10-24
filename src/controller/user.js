var util = require('util');
var Pet = util.getModel('Pet');
var async = require('async');
var val = require('validator');

var common_util = require('../lib/common_util');

module.exports = function(router) {
    router.get("/", function(req, resp) {
        resp.send("Hello world!");
    });

    router.get("/hello", function(req, resp) {
        resp.send("Hello again!");
    });

    router.get('/user', function(req, resp){
        var token = req.query.token;
        var pet_id = req.query.pet_id;

        if(common_util.isStringEmpty(token)){
            //TODO redirect
            resp.status(400).json({ 
                is_success: false,
                message: 'can not be null.' 
            });
        }

        if(!val.isInt(pet_id)){
            resp.status(400).json({ 
                is_success: false,
                message: 'pet_id can not be null.' 
            });
        }

        Pet.getById(pet_id, function(err, pet){
            if(err){
                return resp.status(500).json({
                    is_success: false,
                    message: 'System error'
                });
            }
            var data = {
                is_success: true, 
                pet_name: pet.pet_name,
                email: pet.email,
                pet_type: pet.pet_type,
                bluetooth: pet.bluetooth
            };
            return resp.send(data);
        });
    });

    router.post('/user/register', function(req, resp){
        var pet_name = req.query.pet_name;
        var pet_type = req.query.pet_type;
        var password = req.query.password;
        var mail = req.query.mail;
        var bluetooth = req.query.bluetooth;

        if(common_util.isStringEmpty(pet_name)||
           common_util.isStringEmpty(pet_type)||
           common_util.isStringEmpty(mail)||
           common_util.isStringEmpty(bluetooth)||
           common_util.isStringEmpty(password)){
            resp.status(400).json({ 
                is_success: false,
                message: 'params invalid.' 
            });
        }

        async.waterfall([
            function(next){
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

    router.post('/user/login', function(req, resp){
        var pet_name = req.body.pet_name;
        var password = req.body.password;

        if(common_util.isStringEmpty(pet_name)){
            resp.status(400).json({ 
                is_success: false,
                message: 'pet_name can not be null.' 
            });
        }
        if(common_util.isStringEmpty(password)){
            resp.status(400).json({ 
                is_success: false,
                message: 'password can not be null.' 
            });
        }

        async.waterfall([
            function(next){
                pet.getByNameAndPassword(pet_name, password, function(err, pet){
                    if(err){
                        return next(err);
                    }
                    return next(null, pet);
                });
            },
            function(pet, next){
                if(pet){
                    pet.token = common_util.generateToken(pet_name, password);
                    pet.update(function(err, pet){
                        if(err){
                            return next(err);
                        }
                        return next(null, pet);
                    });
                }
                return next(null, pet);
            }
        ], function(err, pet){
            if(!pet){
                resp.status(400).json({
                    is_success: false,
                    message: 'Can not find user.'
                });
            } else {
                resp.send({
                    is_success: true,
                    token: pet.token
                });                
            }
        });
    });
};
