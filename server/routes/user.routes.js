const { Router } = require("express");
const userController = require("../controllers/user.controller"); 
const router = new Router();

router.get('', userController.getUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.post('', userController.createUser.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));

module.exports = router;
