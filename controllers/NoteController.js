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
const NoteRepositories = require('../repositories/NoteRepo.js');

// ################################ Response Messages ################################ //
const responseMessages = require('../ResponseMessages.js');

/*
|------------------------------------------------ 
| API name          :  noteCreate
| Response          :  Respective response message in JSON format
| Logic             :  Create Note
| Request URL       :  BASE_URL/api/create_note
| Request method    :  POST
| Author            :  Mainak Saha
|------------------------------------------------
*/
module.exports.noteCreate = (req, res) => {
    (async () => {
        let purpose = "Create Note";
        try {
            let userID = req.headers.userID;
            let body = req.body;

            let createData = {
                userID: userID,
                title: body.title,
                description: body.description,
                tag: body.tag
            }
            let noteCreate = await NoteRepositories.create(createData);

            return res.send({
                status: 200,
                msg: responseMessages.noteCreate,
                data: noteCreate,
                purpose: purpose
            })
        }
        catch (err) {
            console.log("Create Note Error : ", err);
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
| API name          :  noteList
| Response          :  Respective response message in JSON format
| Logic             :  Fetch Note List
| Request URL       :  BASE_URL/api/fetch_note_list
| Request method    :  GET
| Author            :  Mainak Saha
|------------------------------------------------
*/
module.exports.noteList = (req, res) => {
    (async () => {
        let purpose = "Fetch Note List";
        try {
            let userID = req.headers.userID;

            let noteList = await NoteRepositories.find({ userID: userID });

            return res.send({
                status: 200,
                msg: responseMessages.noteList,
                data: noteList,
                purpose: purpose
            })
        }
        catch (err) {
            console.log("Fetch Note List Error : ", err);
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
| API name          :  noteDetail
| Response          :  Respective response message in JSON format
| Logic             :  Fetch Note Detail
| Request URL       :  BASE_URL/api/fetch_note_detail:id
| Request method    :  GET
| Author            :  Mainak Saha
|------------------------------------------------
*/
module.exports.noteDetail = (req, res) => {
    (async () => {
        let purpose = "Fetch Note List";
        try {
            let userID = req.headers.userID;
            let params = req.params;

            let noteDetail = await NoteRepositories.findOne({ _id: params.id, userID: userID });

            if (!noteDetail)
                return res.send({
                    status: 404,
                    msg: responseMessages.noteNotFound,
                    data: {},
                    purpose: purpose
                })
            else
                return res.send({
                    status: 200,
                    msg: responseMessages.noteDetails,
                    data: noteDetail,
                    purpose: purpose
                })
        }
        catch (err) {
            console.log("Fetch Note List Error : ", err);
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
| API name          :  noteUpdate
| Response          :  Respective response message in JSON format
| Logic             :  Update Note
| Request URL       :  BASE_URL/api/update_note/:id
| Request method    :  PUT
| Author            :  Mainak Saha
|------------------------------------------------
*/
module.exports.noteUpdate = (req, res) => {
    (async () => {
        let purpose = "Update Note";
        try {
            let userID = req.headers.userID;
            let params = req.params;
            let body = req.body;

            let noteDetail = await NoteRepositories.findOne({ _id: params.id, userID: userID });

            if (!noteDetail)
                return res.send({
                    status: 404,
                    msg: responseMessages.noteNotFound,
                    data: {},
                    purpose: purpose
                })

            let updateData = {};

            if (body.title)
                updateData.title = body.title;
            if (body.description)
                updateData.description = body.description;
            if (body.tag)
                updateData.tag = body.tag;

            let updateNote = await NoteRepositories.updateMany({ _id: params.id, userID: userID }, updateData);

            return res.send({
                status: 200,
                msg: responseMessages.noteUpdate,
                data: updateNote,
                purpose: purpose
            })
        }
        catch (err) {
            console.log("Update Note Error : ", err);
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
| API name          :  noteDelete
| Response          :  Respective response message in JSON format
| Logic             :  Delete Note
| Request URL       :  BASE_URL/api/delete_note/:id
| Request method    :  DELETE
| Author            :  Mainak Saha
|------------------------------------------------
*/
module.exports.noteDelete = (req, res) => {
    (async () => {
        let purpose = "Delete Note";
        try {
            let userID = req.headers.userID;
            let params = req.params;

            let noteDetail = await NoteRepositories.findOne({ _id: params.id, userID: userID });

            if (!noteDetail)
                return res.send({
                    status: 404,
                    msg: responseMessages.noteNotFound,
                    data: {},
                    purpose: purpose
                })

            let deleteNote = await NoteRepositories.deleteOne({ _id: params.id, userID: userID });

            return res.send({
                status: 200,
                msg: responseMessages.noteDelete,
                data: deleteNote,
                purpose: purpose
            })
        }
        catch (err) {
            console.log("Delete Note Error : ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}