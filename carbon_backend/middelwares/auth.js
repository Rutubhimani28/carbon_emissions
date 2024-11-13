import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// const auth = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         res.status(401).json({ message: "Authentication failed , Token missing" });
//     }
//     try {
//         const decode = jwt.verify(token, process.env.SECRET_KEY);
//         req.user = decode;
//         next();
//     } catch (err) {
//         res.status(500).json({ message: 'Authentication failed. Invalid token.' })
//     }
// }

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader ? authHeader.split('Bearer ')[1] : null;
        let decodedToken;

        if (!token) {
            return res.status(401).json({ message: 'Access denied. Authentication token is required' });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Authentication failed. Invalid or Expired token!' });
            }

            decodedToken = user;
        });

        let user = await User.findOne({ _id: decodedToken?.userId });

        if (!user) {
            return res.status(401).json({ message: "Authentication failed!" });
        }

        req.user = { ...user, userId: user._id };
        next();

    } catch (error) {
        return res.status(401).json({ message: "Authentication failed!" });
    }
};

export default auth;