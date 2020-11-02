import React from 'react'
import lodash from 'lodash'

const studentFormValidation = data => {
    let errors = {}
    if (lodash.isEmpty(data.username)) {
        errors.error = "username or password is required"
    }
    if (lodash.isEmpty(data.password)) {
        errors.error = "username or password is required"
    }
    return {
        errors,
        isValid : lodash.isEmpty(errors)
    }
}

export default studentFormValidation