import { getWorkers, getWorker, addWorker, updateWorker, deleteWorker, assignWorkerToRoom, unassignWorker, getWorkersByRoom } from './store.js';
import { addExperienceForm } from './ui.js';

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    const addExpBtn = document.getElementById('addExperience');
    if (addExpBtn) {
        addExpBtn.addEventListener('click', addExperienceForm);
    }
}


