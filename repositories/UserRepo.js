const User = require('../models/users');

module.exports.create = (data) => {
    return new Promise((resolve, reject) => {
        let userCreate = new User(data);
        userCreate.save().then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.updateMany = (where, data) => {
    return new Promise((resolve, reject) => {
        User.updateMany(where, data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findOne = (where) => {
    return new Promise((resolve, reject) => {
        User.findOne(where).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.count = (where) => {
    return new Promise((resolve, reject) => {
        User.countDocuments(where).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.find = (where, data) => {
    return new Promise((resolve, reject) => {
        User.find(where).skip(data?.offset ?? 0).sort({ date: -1 }).limit(data?.limit ?? 0).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}