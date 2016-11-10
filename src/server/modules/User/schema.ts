'use strict';

/**
 * User schema
 * @module User
 */

const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
 * List of users
 * @method list
 * @param filter Object with filter conditions
 * @param skip Number of rows skipped
 * @param limit Number of rows
 * @param sort Sort expression
 * @param select Field names to include, space separated
 * @return {Promise<any>}
 */
userSchema.statics.list = function(filter?: any,
                               skip?: number, limit?: number,
                               sort?: string, select?: string): Promise<any> {
    try {

        let query = this.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);    
        /*let query = User.find(filter);
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
 * Get user
 * @param {ObjectId} id - The objectId of user.
 * @returns {Promise<User, Error>}
 */
userSchema.statics.get = function(id: number): Promise<any> {
    try {
        return this.findById(id)
                    .exec();
    } catch (err) {
        return Promise.reject(err);
    }
};

export = userSchema;
