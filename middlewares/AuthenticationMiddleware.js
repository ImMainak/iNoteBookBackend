const jwt = require("jsonwebtoken");
const responseMessages = require("../ResponseMessages");

// ################################ Repositories ################################ //
const UserRepo = require("../repositories/UserRepo");

// ################################ Globals ################################ //
const jwtOptionsAccess = global.constants.jwtAccessTokenOptions;

//User Authentication
module.exports.authenticateRequestAPI = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let accessToken = req.headers.authorization.split(" ")[1];
            jwt.verify(
                accessToken,
                jwtOptionsAccess.secret,
                async (err, decodedToken) => {
                    if (err) {
                        return res.status(401).json({
                            status: 401,
                            msg: responseMessages.authFailure,
                        });
                    } else {
                        let userCount = await UserRepo.count({ _id: decodedToken.user_id });
                        if (userCount == 0) {
                            return res.status(401).json({
                                status: 404,
                                msg: responseMessages.userNotFound,
                            });
                        }

                        if (userCount) {
                            req.headers.userID = decodedToken.user_id;
                            next();
                        } else {
                            return res.status(401).json({
                                status: 401,
                                msg: responseMessages.authFailure,
                            });
                        }
                    }
                }
            );
        } else {
            return res.status(401).json({
                status: 401,
                msg: responseMessages.authRequired,
            });
        }
    } catch (e) {
        console.log("Middleware Error : ", e);
        res.json({
            status: 500,
            message: responseMessages.serverError,
        });
    }
};