import { Router } from 'express'
import asyncFn from '../middlewares/asyncMiddleware'
import ProductController from '../controllers/ProductController'
import ProductCategoryController from '../controllers/ProductCategoryController'
import ProductBrandController from '../controllers/ProductBrandController'
import productValidator from '../validations/validators/ProductValidator'
import validate from '../middlewares/validationMiddleware'

const productController = new ProductController()
const productCategoryController = new ProductCategoryController()
const productBrandController = new ProductBrandController()

const router = Router()

router.get('/category', asyncFn(productCategoryController.list.bind(productCategoryController)))
router.post('/category', validate(productValidator.validateCategory()),
  asyncFn(productCategoryController.create.bind(productCategoryController)))
router.get('/category/:id', asyncFn(productCategoryController.show.bind(productCategoryController)))
router.put('/category/:id', validate(productValidator.validateCategory(false)),
  asyncFn(productCategoryController.update.bind(productCategoryController)))
router.delete('/category/:id', asyncFn(productCategoryController.destroy.bind(productCategoryController)))

router.get('/brand', asyncFn(productBrandController.list.bind(productBrandController)))
router.post('/brand', validate(productValidator.validateBrand()),
  asyncFn(productBrandController.create.bind(productBrandController)))
router.get('/brand/:id', asyncFn(productBrandController.show.bind(productBrandController)))
router.put('/brand/:id', validate(productValidator.validateBrand(false)),
  asyncFn(productBrandController.update.bind(productBrandController)))
router.delete('/brand/:id', asyncFn(productBrandController.destroy.bind(productBrandController)))

router.get('/', asyncFn(productController.list.bind(productController)))
router.post('/', validate(productValidator.validateProduct()),
  asyncFn(productController.create.bind(productController)))
router.get('/:id', asyncFn(productController.show.bind(productController)))
router.put('/:id', validate(productValidator.validateProduct(false)),
  asyncFn(productController.update.bind(productController)))
router.delete('/:id', asyncFn(productController.destroy.bind(productController)))

export default router
