export function addExperienceForm() {
    const container = document.getElementById('experiences__container');
    const experienceCount = container.querySelectorAll('.experience-item').length;
    const experienceHTML = `
        <div class="experience-item border border-gray-300 rounded-lg p-4 bg-white mt-3" data-experience-id="${experienceCount}">
            <div class="grid grid-cols-2 gap-4">
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

    container.insertAdjacentHTML('beforeend', experienceHTML);
}

export function getExperiences() {
    const experienceBlocks = document.getElementsByClassName('experience-item');
    const experiences = []
    for (let experienceBlock of experienceBlocks) {
        const experience = {
            companyName: experienceBlock.querySelector('.companyName').value,
            role: experienceBlock.querySelector('.roleCompany').value,
            from: experienceBlock.querySelector('.experienceFrom').value,
            to: experienceBlock.querySelector('.experienceTo').value
        }
        experiences.push(experience);
    }
    return experiences;
}

export function clearForm() {
    document.getElementById('form').reset();
}

export function displayWorkers(workers) {
    const container = document.getElementById('staffs__container');
    container.innerHTML = '';
    for (let worker of workers) {
        const workerHTML = `
            <div class="staffs__item bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 mb-3" data-id="${worker.id}">
    <div class="staffs__item__info flex items-center justify-between">
        <div class="staffs__item__info__avatar">
            <img src="./assets/images/worker.png" alt="Avatar" class="w-16 h-16 rounded-full object-cover">
        </div>
        <div class="staffs__item__info__content flex-1">
            <div class="staffs__item__info__name">
                <h3 class="font-semibold text-primary text-lg">${worker.name}</h3>
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