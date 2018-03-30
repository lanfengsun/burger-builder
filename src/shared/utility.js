export const updateObject = (oldObject, newProperties) => ({
    ...oldObject,
    ...newProperties
});

export const validate = (value, validation) => {
    if (!validation) return true;

    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if(validation.minLength) {
        isValid = value.length >= validation.minLength && isValid;
    }

    if(validation.maxLength) {
        isValid = value.length <= validation.maxLength && isValid;
    }

    if (validation.isEmail) {
        isValid = value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) && isValid;
    }

    if (validation.isNumeric) {
        isValid = value.match(/^\d+$/) && isValid;
    }

    return isValid;
}