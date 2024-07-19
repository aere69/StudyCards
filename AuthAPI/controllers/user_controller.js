const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async register(req, res, next) {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password,10);

            const user = new User({ username, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: 'User Registration Successful'});
        } catch (error) {
            res.status(500).json({ error: 'User Registration Failed'})
        }
    },

    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if(!user) {
                return res.status(401).json({ error: 'Authentication Failed' })
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch) {
                return res.status(401).json({ error: 'Authentication Failed' })
            }

            if(!process.env.KEY){
                return res.status(500).json({ error: 'Missing KEY'})
            }

            const token = jwt.sign({ userId: user._id }, process.env.KEY, { expiresIn: '1h'});
            res.status(200).json(token);
        } catch {
            res.status(500).json({ error: 'Login Failed' });
        }
    }
}