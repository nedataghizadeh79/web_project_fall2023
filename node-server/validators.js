import {body, header, validationResult} from 'express-validator';
import {constants} from "./resources.js";


const role_checker = function (roles) {
    return (role) => {
      return roles.includes(role);
    };
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
        body('USER_ROLE').custom(role_checker([2, 3])),
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
      body('USER_ROLE').custom(role_checker([3])),
      body('user_id').isInt,
      body('role').isInt
    ]
}

export const write_comment_validation_rules = () => {
    return[
      body('USER_ROLE').custom(role_checker([3])),
      body('ta_id').isInt,
      body('comment').isString().isLength({max: 1000}),
      body('rate').isInt({min: 1, max: 5}),
    ];
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
