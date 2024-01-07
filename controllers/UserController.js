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

/*
|------------------------------------------------ 
| API name          :  userList
| Response          :  Respective response message in JSON format
| Logic             :  Fetch All User List
| Request URL       :  BASE_URL/api/all_user_list
| Request method    :  GET
| Author            :  Mainak Saha
|------------------------------------------------
*/
module.exports.userList = (req, res) => {
    (async () => {
        let purpose = "Fetch All User List";
        try {
            let userList = await UserRepositories.find({});

            return res.send({
                status: 200,
                msg: responseMessages.userList,
                data: userList,
                purpose: purpose
            })
        }
        catch (err) {
            console.log("Fetch All User List Error : ", err);
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
| API name          :  userDetail
| Response          :  Respective response message in JSON format
| Logic             :  Fetch User Detail
| Request URL       :  BASE_URL/api/user_detail
| Request method    :  GET
| Author            :  Mainak Saha
|------------------------------------------------
*/
module.exports.userDetail = (req, res) => {
    (async () => {
        let purpose = "Fetch User Detail";
        try {
            let userID = req.headers.userID;
            let userDetail = await UserRepositories.find({ _id: userID });

            return res.send({
                status: 200,
                msg: responseMessages.userDetails,
                data: userDetail,
                purpose: purpose
            })
        }
        catch (err) {
            console.log("Fetch User Detail Error : ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}