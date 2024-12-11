import passport from "passport";


export const authorize = () => {

    return async (req, res, next) => {
        try {
            if (!req.isAuthenticated()) {
                return res.status(401).json({ message: "You have to login" });
            }

            if (!req.user) {
                return res.status(403).json({ message: "User not found. Please log in again." });
              }
              
            next();

            } catch (err) {
                console.error(err);
                return res.status(500).json({ message: "Middleware Server error" });
            }
        }
}

    export const authenticate = (req, res, next) =>
        passport.authenticate("local", function (error, user, info) {
            if (error) return res.status(500).json({ message: "Login server error" });

            if (info?.message || !user) {
                return res.status(401).json({ message: info?.message || "Login please" });
            }
            req.login(user, function (err) {
                if (err) return res.status(500).json({ message: "Login server error" });
                next()
            });
        })(req, res, next);

