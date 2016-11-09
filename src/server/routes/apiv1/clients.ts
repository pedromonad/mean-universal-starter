'use strict';

let Client = require('../../models/Client');
const router = require('express').Router();

router.get('/', list);
/**
 * GET /
 * @param req
 * @param res
 * @param next
 */
export async function list(req, res, next) {
    try {
        const { limit = 50, skip = 0 } = req.query;
        let data = await Client.list({ limit, skip });
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


router.get('/:clientId', load);
/**
 * Get client
 * @returns {Client}
 */
export async function load(req, res, next, id) {
    try {
        let data = await Client.get(id);
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


router.post("/", create);
/**
 * Create new client
 * @property {string} req.body.name - The name of client.
 * @property {string} req.body.lastName - The lastName of client.
 * @property {string} req.body.rg - The rg of client.
 * @property {string} req.body.cpf - The cpf of client.
 * @property {string} req.body.maritalStatus - The maritalStatus of client.
 * @property {string} req.body.sex - The sex of client.
 * @property {string} req.body.address - The address of client.
 * @property {string} req.body.city - The city of client.
 * @property {string} req.body.state - The state of client.
 * @property {string} req.body.phone - The phone of client.
 * @property {string} req.body.facebook - The facebook of client.
 * @property {string} req.body.email - The email of client.
 * @property {string} req.body.birthday - The birthday of client.
 * @property {string} req.body.info - The info of client.
 * @returns {Client}
*/
export async function create(req, res, next) {
    try {
        const client = new Client({
            name: req.body.name,
            lastName: req.body.lastName,
            rg: req.body.rg,
            cpf: req.body.name,
            maritalStatus: req.body.maritalStatus,
            sex: req.body.sex,
            address: req.body.address,
            city: req.body.name,
            state: req.body.state,
            phone: req.body.phone,
            facebook: req.body.facebook,
            email: req.body.email,
            birthday: req.body.birthday,
            info: req.body.info
        });
        let data = await client.save();
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


router.put("/:clientId", update);
/**
 * GET /
 * @param req
 * @param res
 * @param next
 */
export async function update(req, res, next) {
    const client = req.client;
    client.name = req.body.name;
    client.lastName = req.body.lastName;
    client.rg = req.body.rg;
    client.cpf = req.body.cpf;
    client.maritalStatus = req.body.maritalStatus;
    client.sex = req.body.sex;
    client.city = req.body.city;
    client.state = req.body.state;
    client.phone = req.body.phone;
    client.facebook = req.body.facebook;
    client.email = req.body.email;
    client.birthday = req.body.birthday;
    client.info = req.body.info;

    try {
        let data = await client.save();
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


router.delete('/:clientId', remove);
/**
 * Delete client.
 * @returns {Client}
 */
export async function remove(req, res, next) {
    try {
        const client = req.client;
        let data = await client.remove();
        res.json({success: true, data});
    } catch (err) {
        next(err);
    }
}


/** Load client when API with clientId route parameter is hit */
router.param('clientId', load);


export {router};
