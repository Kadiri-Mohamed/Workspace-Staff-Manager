import { getWorkers, getWorker, addWorker, updateWorker, deleteWorker as deleteWorkerByID, assignWorkerToRoom, unassignWorker, getWorkersByRoom } from './store.js';
import { addExperienceForm, getExperiences, clearForm, displayWorkers, displayPicture, displayWorker, displayPossibleWorkersByroom, displayAssignedWorkers } from './ui.js';
import { validateForm, imageUrlValidation } from './validation.js';

const form = document.getElementById('form');
const addExpBtn = document.getElementById('addExperience');
const addWorkerBtn = document.getElementById('addWorker-button');
const staffsList = document.getElementById('staffs__container');
const assigneBtns = document.getElementsByClassName("assign-btn")
const assignWorker = document.getElementsByClassName("assignWorker")
const rooms = document.getElementsByClassName("room")
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
    for (let btn of assigneBtns) {
        btn.addEventListener('click', (e) => {
            const roomId = e.target.closest('.room').getAttribute('data-roomId');
            displayPossibleWorkersByroom(roomId, getWorkers());
            // console.log(roomId);
        })

    }

    form.addEventListener('submit', submitJob);
    document.getElementById('photo').addEventListener('input', () => {
        let valid = imageUrlValidation(document.getElementById('photo').value);
        if (valid) {
            displayPicture(document.getElementById('photo').value);
        } else {
            displayPicture('./assets/images/worker.png');
        }
    })
    staffsList.addEventListener('click', handleListingActions);

    for (let room of rooms) {
        let roomId = room.getAttribute('data-roomId');
        displayAssignedWorkers(roomId, getWorkers());
        // console.log(roomId)
    }
}
function submitJob(e) {
    e.preventDefault();
    // console.log(validateForm());
    if (!validateForm()) {
        return;
    }

    const id = form.firstElementChild.getAttribute('worker-id');
    const worker = {
        id: id || new Date().getTime().toString(),
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        picture: document.getElementById('photo').value || './assets/images/worker.png',
        phone: document.getElementById('phone').value,
        role: document.getElementById('role').value,
        room: null,
        assigned: false,
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
    // console.log(id);
    deleteWorkerByID(id);
    loadWorkers();
}
function editWorker(e) {
    const id = e.target.closest(".staffs__item").getAttribute('data-id');
    // console.log(id);
    const worker = getWorker(id);
    // console.log(worker);
}

function handleListingActions(e) {
    loadWorkers();
    if (e.target.classList.contains('staffs__item__actions__delete')) {
        deleteWorker(e);
    } else if (e.target.classList.contains('staffs__item__actions__edit')) {
        editWorker(e);
    } else if (e.target.classList.contains('displayWorkerButton')) {
        let worker = getWorker(e.target.closest(".staffs__item").getAttribute('data-id'));
        console.log(worker);
        displayWorker(worker);
    }
}
