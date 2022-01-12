const {Router} = require ("express")
const router = Router () ;

const userCourt = require ("./user/court")  // trae las diferentes rutass al index 
const userBooking = require ("./user/booking")
const user = require ("./user/user")
const userFavorites = require ("./user/user-favorites")
const userAvailability = require ("./user/availability")
const supplierCourt = require ("./supplier/court")  
const supplierAvailability = require ("./supplier/availability")
const supplierPayments = require ("./supplier/payments")
const supplier = require ("./supplier/supplier")
const supplierContact = require ("./supplier/contact")


router.use("/", userCourt ) 
router.use("/", userBooking )
router.use ("/", user)
router.use ("/", userFavorites)
router.use ("/", userAvailability)
router.use ("/", supplierAvailability)
router.use ("/", supplierCourt)
router.use ("/" , supplierPayments )
router.use ("/", supplier)
router.use ("/", supplierContact)



module.exports = router
