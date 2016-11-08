import Client = require('../models/ClientSchema');

class CommentController {

  /**
   * Load client and append to req.
   */
  get(req, res) {
    return res.json(req.client.comments);
  }
  /**
   * Create new comment
   * @property {string} req.body.info - The info of client.
   * @returns {Client}
   */
  create(req, res, next) {
    const client = req.client;
    const comment = {
      description: req.body.description,
    };

    client.comments.push(comment);
    client.save()
      .then(savedClient => res.json(savedClient.comments.pop()))
      .catch(e => next(e));
  }

  /**
   * Delete comment.
   * @returns {Client}
   */
  remove(req, res, next) {
    const client = req.client;
    client.comments.pull({ _id: req.params.commentId });
    client.save()
      .then(savedClient => res.json(savedClient))
      .catch(e => next(e));

  }

}

export = CommentController;