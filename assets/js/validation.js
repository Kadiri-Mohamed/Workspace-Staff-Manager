const validationRules = {
    'name': {
        regex: /^[a-zA-Z\s'-]{2,50}$/,
        message: "Name must be 2-50 letters only."
    },
    'role': {
        regex: /^[a-zA-Z\s'-]{2,50}$/,
        message: "Role must be 2-50 letters only."
    },
    'email': {
        regex: /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/,
        message: "Invalid email format."
    },
    'phone': {
        regex: /^\+212[67]\d{8}$/,
        message: "Phone must be 8-15 digits."
    }
};

function toggleError(field, show, message = '') {
    if (show) {
        field.classList.add("border-red-500")
        field.nextElementSibling.classList.remove('hidden');
        field.nextElementSibling.textContent = message;
    } else {
        field.classList.remove("border-red-500")
        field.nextElementSibling.classList.add('hidden');
        field.nextElementSibling.textContent = '';
    }
}

function validateField(field, value) {
    const rule = validationRules[field.name];
    if (value == '') {
        toggleError(field, true, 'field is required');
        return false;
    }
    if (!rule.regex.test(value)) {
        toggleError(field, true, rule.message);
        return false;
    }
    toggleError(field, false);
    return true;
}

function validateForm() {
    let valid = true

    const inputs = [
        { field: document.getElementById('name'), value: document.getElementById('name').value },
        { field: document.getElementById('role'), value: document.getElementById('role').value },
        { field: document.getElementById('email'), value: document.getElementById('email').value },
        { field: document.getElementById('phone'), value: document.getElementById('phone').value },
    ]
    for (let input of inputs) {
        if (!validateField(input.field, input.value)) {
            valid = false
        } else {
            valid = true
        }
    }
    return valid
}

export { validateForm, validateField, toggleError };