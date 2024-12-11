import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import User from "../mongoose/schemas/user.mjs";
import { comparePasswords } from "../utils/bcrypt.mjs";

passport.serializeUser(function(user, done){
    done(null, user.id);
})

passport.deserializeUser(async function(id, done){
    try {
        const user = await User.findById(id).select("-password -__v");
        done(null, user);
    } catch (e) {
        done(e);
    }
 });


passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async function (email, password, done) {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return done(null, false, { message: "Incorrect email or password." });
                }

                if (!comparePasswords(password, user.password)) {
                    return done(null, false, { message: "Incorrect password." });
                }

                if (user.isBlocked) {
                    return done(null, false, { message: "Your are blocked" });
                }
                
                return done(null, user);

            } catch (e) {
                done(e);
            }
        }));