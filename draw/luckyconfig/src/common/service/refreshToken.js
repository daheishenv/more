
export default class RefreshToken {
    isRefresh = false;
    tasks = [];
    notifyTaskReload(isError = false) {
        while (this.tasks.length) {
            this.tasks.shift()(isError)
        }
    }
    clearTask() {
        this.notifyTaskReload(true)
    }
    setRefreshType(type) {
        this.isRefresh = type
    }
    addTask(fn) {
        this.tasks.push(fn)
    }
    static initRefreshToken() {
        return new RefreshToken()
    }
}
