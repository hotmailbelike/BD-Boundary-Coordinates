import express from 'express';
import boundCtrl from '../controllers/bound.controller';

const router = express.Router();

/*  
router.route('/api/writeAll').post(boundCtrl.writeAll);
*/

router.route('/api/filterLocation').post(boundCtrl.filterLocation);

// router.param('boundId', userCtrl.userByID)
export default router;
