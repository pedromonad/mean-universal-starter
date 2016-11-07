import Client from '../models/client';

/**
 * Load client and append to req.
 */
function load(req, res, next, id) {
  Client.get(id)
    .then((client) => {
      req.client = client; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get client
 * @returns {Client}
 */
function get(req, res) {
  return res.json(req.client);
}

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
function create(req, res, next) {
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

  client.save()
    .then(savedClient => res.json(savedClient))
    .catch(e => next(e));
}

/**
 * Update existing client
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
function update(req, res, next) {
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

    client.save()
        .then(savedClient => res.json(savedClient))
        .catch(e => next(e));
}

/**
 * Get client list.
 * @property {number} req.query.skip - Number of clients to be skipped.
 * @property {number} req.query.limit - Limit number of clients to be returned.
 * @returns {Client[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Client.list({ limit, skip })
    .then(clients => res.json(clients))
    .catch(e => next(e));
}

/**
 * Delete client.
 * @returns {Client}
 */
function remove(req, res, next) {
  const client = req.client;
  client.remove()
    .then(deletedClient => res.json(deletedClient))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
