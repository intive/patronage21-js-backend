const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users-sample')

/**
 * @swagger
 * /:
 *  get:
 *      description: Retrieve list of all users
 *      responses:
 *              '200':
 *                  description: A list of all users
 */
router.get('/', usersController.getAllUsers)

/**
 * @swagger
 * /id:
 *  get:
 *      description: Retrieve specific user
 *      parameters:
 *        - name: id
 *          required: true
 */
router.get('/:id', usersController.getSingleUser)
router.post('/new', usersController.addNewUser)
router.put('/edit/:id', usersController.editUser)
router.delete('/delete/:id', usersController.deleteUser)

module.exports = router
