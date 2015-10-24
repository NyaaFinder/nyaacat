var util = require('util');
var Pet = util.getModel('pet');
var petPosition = util.getModel('pet_position');
var async = require('async');

module.exports = function(router) {
    router.put("/", function(req, resp) {
        var body = req.body;
        console.log(body);

        //参数校验
        if (!body) return resp.status(401).end('No body!');
        if (typeof body.rssi !== 'number') return resp.status(401).end('rssi type error!');
        if (typeof body.lng !== 'number') return resp.status(401).end('lng type error!');
        if (typeof body.lat !== 'number') return resp.status(401).end('lat type error!');

        async.waterfall([
        	function(next) {
        		Pet.where({bluetooth : body.identifier}).find(next);
        	},
        	function(pet, sql, next) {
                console.log(pet[0].pet_id);
        		if (!pet || !pet.length) return resp.status(404).end('Not find this pet!');
        		petPosition.build({
        			pet_id : pet[0].pet_id,
		        	rssi : body.rssi,
		        	lng : body.lng,
		        	lat : body.lat,
		        	timestamp : body.timestamp
        		}).save(next);
        	}
        ], function(err) {
        	if (err) return resp.status(401).end(err);
        	return resp.status(200).end();
        });
    });
};

