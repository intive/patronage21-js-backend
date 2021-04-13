const express = require('express')
const { check } = require('express-validator')

const usersController = require('../controllers/user')

const router = express.Router()

router.post(
  '/register',
  [check('gender', 'Nieprawidłowa płeć').isIn(['man', 'woman']),
    check('name', 'Nie wprowadzono imienia').not().isEmpty(),
    check('surname', 'Niewprowadzono nazwiska').not().isEmpty(),
    check('email', 'Nie wprowadzono adresu email').not().isEmpty(),
    check('email', 'Nieprawidłowy adres email').normalizeEmail().isEmail(),
    check('phone', 'Nieprawidłowy telefon').isLength({ min: 9 }),
    check('password', 'Nie wprowadzono hasła').not().isEmpty(),
    check('password', 'Zbyt słabe hasło').isLength({ min: 6 }),
    check('technologies', 'Nie wybrano żadnej technologii').isArray({ min: 1 }),
    check('technologies', 'Maksymalna liczba technologii to 3').isArray({ max: 3 })
  ],
  usersController.register
)

module.exports = router
