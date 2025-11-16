import { getWorkers, getWorker, addWorker, updateWorker, deleteWorker, assignWorkerToRoom, unassignWorker, getWorkersByRoom } from './store.js';
import { addExperienceForm, getExperiences , clearForm , displayWorkers} from './ui.js';

const form = document.getElementById('form');
const addExpBtn = document.getElementById('addExperience');
const addWorkerBtn = document.getElementById('addWorker-button');

document.addEventListener('DOMContentLoaded', initializeApp);

function loadWorkers() {
    const workers = getWorkers();
    displayWorkers(workers);   
}

function initializeApp() {
    loadWorkers();
    clearForm();
    addExpBtn.addEventListener('click', addExperienceForm);

    addWorkerBtn.addEventListener('click', () => {
        form.firstElementChild.setAttribute('data-id', new Date().getTime().toString());
    });

    form.addEventListener('submit', submitJob);


}
function submitJob(e) {
    e.preventDefault();

    const id = form.firstElementChild.getAttribute('data-id');
    const worker = {
        id: id,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        role: document.getElementById('role').value,
        experience: getExperiences()
    }

    addWorker(worker);
    clearForm();
    loadWorkers();

    console.log(getWorkers())
}

