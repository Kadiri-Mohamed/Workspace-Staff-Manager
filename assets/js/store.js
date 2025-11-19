export const roomsList = [
    { id: 1, name: "conferenceRoom", capacity: 3, rolesAccepted: ["IT Guy", "Other", "Manager"] },
    { id: 2, name: "serversRoom", capacity: 2, rolesAccepted: ["IT Guy", "Manager"] },
    { id: 3, name: "securityRoom", capacity: 5, rolesAccepted: ["Securete", "Manager", "Cleaning"] },
    { id: 4, name: "reception", capacity: 2, rolesAccepted: ["Reception", "Cleaning", "Manager"] },
    { id: 5, name: "staffRoom", capacity: 4, rolesAccepted: ["IT Guy", "Cleaning", "Manager"] },
    { id: 6, name: "vault", capacity: 2, rolesAccepted: ["Manager"] },
]

export const importantRooms = [2, 3, 4, 6];

function getWorkers() {
    const workers = localStorage.getItem('workers');
    return workers ? JSON.parse(workers) : [];
}

function getWorker(id) {
    return getWorkers().find(worker => worker.id === id);
}

function addWorker(worker) {
    const workers = getWorkers();
    workers.push(worker);
    localStorage.setItem('workers', JSON.stringify(workers));
}

function updateWorker(updatedWorker) {
    const workers = getWorkers();
    const updatedWorkers = workers.map(worker =>
        worker.id === updatedWorker.id ? updatedWorker : worker
    );
    localStorage.setItem('workers', JSON.stringify(updatedWorkers));
}

function deleteWorker(id) {
    const workers = getWorkers();
    const filteredWorkers = workers.filter(worker => worker.id !== id);
    localStorage.setItem('workers', JSON.stringify(filteredWorkers));
}

function assignWorkerToRoom(workerId, roomId) {
    console.log(workerId, roomId);
    const room = roomsList.find(room => room.id == roomId);
    const workers = getWorkers();
    const alreadyAssigned = workers.filter(worker => worker.room === Number(roomId));
    if (alreadyAssigned.length >= room.capacity) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Room is full"
        });
    } else {
        const updatedWorkers = workers.map(worker => {
            if (worker.id === workerId && !worker.assigned) {
                return { ...worker, room: Number(roomId), assigned: true };
            }
            return worker;
        });
        // console.log(updatedWorkers)
        localStorage.setItem('workers', JSON.stringify(updatedWorkers));
        const roomElem = document.getElementById(room.name);
        if (roomElem) {
            roomElem.classList.remove("bg-red-500/50");
        }
    }
}

function unassignWorker(workerId) {
    const workers = getWorkers();
    let oldRoomId = null;
    const updatedWorkers = workers.map(worker => {
        if (worker.id === workerId) {
            oldRoomId = worker.room;
            return { ...worker, room: null, assigned: false };
        }
        return worker;
    });
    localStorage.setItem('workers', JSON.stringify(updatedWorkers));
    if (oldRoomId !== null) {
        const room = roomsList.find(r => r.id === oldRoomId);
        const roomElem = document.getElementById(room.name);
        const remainingWorkers = updatedWorkers.filter(w => w.room === oldRoomId);
        if (roomElem && remainingWorkers.length === 0 && importantRooms.includes(room.id)) {
            roomElem.classList.add("bg-red-500/50");
        }
    }
}

function getWorkersByRoom(roomId) {
    const workers = getWorkers();
    return workers.filter(worker => worker.assignedRoom === roomId);
}

export {
    getWorkers,
    getWorker,
    addWorker,
    updateWorker,
    deleteWorker,
    assignWorkerToRoom,
    unassignWorker,
    getWorkersByRoom
};