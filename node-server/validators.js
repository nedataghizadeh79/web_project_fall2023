import {body, header, validationResult} from 'express-validator';
import {constants} from "./resources.js";

const is_ostad_or_admin = function (value){
    if (value && (value === 'instructor' || value === 'admin')){
        return true;
    }
    throw new Error("invalid role");
}

const is_admin = function (value){
    if (value === 3){
        return true;
    }
    throw new Error("invalid role");
}

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        // Username
        let user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (user) {
            return res.status(400).send({
                message: "Failed! Username is already in use!"
            });
        }

        next();
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate Username!"
        });
    }
};

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};

const IATA_LEN = 3;
export const available_offers_search_validation_rules = () => {
    return [body('departure').isDate(), body('origin').isLength({
        min: IATA_LEN, max: IATA_LEN
    }), body('dest').isLength({
        min: IATA_LEN, max: IATA_LEN
    }), body('y_class_free_capacity').isInt({gt: -1}), body('j_class_free_capacity').isInt({gt: -1}), body('f_class_free_capacity').isInt({gt: -1}),];
}

export const reserve_validation_rules = () => {
    return [body('flight_id').isString(), body('passengers').isArray().isLength({min: 1}), body('passengers.*.first_name').isString(), body('passengers.*.offer_class').custom((value) => {
        return value === "F" || value === "J" || value === "Y";
    }), body('passengers.*.title').custom((value) => {
        return value === "Mr" || value === "Mrs"
    })]
}

export const sign_up_validation_rules = () => {
    return[
        body('name').isString().isLength({min: 1, max: 50}),
        body('email').isEmail(),
        body('password').isString().isLength({min:4})
    ];
}

export const sign_in_validation_rules = () => {
    return[
        body('username').isString(),
        body('password').isString()
    ];
}

export const create_announcement_validation_rules =() => {
    return[
        header('USER_ROLE').custom(is_ostad_or_admin),
        body('course_id').isInt(),
        body('description').isLength({max: 500})
    ];
}

export const voluntary_validation_rules = () => {
    return[
      body('course_id').isInt(),
    ];
}

export const change_user_role_validation_rules = () => {
    return[
      header('USER_ROLE').custom(is_admin),
      body('user_id').isInt,
      body('role').isInt
    ]
}


export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    if (errors.errors[0].param === 'ROLE'){
        return res.status(403).json({
            errors: [{'ROLE': constants.role_does_not_match}],
        })
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))

    return res.status(422).json({
        errors: extractedErrors,
    })
}
