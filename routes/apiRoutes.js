const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// /* ############################################ Middlewares ############################################ */
const validateRequest = require("../middlewares/ValidateRequest");
const AuthenticationMiddlewares = require("../middlewares/AuthenticationMiddleware");

// /* ############################################ Joi Validation Schema ################################## */
const AuthSchemas = require("../validation-schemas/AuthSchemas");
const NoteSchemas = require("../validation-schemas/NoteSchemas");

// /* ############################################ Controllers ############################################ */
const authController = require("../controllers/AuthenticationController");
const userController = require("../controllers/UserController");
const noteController = require("../controllers/NoteController");

// /* ############################################ Authentication ############################################ */
router.post("/register", validateRequest.validate(AuthSchemas.userRegisterSchema, 'body'), authController.userRegister); // Register a user
router.post("/login", validateRequest.validate(AuthSchemas.userLoginSchema, 'body'), authController.userLogin); // User login
router.put("/resetPassword", validateRequest.validate(AuthSchemas.resetPasswordSchema, 'body'), authController.resetPassword); // User reset password

// /* ############################################ User ############################################ */
router.get("/all_user_list", AuthenticationMiddlewares.authenticateRequestAPI, userController.userList); // Fetch all user list
router.get("/user_detail", AuthenticationMiddlewares.authenticateRequestAPI, userController.userDetail); // Fetch user detail

// /* ############################################ Note ############################################ */
router.post("/create_note", AuthenticationMiddlewares.authenticateRequestAPI, validateRequest.validate(NoteSchemas.noteCreateSchema, 'body'), noteController.noteCreate); // Create note
router.get("/fetch_note_list", AuthenticationMiddlewares.authenticateRequestAPI, noteController.noteList); // Fetch note list
router.get("/fetch_note_detail/:id", AuthenticationMiddlewares.authenticateRequestAPI, noteController.noteDetail); // Fetch note detail
router.put("/update_note/:id", AuthenticationMiddlewares.authenticateRequestAPI, validateRequest.validate(NoteSchemas.noteUpdateSchema, 'body'), noteController.noteUpdate); // Update note
router.delete("/delete_note/:id", AuthenticationMiddlewares.authenticateRequestAPI, noteController.noteDelete); // Delete note

module.exports = router;