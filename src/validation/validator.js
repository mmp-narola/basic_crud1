const { validationResult } = require("express-validator");

const validator = (validationObject) => {
    return async (req, res, next) => {
        await Promise.all(validationObject.map((validation) => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.error({ error: errors.array() });
    }
}

module.exports = validator