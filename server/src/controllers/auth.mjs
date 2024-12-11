import generatePasswordResetEmail from "../constants/email.mjs";
import User from "../mongoose/schemas/user.mjs";
import { comparePasswords, hashPassword } from "../utils/bcrypt.mjs";
import transporter from "../utils/mail.mjs";
import crypto from 'crypto';




const login = async (req, res) => {
    const user = req.user.toObject();
    delete user.password;
    delete user.resetPasswordToken;
    delete user.resetPasswordTokenExpires;
    res.send({ message: "Login successful", user })
    
}


const register = async (req, res) => {
    try {

        const { username, email, password, name } = req.body

        if ( !username || !email || !password || !name) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const alreadyExistsUser = await User.findOne({ email })
        if (alreadyExistsUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const alreadyExistsUserName = await User.findOne({ username })
        if (alreadyExistsUserName) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const user = new User({
            username,
            email,
            password: hashPassword(password), //bcryps gorunmemesi uchun
            name
        })

        await user.save()
        res.send({ message: "User registered successfully" })


    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }

}

const currentUser = async (req, res) => {
    try {
        const user = req.user.toObject();
        user.avatar = `${process.env.BASE_URL}${user.avatar}`;
        res.json({ user })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}


const logout = async (req, res) => {

    req.logout(function (err) {
        if (err) {
            return res.status(500).json({ message: "Server error" });
        }
        res.clearCookie("sid");
        res.send({ message: "Logged out successfully" });
    })
}

// const forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body //requestin bodysinden e-maili gotur

//         if (!email) {
//             return res.status(400).json({ message: "Email is required" });
//         }

//         const user = await User.findOne({ email })
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         const token = crypto.randomBytes(32).toString('hex');
//         user.forgotPasswordToken = token;
//         user.forgotPasswordTokenExpires = Date.now() + 3600000;
//         await user.save();

//         const emailContent = generatePasswordResetEmail(token);
//          await transporter.sendMail({
//             from: process.env.MAIL_USER,
//             to: user.email,
//             subject: 'Password Reset',
//             html: emailContent.html
//         });
//         res.send({ message: "Reset password email sent successfully" });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Server error" });
//     }
// }

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body; 

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = crypto.randomBytes(32).toString('hex');
        user.forgotPasswordToken = token;
        user.forgotPasswordTokenExpires = Date.now() + 3600000; 

        await user.save({ validateBeforeSave: false });  

        const emailContent = generatePasswordResetEmail(token, user);

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            html: emailContent.html,
        });

        res.send({ message: "Password reset email sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error while sending password reset email" });
    }
};


const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        const user = await User.findOne({
             forgotPasswordToken: token,
              forgotPasswordTokenExpires: { $gt: Date.now() } })

        if (!user) {
            return res.status(404).json({ message: "Invalid or expired token" });
        }
        user.password = hashPassword(password);
        user.forgotPasswordToken = null;
        user.forgotPasswordTokenExpires = null;
        await user.save();
        res.send({ message: "Password reset successfully" });        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}



const authController = {
    register,
    login,
    currentUser,
    logout,
    forgotPassword,
    resetPassword,
};


export default {
    authController
}