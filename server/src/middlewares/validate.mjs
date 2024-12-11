import { checkSchema, matchedData, validationResult } from "express-validator";

const validate = (schema) => {
    return async (req, res, next) => {
        await checkSchema(schema).run(req);

        const result = validationResult(req);
        console.log("result", result);
        
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        req.matchedData = matchedData(req);
        next();
    }
}

export default validate;