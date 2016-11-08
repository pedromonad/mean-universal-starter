import * as express from 'express';
import * as clientCtrl from '../controllers/client';
import commentCtrl from '../controllers/comment';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/clients - Get list of clients */
  .get(clientCtrl.list)

  /** POST /api/clients - Create new client */
  .post(clientCtrl.create);

router.route('/:clientId')
  /** GET /api/clients/:clientId - Get client */
  .get(clientCtrl.get)

  /** PUT /api/clients/:clientId - Update client */
  .put(clientCtrl.update)

  /** DELETE /api/clients/:clientId - Delete client */
  .delete(clientCtrl.remove);



router.route('/:clientId/comments')
  .post(commentCtrl.create)

  .get(commentCtrl.get);

router.route('/:clientId/comments/:commentId')  
  .delete(commentCtrl.remove);


/** Load client when API with clientId route parameter is hit */
router.param('clientId', clientCtrl.load);

export default router;
