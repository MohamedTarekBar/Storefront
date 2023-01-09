import Joi, { ValidationResult } from 'joi';
import { User } from '../../types/type/database';
import globalConstants from '../error.constant';

export interface userInputs {
    user: User;
    email: string;
    password: string;
    user_name: string;
    first_name: string;
    last_name: string;
}

export default class UserValidation {
    private user: User | undefined;
    private email: string | undefined;
    private password: string | undefined;
    private user_name: string | undefined;
    private first_name: string | undefined;
    private last_name: string | undefined;

    constructor(options?: Partial<userInputs>) {
        this.user = options?.user;
        this.email = options?.email;
        this.password = options?.password;
        this.first_name = options?.first_name;
        this.last_name = options?.last_name;
        this.user_name = options?.user_name;
    }

    validateEmail(): ValidationResult {
        return Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .trim()
            .pattern(/^\S*$/)
            .required()
            .error(new Error(globalConstants.userValidation.email))
            .validate(this.email);
    }

    validatePassword(): ValidationResult {
        return Joi.string()
            .pattern(
                new RegExp(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                )
            )
            .required()
            .error(new Error(globalConstants.userValidation.password))
            .validate(this.password);
    }
    validateFirstName(): ValidationResult {
        return Joi.string()
            .min(3)
            .max(50)
            .trim()
            .pattern(/^\S*$/)
            .required()
            .error(new Error(globalConstants.userValidation.firstname))
            .validate(this.first_name);
    }

    validateLastName(): ValidationResult {
        return Joi.string()
            .min(3)
            .max(50)
            .trim()
            .pattern(/^\S*$/)
            .required()
            .error(new Error(globalConstants.userValidation.lastname))
            .validate(this.last_name);
    }

    validateUserName(): ValidationResult {
        return Joi.string()
            .min(3)
            .max(255)
            .trim()
            .pattern(/^\S*$/)
            .required()
            .error(new Error(globalConstants.userValidation.username))
            .validate(this.user_name);
    }
    
    validateUser(): ValidationResult {
        return Joi.object({
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ['com', 'net'] },
                })
                .trim()
                .pattern(/^\S*$/)
                .required().error(new Error(globalConstants.userValidation.email)),
            first_name: Joi.string()
                .min(3)
                .max(50)
                .trim()
                .pattern(/^\S*$/)
                .required().error(new Error(globalConstants.userValidation.firstname)),
            last_name: Joi.string()
                .min(3)
                .max(50)
                .trim()
                .pattern(/^\S*$/)
                .required().error(new Error(globalConstants.userValidation.lastname)),
            user_name: Joi.string()
                .min(3)
                .max(255)
                .trim()
                .pattern(/^\S*$/)
                .required().error(new Error(globalConstants.userValidation.username)),
            password: Joi.string()
                .pattern(
                    new RegExp(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                    )
                )
                .required().error(new Error(globalConstants.userValidation.password)),
        }).validate(this.user, { abortEarly: false });
    }
}
