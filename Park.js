class Park {

    constructor(parkingID, vehicleID, floorID, startTime, endTime) {
        this.parkingID = parkingID;
        this.vehicleID = vehicleID;
        this.floorID = floorID;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    get parkingID() {
        return this._parkingID;
    }
    get vehicleID() {
        return this._vehicleID;
    }
    get floorID() {
        return this._floorID;
    }
    get startTime() {
        return this._startTime;
    }
    get endTime() {
        return this._endTime;
    }

    //setter
    set parkingID(parkingID){
        this._parkingID = parkingID;
    }
    set vehicleID(vehicleID){
        this._vehicleID = vehicleID;
    }
    set floorID(floorID) {
        this._floorID = floorID;
    }
    set startTime(startTime) {
        this._startTime = startTime;
    }
    set endTime(endTime) {
        this._endTime = endTime;
    }

}

module.exports = {Park};