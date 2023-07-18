import { Router } from 'express'
// var secured = require('../lib/middleware/secured');
const router = Router()

/* GET user profile. */
router.get(
  '/user',
  /* secured(), */ (req: any, res: any, next: any) => {
    const { _raw, _json, ...userProfile } = req.user

    res.status(200).json(userProfile)
  }
)

export default router
