import { catchAsync } from 'catch-async-express'
import { Router } from 'express'
import multer from 'multer'
import mediaController from '../controllers/media.controller'
import { scopeChecker } from '../middlewares/scope.middleware'
import { Scopes } from '../configs/scopes'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = Router()

router.post(
  '/',
  catchAsync(upload.single('file')),
  scopeChecker([Scopes.MEDIA.UPLOAD]),
  catchAsync(mediaController.uploadImage)
)

export default router
