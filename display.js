//Main page
'use strict'
const readline = require('readline'); //readline module
const fs = require('fs');  // fs module
const myImport = require('./Park.js'); //Import parking class
const myImport2 = require('./Vehicle.js'); // import vehicle class and totalfare() - calculate parking
let content = require('./Park.json'); // import parking json data

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let parking = '1. Parking';
let pay = '2. Pay';
let exit = '3. Exit';

let time1; let time2; 

console.log('Main Page \n', parking, '\n', pay, '\n', exit);

rl.question('\nChoice: ', (answer) => {

    if (answer == 1){
    
            let date = rl.question(`\nOn what date ?(Format: MM-DD-YYYY): `, (dateanswer) => {
                console.log(`Date entered: ${dateanswer}`);
                console.log('\nPlease put decimal for entering time --> e.g 11.40, 14.50');

                let start = rl.question(`\nStart From?(hh:mm (24-Hours)): `, (startanswer) => {
                    console.log(`Start time: ${startanswer}`);
                    time1 = startanswer;
                
                 let end = rl.question(`\nEnd?(hh:mm (24-Hours)): `, (endanswer) => {
                    console.log(`End time: ${endanswer}`);
                    time2 = endanswer;

                    Vacancy(startanswer, endanswer);
                    parkVehicle(startanswer, endanswer);
                });
            });
         });    
    }

    else if (answer == 2){
        console.log('Pay Page');
        pay = rl.question('Enter your vehicle ID: ', (answer2) => {

            // Calls function calculate parking charge
            checkVehicle(answer2);
            
            rl.close();
        });
    }
    else if (answer == 3){
        console.log('Thank you for coming');
        rl.close();

    }
    else{
        console.log('Wrong input');
        rl.close();
    }
});

// new arrow function to put random parkingID -- Izyan
let storeParkingID = [];

let randomParkingID = () => {
    let random = parseInt(Math.random() * (60 - 1) + 1);
    while(storeParkingID.includes(random))
        random = parseInt(Math.random() * (60 - 1) + 1);
    return random;
};

let parked = [];
let available = 60;
let floorID;
var dataInput = {};
let parkingID = randomParkingID();

// new arrow function -- Izyan
let Vacancy = (startanswer, endanswer) => {
    startanswer = new Date(startanswer).getTime();
    endanswer = new Date(endanswer).getTime();

    for(let i in content) {
        if(startanswer!=content[i].startTime && endanswer!=content[i].endTime)
            parked.push(content[i].vehicleID);
    }

    available -= parked.length;
    console.log('\n\t\tVacancy:');
    console.log(`\t\t\tThere are ${available} available parking space left. \n`);

    // Alternative: Instead doing parkVehicle(), integrate it with Vacancy()

};

//new arrow function -- Zahirah
let parkVehicle = (startanswer, endanswer) => {
    let startTime = startanswer;
    let endTime = endanswer;

    console.log('Vehicle Type \n\t 1. Car \n\t 2. Motorcycle');
    rl.question('\nVehicle Type:', (vehicleType) =>{
        
        console.log('\nFloor: \n\t 1. First floor \n\t 2. Second floor');
        console.log('\t *Motorcyle can park in first floor only*\n');

        //Vehicle Type: Car
        if(vehicleType == 1){
            rl.question('Enter floor you want to park: ', (userInput) =>{
                // storeFloorID.push(parseInt(userInput));
                floorID = parseInt(userInput);

                console.log('Vehicle type: Car');
                console.log(`FloorID: ${userInput}`);

                rl.question('\nEnter vehicleID:', (vehicle) => {
                    console.log(`VehicleID: ${vehicle}!`);
                
                    dataInput = {parkingID, vehicleType, vehicle, floorID, startTime, endTime};
                   
                    enterJson(addVehicle(vehicle, vehicleType, floorID, startTime, endTime));
                    available -= parked.length;
                    rl.close();
                });
            });
        }

        //Vehicle Type: Motorcyle
        else if(vehicleType == 2){
            floorID = 1;

            console.log('Vehicle type: Motorcycle');
            console.log(`FloorID: ${floorID}`);

            rl.question('\nEnter vehicleID:', (vehicle) => {

                console.log(`VehicleID: ${vehicle}!`);
                dataInput = {parkingID, vehicleType, vehicle, floorID, startTime, endTime};
                enterJson(addVehicle(parkingID, parseInt(vehicleType), vehicle, floorID, startTime, endTime));
                available -= parked.length;
                
                rl.close();
            });

        }

        //Vehicle Type: Error
        else{
            console.log('Wrong input. Try again');
            rl.close();
        }
    });
}


// new arrow function to push json data into array -- Zahirah
let addVehicle = (parkingID, vehicleType, vehicleID, floorID, startanswer, endanswer) => {
    let startTime = startanswer;
    let endTime = endanswer;
    parked.push(new myImport.Park(parkingID, vehicleType, vehicleID, floorID, startTime, endTime));
}

let enterJson = () => {
    // STEP 2: Adding new data to park object 
    content.push(dataInput);
   
    // STEP 3: Writing to a file 
    fs.writeFile("Park.json", JSON.stringify(content), err => { 
        
        // Checking for errors 
        if (err) throw err;  
    
        console.log("Done writing into park.json"); // Success 
    }); 
   
}

// new arrow function --- checking json data -- Handani & Ain
let checkVehicle = (vehicleID) => {
    
    //if Vehicle ID do match with the content in Park.json
    for(let i in content) {
        if(vehicleID == content[i].vehicle){
            totalfare(content[i].vehicleType,content[i].startTime, content[i].endTime);
            break;
        }
        // If Vehicle ID does not match
        else { 
          console.log((`There is no parking record of : ${vehicleID}`));
          break;
        }
    }
}

// Calculate the fare of the vehicle
let totalfare = (vehicleType,starttime, endtime ) => {
    console.log(`Start time : ${starttime} \t End time ${endtime}`)
// Convert hours to numbers to make it easy for the calculation.
    let stime = parseInt(starttime) +((starttime-parseInt(starttime))/0.6)
    let etime = parseInt(endtime) + ((endtime-parseInt(endtime))/0.6)
// Check if the duration of the vehicle is more than 5 hours, fine RM50
    if ( etime-stime > 5){
        console.log(`\tTime : ${(etime-stime).toFixed(2)} hours. \n `)  // fixed the number that will show with 2 decimal places
        console.log("\tYou have exceed the limit of 5 hours. Fine RM50.")   
    }
//The fare for Car.
    else if (vehicleType=="1"){
        console.log(`\tTime : ${(endtime-starttime).toFixed(2)} hours. \n `)  // fixed the number that will show with 2 decimal places
        console.log(`\tYour Total Fare is : RM ${(etime-stime).toFixed(2)*3}`) // The fare for Car is RM3 per hour
    }
//The fare for Motorcycle
    else if (vehicleType=="2"){
        console.log(`\tTime : ${(endtime-starttime).toFixed(2)} hours. \n `)  // fixed the number that will show with 2 decimal places
        console.log(`\tYour Total Fare is : RM ${(etime-stime).toFixed(2)*1.5}`)  // The fare for Motorcycle is RM 1.50 per hour
    }
//these means something wrong with the vehicletype data.
    else{
        console.log('Wrong input. Try again'); 
    }
}
