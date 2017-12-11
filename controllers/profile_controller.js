"use strict"
module.exports = function (app) {
    let userProfileModel = require('../models/user_profile_schema');
    let myGameCharacters = require('../models/game-character-schema');
    let expressValidator = require('express-validator');
    let session = require('express-session');
    let bodyParser = require('body-parser');
    let mongoose = require('mongoose');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressValidator());
    app.use(session({ secret: 'max', saveUninitialized: false, resave: false }));


    app.get('/profile', function (req, res) {

        res.render('profile');

    })
    app.get('/signup', function (req, res) {

        res.render('signup', { success: req.session.success, errors: req.session.errors });
        //req.session.errors = null;   

    })
    app.get('/login', function (req, res) {
        res.render('login');
    })
    app.post('/profile', function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        
        userProfileModel.findOne({email: email}, function(er, foundData){
            if(er){
                throw er
            }
            else if(foundData){
                if(foundData.email == email && foundData.password == password){

                    console.log("Login Successfully !!")
                    
                    myGameCharacters.find({}, function(err, characterData){
                        if(err){
                            throw err;
                        }
                        else{
                            res.render('profile', {userdata: foundData, gameCharacters: characterData })
                        }
                    })
                    
                }
                else{
                    console.log("you have entered wrong user password !!");
                    res.redirect('/login');
                }
            }
            else{
                console.log("you are not registered please signup first..")
                res.redirect('/signup');
            }
        })
        
    })

    app.post('/signup-process', function (req, res, next) {
        req.checkBody('first_name', "Please enter first name.").notEmpty();
        req.checkBody('last_name', "Please enter last name.").notEmpty();
        req.checkBody('display_name', "Please enter display name.").notEmpty();
        req.checkBody('email', "Invalid email entered.").isEmail();
        req.checkBody('password', "Invalid password entered.").notEmpty().equals(req.body.password_confirmation);
        let errors = req.validationErrors();
        if (errors) {
            //console.log(errors)
            req.session.errors = errors;
            //console.log(req.session.errors)
            req.session.success = false
            res.redirect('/signup');
        }
        else {
            // No validation Errors and ready to save in database
            req.session.success = true;
            const newUserProfile = new userProfileModel({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                display_name: req.body.display_name,
                email: req.body.email,
                password: req.body.password,
                password_confirmation: req.body.password_confirmation
            });
                //console.log(JSON.stringify(newUserProfile));
                
            newUserProfile.save(function (err) {
              if (err) throw err;
              console.log('New User Profile Saved in Database.')
                
            })
            

        }
        res.redirect('/login');
        
    })
    

}