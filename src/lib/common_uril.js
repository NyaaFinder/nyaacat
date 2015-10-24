
exports.isStringEmpty = function(str){
    if(!str || str === '') {
        return true;
    }
    return false;
};

exports.generateToken = function(str1, str2){
    return str1 + str2 + 'lalala';
};
