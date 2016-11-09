'use strict';

/**
 * Client model
 * @module Client
 */

let mongoose = require('mongoose');

let schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    rg: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    comments: [{
        description: { type : String },
        createdAt: { type : Date, default : Date.now }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//schema.index({location: '2dsphere'});

/**
 * List of clients
 * @method list
 * @param filter Object with filter conditions
 * @param skip Number of rows skipped
 * @param limit Number of rows
 * @param sort Sort expression
 * @param select Field names to include, space separated
 * @return {Promise<any>}
 */
schema.statics.list = function(filter?: any,
                               skip?: number, limit?: number,
                               sort?: string, select?: string): Promise<any> {
    try {

        let query = Client.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);    
        /*let query = Client.find(filter);
        query.sort(sort);
        query.skip(skip);
        query.limit(limit);
        query.select(select);*/
        return query.exec();
    } catch (err) {
        return Promise.reject(err);
    }
};

/**
 * Get client
 * @param {ObjectId} id - The objectId of client.
 * @returns {Promise<Client, Error>}
 */
schema.statics.get = function(id: number): Promise<any> {
    try {
        return Client.findById(id)
                    .exec();
    } catch (err) {
        return Promise.reject(err);
    }
};

var Client = mongoose.model('Client', schema);

export = Client;
