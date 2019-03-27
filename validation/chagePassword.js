const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateChangePasswordInput(data) {
    console.log("DATA",data);
    let errors = {};
    data.old_password = !isEmpty(data.old_password) ? data.old_password : '';
    data.new_password = !isEmpty(data.new_password) ? data.new_password : '';

    if (Validator.isEmpty(data.old_password)) {
        errors.old_password = 'Old Password is required';
    }

    if (Validator.isEmpty(data.new_password)) {
        errors.new_password = 'New Password is required';
    }

    if (!Validator.isLength(data.old_password, { min: 6, max: 30 })) {
        errors.old_password = 'Old Password must have 6 chars';
    }

    if (!Validator.isLength(data.new_password, { min: 6, max: 30 })) {
        errors.new_password = 'New Password must have 6 chars';
    }

    if (!Validator.equals(data.new_password, data.old_password)) {
        errors.old_password = 'Old and New Password must match';
        errors.new_password = 'Old and New Password must match';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}