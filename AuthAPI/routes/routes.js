const UserController = require('../controllers/user_controller');
const VerifyToken = require('../middleware/authMiddleware');

module.exports = (app) => {
    app.get('/', VerifyToken, (req, res) => {
        res.status(200).json({ message: 'Protected Route access granted'});
    });
    //--- Users ---
    app.post('/register', UserController.register);
    app.post('/login', UserController.login);
}