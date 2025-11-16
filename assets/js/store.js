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
    const workers = getWorkers();
    const updatedWorkers = workers.map(worker => {
        if (worker.id === workerId) {
            return { ...worker, assignedRoom: roomId };
        }
        return worker;
    });
    localStorage.setItem('workers', JSON.stringify(updatedWorkers));
}

function unassignWorker(workerId) {
    const workers = getWorkers();
    const updatedWorkers = workers.map(worker => {
        if (worker.id === workerId) {
            const { assignedRoom, ...workerWithoutRoom } = worker;
            return workerWithoutRoom;
        }
        return worker;
    });
    localStorage.setItem('workers', JSON.stringify(updatedWorkers));
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