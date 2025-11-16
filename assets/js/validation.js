// const validationRules = {
//     'company-name': {
//         regex: /^[a-zA-Z0-9\s,.'-]{2,50}$/,
//         message: "Company name must be 2-50 characters long."
//     },
//     'job-title': {
//         regex: /^[a-zA-Z0-9\s,.'-]{2,50}$/,
//         message: "Job title must be 2-50 characters long."
//     },
//     'description': {
//         regex: /.{10,}/,
//         message: "Description must be at least 10 characters long."
//     }
// };

function toggleError(field, show, message = '') {
    if (show) {
        field.classList.add("border-red-500")
        field.nextElementSibling.classList.remove('hidden');
        field.nextElementSibling.textContent = message;
    }else{
        field.classList.remove("border-red-500")
        field.nextElementSibling.classList.add('hidden');
        field.nextElementSibling.textContent = '';
    }
}

function validateField(field, value) {
    
    if (value == '') {
        toggleError(field, true, 'error');
        return false;
    }else{
        toggleError(field, false);
        return true;
    }
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
        }else{
            valid = true
        }
    }
    return valid
}

export { validateForm, validateField, toggleError };