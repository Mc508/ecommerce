/**
 * POST localhost:8080/ecomm/api/v1/auth/signup 
 */

const authController=require('../controllers/auth.controller')
const authMw = require("../middlewares/auth_mw")

module.exports=(app)=>{
    app.post('/ecomm/api/v1/auth/signup',[authMw.verifySignUpBody],authController.signup)
    
    /**route.for signin */
    app.post('/ecomm/api/v1/auth/signin',authController.signin)
}

