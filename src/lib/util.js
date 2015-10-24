/**
 * XadillaX created at 2015-10-24 14:35:51 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
var util = require("util");

/**
 * getModel
 * @param {String} modelName the model name
 * @return {Model} the model object
 */
util.getModel = function(modelName) {
    modelName = modelName.underscore();
    return require("model/" + modelName);
};

module.exports = util;
