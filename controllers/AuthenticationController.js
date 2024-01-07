/*!
 * AuthenticationController.js
 * Containing all the controller actions related to `User`
 * Author: Mainak Saha
 * Date: 27th December, 2023`
 * MIT Licensed
 */
/**
 * Module dependencies.
 * @private
 */

// ################################ Repositories ################################ //
const UserRepositories = require('../repositories/UserRepo.js');

// ################################ Response Messages ################################ //
const responseMessages = require('../ResponseMessages.js');

// ################################ NPM Packages ################################ //
const md5 = require('md5');
const jwt = require('jsonwebtoken');

// ################################ Globals ################################ //
const jwtOptionsAccess = global.constants.jwtAccessTokenOptions;
const jwtOptionsRefresh = global.constants.jwtRefreshTokenOptions;


/*
|------------------------------------------------ 
| API name          :  userRegister
| Response          :  Respective response message in JSON format
| Logic             :  User Registration
| Request URL       :  BASE_URL/api/register
| Request method    :  POST
| Author            :  Mainak Saha
|------------------------------------------------
*/
module.exports.userRegister = (req, res) => {
    (async () => {
        let purpose = "User Registration";
        try {
            let body = req.body;
            
            let userData = await UserRepositories.findOne({ email: body.email });

            if (!userData) {
                let createData = {
                    name: body.name,
                    email: body.email.toLowerCase(),
                    password: md5(body.password)
                }

                let createResponse = await UserRepositories.create(createData);

                delete createResponse.password;
                let accessToken = jwt.sign({ user_id: createResponse._id, email: createResponse.email }, jwtOptionsAccess.secret, jwtOptionsAccess.options);
                let refreshToken = jwt.sign({ user_id: createResponse._id, email: createResponse.email }, jwtOptionsRefresh.secret, jwtOptionsRefresh.options);

                createResponse['access_token'] = accessToken;
                createResponse['refresh_token'] = refreshToken;

                return res.send({
                    status: 200,
                    msg: responseMessages.registrationSuccess,
                    data: createResponse,
                    purpose: purpose
                })
            }
            else {
                return res.send({
                    status: 409,
                    msg: responseMessages.duplicateEmail,
                    data: {},
                    purpose: purpose
                })
            }
        }
        catch (err) {
            console.log("User Registration Error : ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}

/*
|------------------------------------------------ 
| API name          :  userLogin
| Response          :  Respective response message in JSON format
| Logic             :  User Login
| Request URL       :  BASE_URL/api/login
| Request method    :  POST
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.userLogin = (req, res) => {
    (async () => {
        let purpose = "User Login";
        try {
            let body = req.body;
            let whereData = {
                email: body.email,
                password: md5(body.password)
            }
            let userData = await UserRepositories.findOne(whereData);

            if (userData) {
                let jwtOptionsAccess = global.constants.jwtAccessTokenOptions;
                let jwtOptionsRefresh = global.constants.jwtRefreshTokenOptions;
                let accessToken = jwt.sign({ user_id: userData._id, email: userData.email }, jwtOptionsAccess.secret, jwtOptionsAccess.options);
                let refreshToken = jwt.sign({ user_id: userData._id, email: userData.email }, jwtOptionsRefresh.secret, jwtOptionsRefresh.options);

                delete userData.password;

                userData['access_token'] = accessToken;
                userData['refresh_token'] = refreshToken;

                return res.send({
                    status: 200,
                    msg: responseMessages.loginSuccess,
                    data: userData,
                    purpose: purpose
                })
            } else {
                return res.send({
                    status: 403,
                    msg: responseMessages.invalidCreds,
                    data: {},
                    purpose: purpose
                })
            }
        } catch (e) {
            console.log("User Login ERROR : ", e);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}

/*
|------------------------------------------------ 
| API name          :  resetPassword
| Response          :  Respective response message in JSON format
| Logic             :  RESET PASSWORD
| Request URL       :  BASE_URL/api/resetPassword
| Request method    :  PUT
| Author            :  Mainak Saha
|------------------------------------------------
*/
module.exports.resetPassword = (req, res) => {
    (async () => {
        let purpose = "Reset Password";
        try {
            let body = req.body;
            let userDetails = await UserRepositories.findOne({ email: body.email });

            if (userDetails) {
                let updateUser = await UserRepositories.updateMany({ _id: userDetails._id }, { password: md5(body.password) });

                if (updateUser[0] != 0) {
                    return res.send({
                        status: 200,
                        msg: responseMessages.passwordreset,
                        data: {},
                        purpose: purpose
                    })
                } else {
                    return res.send({
                        status: 500,
                        msg: responseMessages.resetunable,
                        data: {},
                        purpose: purpose
                    })
                }
            } else {
                return res.send({
                    status: 404,
                    msg: responseMessages.invalidCreds,
                    data: {},
                    purpose: purpose
                })
            }
        } catch (e) {
            console.log("Reset Password ERROR : ", e);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })();
}