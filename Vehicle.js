module.exports = class Vehicle{

    ID="";
    fare=0;
    type="c";
    timein=0;
    timeout=0;

    constructor (ID,type,timein,timeout){
      this.ID=ID;
      this.timein=timein;
      this.timeout=timeout;
      this.type=type;
    }
    //set
    set ID(ID){
        this.ID = ID;
    }
    set type(type){
        this.type = type;
    }
    set timein(timein){
        this.timein = timein;
    }
    set timeout(timeout){
        this.timeout = timeout;
    }
    set fare(type){
        if (type=="1")
            this.fare=3;
        else
            this.fare=1.5;
    }
    //get
    get ID() {
        return this.ID;
    }
    get type() {
        return this.type;
    }
    get fare() {
        return this.fare;
    }
    get timein(){
        return this.timein
    }
    get timeout(){
        return this.timeout
    }

}