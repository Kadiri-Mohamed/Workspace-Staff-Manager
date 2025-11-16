import { getWorkers, getWorker, addWorker, updateWorker, deleteWorker as deleteWorkerByID, assignWorkerToRoom, unassignWorker, getWorkersByRoom } from './store.js';
import { addExperienceForm, getExperiences , clearForm , displayWorkers} from './ui.js';
import { validateForm } from './validation.js';

const form = document.getElementById('form');
const addExpBtn = document.getElementById('addExperience');
const addWorkerBtn = document.getElementById('addWorker-button');
const staffsList = document.getElementById('staffs__container');

document.addEventListener('DOMContentLoaded', initializeApp);

function loadWorkers() {
    const workers = getWorkers();
    displayWorkers(workers);   
}

function initializeApp() {
    loadWorkers();
    clearForm();
    addExpBtn.addEventListener('click', addExperienceForm);

    // addWorkerBtn.addEventListener('click', () => {
    //     form.firstElementChild.setAttribute('data-id', new Date().getTime().toString());
    // });

    form.addEventListener('submit', submitJob);
    staffsList.addEventListener('click', handleListingActions);


}
function submitJob(e) {
    e.preventDefault();
    console.log(validateForm());
    if (!validateForm()) {
        return;
    }

    const id = form.firstElementChild.getAttribute('worker-id');
    const worker = {
        id: id || new Date().getTime().toString(),
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        role: document.getElementById('role').value,
        experience: getExperiences()
    }

    if (id) {
        updateWorker(worker);
    } else {
        addWorker(worker);
    }
    
    clearForm();
    loadWorkers();

    // console.log(getWorkers())
}
function deleteWorker(e) {
    const id = e.target.closest(".staffs__item").getAttribute('data-id');
    console.log(id);
    deleteWorkerByID(id);
    loadWorkers();
}
function editWorker(e) {
    const id = e.target.closest(".staffs__item").getAttribute('data-id');
    console.log(id);
    const worker = getWorker(id);
    // console.log(worker);
}

function handleListingActions(e) {
    if (e.target.classList.contains('staffs__item__actions__delete')) {
        deleteWorker(e);
    } else if (e.target.classList.contains('staffs__item__actions__edit')) {
        editWorker(e);
    }
}
