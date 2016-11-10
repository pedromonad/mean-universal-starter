const ClientCtrl = require('./controller');
const router = require('express').Router();

router.get('/', ClientCtrl.list);
router.get('/:clientId', ClientCtrl.load);
router.post('/', ClientCtrl.create);
router.put('/:clientId', ClientCtrl.update);
router.delete('/:clientId', ClientCtrl.remove);
router.get('/:clientId/comments', ClientCtrl.getComments);
router.delete("/:clientId/comments/:commentId", ClientCtrl.removeComment);

/** Load client when API with clientId route parameter is hit */
router.param('clientId', ClientCtrl.load);

export = router;