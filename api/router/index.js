const Router = require('express').Router
const userController = require('../controllers/user-controller')
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')
const router = new Router()
const saleController = require('../controllers/sale-controller.js')
const adminController = require('../controllers/admin-controller')

// user part router
router.post(
	'/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 4, max: 36 }),
	userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

router.post('/sendRecoverMail', userController.sendrecover)
router.post('/sendRecoverCode', userController.checkRecoverCode)
router.post('/resetPassword', userController.resetPassword)

router.get('/activate/:link', userController.activate)

router.get('/refresh', userController.refresh)
router.get('/getAllusers', userController.getUsers)
router.post('/access', userController.validateAccess)
// sale part router
router.post('/addSale', authMiddleware, saleController.addSale)
router.post('/deleteSale', saleController.saleDelete)

router.get('/getSale', saleController.getSale)
router.post('/updateSale', saleController.saleUpdate)
router.post('/toggleSave', saleController.saleSave)

router.get('/fetchSales', saleController.getAllSales)

//admin
router.post('/saleApprove', saleController.saleApprove)
router.post('/saleDecline', saleController.saleDecline)

router.post('/admin/checkPassword', adminController.checkPassword)
router.post('/admin/checkMailCode', adminController.checkCode)
module.exports = router
