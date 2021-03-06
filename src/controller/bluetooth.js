var util = require('util');
var Pet = util.getModel('pet');
var petPosition = util.getModel('pet_position');
var petCoordinate = util.getModel('pet_coordinate');
var async = require('async');

module.exports = function(router) {
    router.put("/", function(req, resp) {
        var body = req.body;
        var pet_id, timestamp;
        //参数校验

        var rssi = parseInt(rssi);
        var lat = parseFloat(lat);
        var lng = parseFloat(lng);

        if (!body) return resp.status(401).end('No body!');
        if (rssi === 'NaN') return resp.status(401).end('rssi type error!');
        if (lng === 'NaN') return resp.status(401).end('lng type error!');
        if (lat === 'NaN') return resp.status(401).end('lat type error!');
        if (typeof body.identifier !== 'string') return resp.status(401).end('identifier type error!');


        async.waterfall([
        	function(next) {
        		Pet.where({bluetooth : body.identifier}).find(next);
        	},
        	function(pet, sql, next) {
        		if (!pet || !pet.length) return resp.status(404).end('Not find pet!');
                pet_id = pet[0].pet_id;
                timestamp = body.timestamp;
        		petPosition.build({
        			pet_id : pet[0].pet_id,
		        	rssi : body.rssi,
		        	lng : body.lng,
		        	lat : body.lat,
		        	timestamp : body.timestamp
        		}).save(next);
        	},
            function(petPosition, sql, next) {
                petCoordinate.calculateCoordinate(pet_id, timestamp, next)
            }
        ], function(err, data) {
        	if (err) return resp.status(401).send({
                is_success: false,
                message : err.message
            });
            resp.send({
                is_success: true,
                position: data
            });
        	return resp.status(200).end();
        });
    });

    router.get("/", function(req, resp) {
        var body = req.query;
        var limit = 50;
        if(!req.query || !req.query.token) return resp.status(401).end('Have no token!');
        if(req.query && req.query.limit) limit = req.query.limit;

        async.waterfall([
            function(next) {
                Pet.where({token : req.query.token}).find(next);
            },
            function(pet, sql, next) {
                if(!pet || !pet.length) return resp.status(404).end('Not find pet!');
                petCoordinate.where({
                    pet_id : pet[0].pet_id
                }).limit([0, limit]).orderBy('timestamp DESC').find(next, true);
            }
        ], function(err, data) {
            console.log(data);
            if (err) return resp.status(401).send({
                is_success: false,
                message : err.message
            });
            data = data.reduce(function(res, d) {
                res.unshift(d);
                return res;
            }, []);
            resp.send({
                is_success: true,
                pet_coordinate: data
            });
            return resp.status(200).end();
        })
    });
};

