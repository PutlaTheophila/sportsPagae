import mongoose from "mongoose";
import {Strategy} from "passport-google-oauth20";
import passport from "passport";
import {port } from "../server.js"



passport.serializeUser((user , done)=>{
  console.log('serialise user running .....')
  done(null ,user);

})
passport.deserializeUser((user , done)=>{
  console.log('hello...................')
  done(null ,user);
})

export default passport.use(
    new Strategy({
      clientID:'672247062346-njl2dru7fevcitsg5romorjtaiv8qinp.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:5011/api/v1/auth/google/callback',
      save:true
    },
    async (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    })

);

