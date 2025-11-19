import { roomsList, assignWorkerToRoom } from "./store.js";
export function addExperienceForm() {
    const container = document.getElementById('experiences__container');
    const experienceCount = container.querySelectorAll('.experience-item').length;
    const experienceHTML = `
        <div class="experience-item border border-gray-300 rounded-lg p-4 bg-white mt-3" data-experience-id="${experienceCount}">
            <div class="grid grid-cols-2 gap-4">
            <button type="button" class="remove-experience">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="red" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                </svg>
            </button>
                <div class="col-span-2">
                    <label class="block mb-2 text-sm font-medium text-gray-700">Company</label>
                    <input type="text" name="experiences-${experienceCount}-company" id="experiences-${experienceCount}-company"
                           class=" companyName w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-brand focus:border-brand"
                           placeholder="Company name">
                </div>
                <div class="col-span-2">
                    <label class="block mb-2 text-sm font-medium text-gray-700">Role</label>
                    <input type="text" name="experiences-${experienceCount}-role" id="experiences-${experienceCount}-role"
                           class=" roleCompany w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-brand focus:border-brand"
                           placeholder="Role in company">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">From</label>
                    <input type="date" name="experiences-${experienceCount}-from" id="experiences-${experienceCount}-from"
                           class=" experienceFrom w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-brand focus:border-brand">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">To</label>
                    <input type="date" name="experiences-${experienceCount}-to" id="experiences-${experienceCount}-to"
                           class=" experienceTo w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-brand focus:border-brand">
                </div>
            </div>
        </div>
    `;

    container.innerHTML += experienceHTML;

    for (let removeButton of container.getElementsByClassName('remove-experience')) {
        removeButton.addEventListener('click', (e) => {
            e.target.closest(".experience-item").remove();
        })
    }

}

export function getExperiences() {
    const experienceBlocks = document.getElementsByClassName('experience-item');
    const experiences = []
    for (let experienceBlock of experienceBlocks) {
        if (experienceBlock.querySelector('.companyName').value !== "" && experienceBlock.querySelector('.roleCompany').value !== "" && experienceBlock.querySelector('.experienceFrom').value !== "" && experienceBlock.querySelector('.experienceTo').value !== "") {
            const experience = {
                companyName: experienceBlock.querySelector('.companyName').value,
                role: experienceBlock.querySelector('.roleCompany').value,
                from: experienceBlock.querySelector('.experienceFrom').value,
                to: experienceBlock.querySelector('.experienceTo').value
            }
            experiences.push(experience);
        }
    }
    return experiences;
}

export function clearForm() {
    document.getElementById('form').reset();
}

export function displayPicture(image) {
    const picture = document.getElementById('displayedPic');
    if (!image) return;
    picture.src = image;
}

export function displayWorkers(workers) {
    const container = document.getElementById('staffs__container');
    container.innerHTML = '';
    for (let worker of workers) {
        if (worker.assigned == false) {
            const workerHTML = `
            <div class="staffs__item text-start w-full bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 mb-3" data-id="${worker.id}">
    <div class="staffs__item__info flex items-center justify-between">
        <div class="staffs__item__info__avatar">
            <img src="${worker.picture}" alt="Avatar" class="w-16 h-16 rounded-full object-cover me-5">
        </div>
        <div class="staffs__item__info__content flex-1">
            <div class="staffs__item__info__name">
                <h3 class="font-semibold text-primary text-lg"><button class="displayWorkerButton" data-modal-target="worker-modal" data-modal-toggle="worker-modal">${worker.name}</button></h3>
            </div>
            <div class="staffs__item__info__role">
                <p class="text-gray-600 text-sm">${worker.role}</p>
            </div>
        </div>
        <div class="staffs__item__actions flex gap-2 ml-4">
            <button class="staffs__item__actions__edit bg-tertiary text-primary px-3 py-1 rounded-lg text-sm font-medium hover:bg-tertiary/80 transition-colors">
                Edit
            </button>
            <button class="staffs__item__actions__delete bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                Delete
            </button>
        </div>
    </div>
</div>
    `
            container.innerHTML += workerHTML;
        }
    }
}
export function displayWorker(worker) {
    document.getElementById("worker-modal__name").textContent = worker.name;
    document.getElementById("worker-modal__role").textContent = worker.role;
    document.getElementById("worker-modal__email").textContent = worker.email;
    document.getElementById("worker-modal__pic").src = worker.picture;
    document.getElementById("worker-modal-exps").innerHTML = "";

    if (worker.experience.length > 0) {

        for (let exp of worker.experience) {
            document.getElementById("worker-modal-exps").innerHTML += `
            <li class="mb-11 ms-6">
            <span
            class="absolute flex items-center justify-center w-6 h-6 bg-brand-softer text-fg-brand rounded-full -start-3 ring-8 ring-buffer-medium">
                                        </span>
                                        <h3 class="flex items-start my-2 text-lg font-semibold text-secondary" id="worker-modal-exp">${exp.companyName}</h3>
                                        <p class="text-body mb-5 text-quaternary" id="worker-modal-exp-role">${exp.role}</p>
                                    </li>`
        }
    }
}

export function displayPossibleWorkersByroom(roomId, workers) {
    const list = document.getElementById("availvableWorkers-list")
    list.innerHTML = "";
    let room = roomsList.find(room => room.id == roomId)
    let possibleWorkers = workers.filter(worker => worker.roomId == null && room.rolesAccepted.includes(worker.role) && worker.assigned == false)
    for (let worker of possibleWorkers) {
        list.innerHTML += `
        <li class="flex items-center justify-between gap-4 py-4 px-6 border-b border-buffer-light workerCard" data-workerIdee="${worker.id}">
            <div class="flex items-center gap-4">
                <img class="w-12 h-12 rounded-full" src="${worker.picture}" alt="worker picture">
                <div>
                    <h3 class="text-lg font-semibold text-secondary">${worker.name}</h3>
                    <p class="text-body text-quaternary">${worker.role}</p>
                </div>
            </div>
            <button class="p-3 border border-quaternary rounded-md text-quaternary assignWorker">Assign</button>
        </li>`
    }

}
export function displayAssignedWorkers(roomId, workers) {
    const room = roomsList.find(room => room.id == roomId)
    const list = document.getElementById(`${room.name}__assignedWorkers`)
    let possibleWorkers = workers.filter(worker => worker.room == roomId)
    if (possibleWorkers.length > 0) {
        list.closest('.room').classList.add("justify-start")
        list.closest('.room').classList.remove("justify-center")
        // list.closest('i').classList.add("hidden")
    }
    console.log(possibleWorkers)
    list.innerHTML = ""
    for (let worker of possibleWorkers) {
        list.innerHTML += `
        <div class="flex items-center gap-4 py-4 px-6  workerCard bg-quaternary" data-workerIdee="${worker.id}">
            <div class="flex items-center gap-4">
                <img class="w-12 h-12 rounded-full" src="${worker.picture}" alt="worker picture">
                <div>
                    <h3 class="text-lg font-semibold text-secondary">${worker.name}</h3>
                    <p class="text-body text-primary">${worker.role}</p>
                </div>
            </div>
        </div>`
    }

}