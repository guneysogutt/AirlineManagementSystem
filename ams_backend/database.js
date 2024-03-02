import { createConnection } from 'mysql2';


var connection = createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "ams",
    password: "123456",
});

function connectToTheDatabase(connection){
    connection.connect(function(err){
        if(err)
            throw err;
        console.log("!!!Connection is Successful!!!");
    });
}
connectToTheDatabase(connection); // asla connection koparılmıyo

/* yusuf codes */
// temp will be converted to async

function getAllUsers(){
    connection.connect(function(err) {
        if (err) throw err;
        connection.query("SELECT * FROM user", function (err, result, fields) {
          if (err) throw err;
          result = Object.values(JSON.parse(JSON.stringify(result)));
          console.log(result);
        });
      });
}
//getAllUsers();

// temp will be converted to async
function getSessionToken(email, password){
    let query = 'SELECT id FROM user WHERE email = ' + connection.escape(email) + ' AND password = ' + connection.escape(password);
    connection.query(query, function (err, result) {
        if (err) throw err;
        result = Object.values(JSON.parse(JSON.stringify(result)));
        console.log(result[0].id);
        return result;
    });
}

//getSessionToken("y@ams.com", "123456");

// temp will be converted to async
function getFlightsByFlightNumber(flight_number){
    let query = 'SELECT * FROM flight WHERE flight_number = ' + connection.escape(flight_number);
    connection.query(query, function (err, result) {
        if (err) throw err;
        result = Object.values(JSON.parse(JSON.stringify(result)));
        console.log(result);
        return result;
    });
}
//getFlightsByFlightNumber("TK4040");

function getFlightsByRoute(departure_airport, destination_airport){
    let query = 'SELECT * FROM flight WHERE departure_airport = ' + connection.escape(departure_airport) + ' AND destination_airport = ' + connection.escape(destination_airport);
    connection.query(query, function (err, result) {
        if (err) throw err;
        result = Object.values(JSON.parse(JSON.stringify(result)));
        console.log(result);
        return result;
    });
}
//getFlightsByRoute("JFK","ADB");

function getAllFlightsFrom(departure_airport){
    let query = 'SELECT * FROM flight WHERE departure_airport = ' + connection.escape(departure_airport);
    connection.query(query, function (err, result) {
        if (err) throw err;
        result = Object.values(JSON.parse(JSON.stringify(result)));
        console.log(result);
        return result;
    });
}
//getAllFlightsFrom("ADB");

function getAllFlightsTo(destination_airport){
    let query = 'SELECT * FROM flight WHERE destination_airport = ' + connection.escape(destination_airport);
    connection.query(query, function (err, result) {
        if (err) throw err;
        result = Object.values(JSON.parse(JSON.stringify(result)));
        console.log(result);
        return result;
    });
}
//getAllFlightsTo("ADB");


// // //

function addFlight(flight_number,departure_airport,destination_airport,departure_time,arrival_time,gate_number,plane_registration,status){
    let values = "VALUES (" + connection.escape(flight_number) + "," + 
                              connection.escape(departure_airport) + "," + 
                              connection.escape(destination_airport) + "," + 
                              connection.escape(departure_time) + "," + 
                              connection.escape(arrival_time) + "," + 
                              connection.escape(gate_number) + "," + 
                              connection.escape(plane_registration) + "," + 
                              connection.escape(status) + ")";
    let query = "INSERT INTO flight (flight_number,departure_airport,destination_airport,departure_time,arrival_time,gate_number,plane_registration,status)"+ values;
    connection.query(query, function (err, result) {
        if (err) throw err;
        console.log(result);
        return result;
    });
}
//addFlight("TK2313", "ADB", "IST", "2023-12-11 20:30:00", "2023-12-11 21:30:00", "A4", "TC-GNS", "Upcoming");

function addPersonnel(national_id,name,surname,email,phone,gender,birth_date,password,permission,title,){
    let values = "VALUES (" + connection.escape(national_id) + "," + 
                              connection.escape(name) + "," + 
                              connection.escape(surname) + "," + 
                              connection.escape(email) + "," + 
                              connection.escape(phone) + "," + 
                              connection.escape(gender) + "," + 
                              connection.escape(birth_date) + "," + 
                              connection.escape(password) + "," + 
                              connection.escape(permission) + "," + 
                              connection.escape(title) + ")";
    let query = "INSERT INTO personnel (national_id,name,surname,email,phone,gender,birth_date,password,permission,title)"+ values;
    connection.query(query, function (err, result) {
        if (err) throw err;
        console.log(result);
        return result;
    });
}

//addPersonnel("00000000000","Semih","Utku","semih.utku@ams.com","0090000000000","Male","2000-10-10","123456","admin","General Menager");

function addPassenger(national_id,pnr_no,baggage_allowance,luggage_id,fare_type,seat,meal,extra_luggage,check_in,
                      name,surname,email,phone,gender,birth_date,cip_member,vip_member,disabled,child){
    let values = "VALUES (" + connection.escape(national_id) + "," + 
                              connection.escape(pnr_no) + "," + 
                              connection.escape(baggage_allowance) + "," + 
                              connection.escape(luggage_id) + "," + 
                              connection.escape(fare_type) + "," + 
                              connection.escape(seat) + "," + 
                              connection.escape(meal) + "," + 
                              connection.escape(extra_luggage) + "," + 
                              connection.escape(check_in) + "," + 
                              connection.escape(name) + "," + 
                              connection.escape(surname) + "," + 
                              connection.escape(email) + "," + 
                              connection.escape(phone) + "," + 
                              connection.escape(gender) + "," + 
                              connection.escape(birth_date) + "," + 
                              connection.escape(cip_member) + "," + 
                              connection.escape(vip_member) + "," + 
                              connection.escape(disabled) + "," + 
                              connection.escape(child) + ")";
    let query = "INSERT INTO passenger (national_id,pnr_no,baggage_allowance,luggage_id,fare_type,seat,meal,extra_luggage,check_in,"+
        "name,surname,email,phone,gender,birth_date,cip_member,vip_member,disabled,child)"+ values;
    connection.query(query, function (err, result) {
        if (err) throw err;
        console.log(result);
        return result;
    });
}


//addPassenger("00000000001","YSFGSL11",45,"202051003400","Comfort","NaN",1,0,0,"Yusuf","Gassal","yusufgassaloglu@gmail.com","5365365361","Male","2001-03-13",0,1,0,0);
//addPassenger("12345678901","ABC12345",25,"987654321012","Essentials","1A",1,20,1,"John","Doe","johndoe@gmail.com","1234567890","Male","1980-05-15",0,0,0,0);
//addPassenger("12345678909","BCD23419",25,"210987654919","NaN","NaN",0,10,0,"Evelyn","Turner","evelynturner@gmail.com","1234567890","Female","1998-08-03",0,0,0,0);
//addPassenger("67890123457","PQR78987",35,"321098765787","NaN","NaN",1,10,1,"Sophie","Scott","sophie.scott@icloud.com","8765432101","Female","1985-02-27",0,0,0,0);
function addPlane(plane_registration,model,location,max_passengers,is_active){
    let values = "VALUES (" + connection.escape(plane_registration) + "," + 
                              connection.escape(model) + "," + 
                              connection.escape(location) + "," + 
                              connection.escape(max_passengers) + "," + 
                              connection.escape(is_active) + ")";
    let query = "INSERT INTO plane (plane_registration,model,location,max_passengers,is_active)" + values;
    connection.query(query, function (err, result) {
        if (err) throw err;
        console.log(result);
        return result;
    });
}
//addPlane('TC-ULS','Airbus A350','ADB','300','0');

function addLuggage(luggage_id,baggage_allowence,weight,piece){
    let values = "VALUES (" + connection.escape(luggage_id) + "," + 
                              connection.escape(baggage_allowence) + "," + 
                              connection.escape(weight) + "," + 
                              connection.escape(piece) + ")";
    let query = "INSERT INTO luggage (luggage_id,baggage_allowence,weight,piece)" + values;
    connection.query(query, function (err, result) {
        if (err) throw err;
        console.log(result);
        return result;
    });
}
//addLuggage("202051003400",45,-1,-1);

function createFlightsTable() {
    // Flight Number,Departure Airport,Destination Airport,Departure Time,Arrival Time,Gate Number, Plane Registration, Status
    let query = "CREATE TABLE `Flight` (\n" +
    "\t`id` INT NOT NULL AUTO_INCREMENT,\n" +
    "\t`flight_number` VARCHAR(7) NOT NULL,\n" +
    "\t`departure_airport` VARCHAR(10) NOT NULL,\n" +
    "\t`destination_airport` VARCHAR(10) NOT NULL,\n" +
    "\t`departure_time` DATETIME NOT NULL,\n" +
    "\t`arrival_time` DATETIME NOT NULL,\n" +
    "\t`gate_number` VARCHAR(15) NOT NULL,\n" +
    "\t`plane_registration` VARCHAR(6) NOT NULL,\n" +
    "\t`status` VARCHAR(50) NOT NULL,\n" +
    "\tPRIMARY KEY (`id`),\n" +
    "\tFOREIGN KEY (plane_registration) REFERENCES Plane(plane_registration) ON UPDATE CASCADE ON DELETE SET DEFAULT\n" +
    ");"

    connection.query(query);
}
//createFlightsTable();


function createPersonnelTable() {
    let query = "CREATE TABLE `Personnel` (\n" +
    "\t`national_id` VARCHAR(11) UNIQUE NOT NULL,\n" +
    "\t`name` VARCHAR(255) NOT NULL,\n" +
    "\t`surname` VARCHAR(255) NOT NULL,\n" +
    "\t`email` VARCHAR(255) UNIQUE NOT NULL,\n" +
    "\t`phone` VARCHAR(20) UNIQUE NOT NULL,\n" +
    "\t`gender` VARCHAR(5) NOT NULL,\n" +
    "\t`birth_date` DATE NOT NULL,\n" +
    "\t`password` VARCHAR(255) NOT NULL,\n" +
    "\t`permission` VARCHAR(255) NOT NULL,\n" +
    "\t`title` VARCHAR(255) NOT NULL,\n" +
    "\tPRIMARY KEY (`national_id`)\n" +
    ");"

    connection.query(query);
    
}
//createPersonnelTable();



function test() {
    //let query = "ALTER TABLE flight ADD COLUMN price DECIMAL(10, 2);"
    //let query = "ALTER TABLE luggage CHANGE COLUMN baggage_allowence baggage_allowance float;";
    //let query = "UPDATE passenger SET birth_date = DATE_FORMAT(STR_TO_DATE(birth_date, '%Y-%m-%d'), '%d-%m-%Y');";
    //let query = "ALTER TABLE passenger MODIFY COLUMN birth_date DATE;";
    //let query = "ALTER TABLE passenger DROP INDEX phone;"
    //let query = "ALTER TABLE passenger MODIFY COLUMN gender ENUM('Male', 'Female', 'Other');";
    //let query = "ALTER TABLE passenger ADD' COLUMN flight_number VARCHAR(7) AFTER pnr_no";
    //let query = "UPDATE flight SET status = 'scheduled'";
    //let query = "ALTER TABLE user MODIFY COLUMN money FLOAT;"
    //let query = "SELECT * FROM luggage WHERE luggage_id NOT IN (000000000000)";
    //let query = "ALTER TABLE passenger ADD COLUMN buyer INT";
    //let query = "UPDATE plane SET location = 'ADB'";
    
    //let query = 'SET @seat_number := 1;UPDATE passenger SET seat = (select @seat_number := @seat_number + 1); ';
    //let query = "UPDATE passenger SET seat = 0;"
    //let query = "ALTER TABLE passenger MODIFY COLUMN seat INT;";
    //let query = "ALTER TABLE flight ADD CONSTRAINT unique_flight_number UNIQUE (flight_number);"
    let query = "ALTER TABLE passenger DROP INDEX email;";
    connection.query(query);
}
//test();
/** guney sogut codes **/
/*
connection.query("CREATE TABLE `User2` (\n" +
"\t`id` INT NOT NULL AUTO_INCREMENT,\n" +
"\t`name` VARCHAR(255) NOT NULL,\n" +
"\t`surname` VARCHAR(255) NOT NULL,\n" +
"\t`email` VARCHAR(255) UNIQUE NOT NULL,\n" +
"\t`password` VARCHAR(255) NOT NULL,\n" +
"\t`phone` VARCHAR(20) UNIQUE NOT NULL,\n" +
"\t`gender` VARCHAR(5) NOT NULL,\n" +
"\t`birth_date` VARCHAR(10) NOT NULL,\n" +
"\tPRIMARY KEY (`id`)\n" +
");");
*/

//connection.query("DELETE FROM User2 WHERE name = 'guney';");
//connection.query("INSERT INTO User2 (name, surname, email, password, phone, gender, birth_date) VALUES ('guney', 'sogut', 'guneysogut@gmail.com', 'admin', '90 555 555 55 55', 'man', '2001-05-01');");



// Database check for user registration
function registerCheck(email, phone){
    var query = "SELECT * FROM User WHERE email ='" + connection.escape(email) + "' OR phone='" + connection.escape(phone) + "';";
    connection.query(query, (err,result,fields) => {
        if(err)
            return console.log(err);
        if(result != ""){
            // dont approve the transaction; there exists a user
            return console.log("there exists a user with these info");
        }
        return console.log('successful');
    });    
}

// Database check for user login
function loginCheck(email, password){
    var query = "SELECT * FROM User WHERE email='" + connection.escape(email) + "' AND password='"+ connection.escape(password) + "';";
    connection.query(query, (err,result,fields) => {
        if(err)
            return console.log(err);
        if(result != ""){
            // approve the transaction; matches with a user
            return console.log("login successfull");
        }
        return console.log("unsuccessful");
    });
}

// Checks the ticket by pnr no
function checkTicketByPNR(pnr_no){
    var query = "SELECT * FROM passenger WHERE pnr_no=" + connection.escape(pnr_no) + ";";
    connection.query(query, (err,result,fields) => {
        if(err) return console.log(err);
        if(result != ""){
             // approve the transaction; matches with a ticket
            return console.log("PNR no is valid");
        }
        return console.log("PNR no is invalid");
    });
}

// Checks the ticket by pnr no
function checkTicketByPNRandSurname(pnr_no,surname){
    var query = "SELECT * FROM passenger WHERE pnr_no=" + connection.escape(pnr_no) + " AND surname =" + connection.escape(surname) + ";";
    connection.query(query, (err,result,fields) => {
        if(err) return console.log(err);
        if(result != ""){
             // approve the transaction; matches with a ticket
            return console.log("PNR no is valid");
        }
        return console.log("PNR no is invalid");
    });
}


function checkEmployeeLogin(national_id,password){
    var query = "SELECT * FROM personnel WHERE national_id=" + connection.escape(national_id) + " AND password =" + connection.escape(password) + ";";
    connection.query(query, (err,result,fields) => {
        if(err) return console.log(err);
        if(result != ""){
             // approve the transaction; matches with a ticket
            return console.log("Employee found successfull");
        }
        return console.log("Employee not found");
    });
}

/*
export const checkEmployeeLogin = async (req,res) => {
	const body = req.body;
	if(typeof body.national_id !== "string" && typeof body.password !== "string"){
		res.status(400).send("Bad credentials");
		return;
	}
	const query = 'SELECT * FROM personnel WHERE national_id = ' + connection.escape(body.national_id) +
			      ' AND password = ' + connection.escape(body.password);

		connection.query(query, function(err, result) {
			if (err || result.length === 0) {
				res.status(404).send("Invalid email or password");
				return;
			} else {
				res.status(200).json({token : result[0].id});
				return;
			}
		});
} 
*/

function createTables(){  

    /*
    // creating the User table
    var query = "CREATE TABLE `User` (\n" +
    "\t`id` INT NOT NULL AUTO_INCREMENT,\n" +
    "\t`name` VARCHAR(255) NOT NULL,\n" +
    "\t`surname` VARCHAR(255) NOT NULL,\n" +
    "\t`email` VARCHAR(255) UNIQUE NOT NULL,\n" +
    "\t`password` VARCHAR(255) NOT NULL,\n" +
    "\t`phone` VARCHAR(20) UNIQUE NOT NULL,\n" +
    "\t`gender` VARCHAR(5) NOT NULL,\n" +
    "\t`birth_date` DATE NOT NULL,\n" +
    "\tPRIMARY KEY (`id`)\n" +
    ");"

    connection.query(query);


    // BaggageAllowance,LuggageId,Weight,Piece
    query = "CREATE TABLE `Luggage` (\n" +
    "\t`luggage_id` VARCHAR(12) UNIQUE NOT NULL,\n" +
    "\t`baggage_allowence` FLOAT NOT NULL,\n" +
    "\t`weight` FLOAT NOT NULL,\n" +
    "\t`piece` INT NOT NULL,\n" +
    "\tPRIMARY KEY (`luggage_id`)\n" +
    ");"


    connection.query(query);



    // PassengerId,PnrNo,FlightNumber,BaggageAllowance,LuggageId,FareType,Seat,Meal,
    // ExtraLuggage,CheckIn,Name,Surname,Email,PhoneNumber,Gender,BirthDate,CipMember,VipMember,Child,Disabled
    query = "CREATE TABLE `Passenger` (\n" +
    "\t`national_id` VARCHAR(11) UNIQUE NOT NULL,\n" +
    "\t`pnr_no` VARCHAR(8) UNIQUE NOT NULL,\n" +
    "\t`baggage_allowance` FLOAT NOT NULL,\n" +
    "\t`luggage_id` VARCHAR(12) UNIQUE NOT NULL,\n" +
    "\t`fare_type` VARCHAR(20) NOT NULL,\n" +
    "\t`seat` VARCHAR(3) NOT NULL,\n" +
    "\t`meal` BOOLEAN NOT NULL,\n" +
    "\t`extra_luggage` BOOLEAN NOT NULL,\n" +
    "\t`check_in` BOOLEAN NOT NULL,\n" +
    "\t`name` VARCHAR(255) NOT NULL,\n" +
    "\t`surname` VARCHAR(255) NOT NULL,\n" +
    "\t`email` VARCHAR(255) UNIQUE NOT NULL,\n" +
    "\t`phone` VARCHAR(20) UNIQUE NOT NULL,\n" +
    "\t`gender` VARCHAR(5) NOT NULL,\n" +
    "\t`birth_date` DATE NOT NULL,\n" +
    "\t`cip_member` BOOLEAN NOT NULL,\n" +
    "\t`vip_member` BOOLEAN NOT NULL,\n" +
    "\t`disabled` BOOLEAN NOT NULL,\n" +
    "\t`child` BOOLEAN NOT NULL,\n" +
    "\tPRIMARY KEY (`national_id`),\n" +
    "\tFOREIGN KEY (luggage_id) REFERENCES Luggage (luggage_id) ON UPDATE CASCADE ON DELETE SET DEFAULT" +
    ");"

    connection.query(query);




    
    query = "CREATE TABLE `Personnel` (\n" +
    "\t`national_id` VARCHAR(11) UNIQUE NOT NULL,\n" +
    "\t`name` VARCHAR(255) NOT NULL,\n" +
    "\t`surname` VARCHAR(255) NOT NULL,\n" +
    "\t`email` VARCHAR(255) UNIQUE NOT NULL,\n" +
    "\t`phone` VARCHAR(20) UNIQUE NOT NULL,\n" +
    "\t`gender` VARCHAR(5) NOT NULL,\n" +
    "\t`birth_date` VARCHAR(10) NOT NULL,\n" +
    "\t`password` VARCHAR(255) NOT NULL,\n" +
    "\t`permission` VARCHAR(255) NOT NULL,\n" +
    "\t`title` VARCHAR(255) NOT NULL,\n" +
    "\tPRIMARY KEY (`national_id`)\n" +
    ");"

    connection.query(query);
    


    

    // Plane Registration,Plane Type,Location, Max Passengers, Is active
    var query = "CREATE TABLE `Plane` (\n" +
    "\t`plane_registration` VARCHAR(6) UNIQUE NOT NULL,\n" +
    "\t`model` VARCHAR(255) NOT NULL,\n" +
    "\t`location` VARCHAR(10) NOT NULL,\n" +
    "\t`max_passengers` INT NOT NULL,\n" +
    "\t`is_active` BOOLEAN NOT NULL,\n" +
    "\tPRIMARY KEY (`plane_registration`)\n" +
    ");"

    connection.query(query);



    // Flight Number,Departure Airport,Destination Airport,Departure Time,Arrival Time,Gate Number, Plane Registration, Status
    query = "CREATE TABLE `Flight` (\n" +
    "\t`flight_number` VARCHAR(7) UNIQUE NOT NULL,\n" +
    "\t`departure_airport` VARCHAR(10) NOT NULL,\n" +
    "\t`destination_airport` VARCHAR(10) NOT NULL,\n" +
    "\t`departure_time` DATETIME NOT NULL,\n" +
    "\t`arrival_time` DATETIME NOT NULL,\n" +
    "\t`gate_number` VARCHAR(15) NOT NULL,\n" +
    "\t`plane_registration` VARCHAR(6) UNIQUE NOT NULL,\n" +
    "\t`status` VARCHAR(50) UNIQUE NOT NULL,\n" +
    "\tPRIMARY KEY (`flight_number`),\n" +
    "\tFOREIGN KEY (plane_registration) REFERENCES Plane(plane_registration) ON UPDATE CASCADE ON DELETE SET DEFAULT\n" +
    ");"

    connection.query(query);


    /*
    query = "CREATE TABLE `Pilot` (\n" +
    "\t`id` INT NOT NULL AUTO_INCREMENT,\n" +
    "\t`national_id` VARCHAR(11) UNIQUE NOT NULL,\n" +
    "\t`name` VARCHAR(255) NOT NULL,\n" +
    "\t`surname` VARCHAR(255) NOT NULL,\n" +
    "\t`email` VARCHAR(255) UNIQUE NOT NULL,\n" +
    "\t`phone` VARCHAR(20) UNIQUE NOT NULL,\n" +
    "\t`gender` VARCHAR(5) NOT NULL,\n" +
    "\t`birth_date` VARCHAR(10) NOT NULL,\n" +
    "\t`password` VARCHAR(255) NOT NULL,\n" +
    "\t`permission` VARCHAR(255) NOT NULL,\n" +
    "\t`title` VARCHAR(255) NOT NULL,\n" +
    "\tPRIMARY KEY (`id`)\n" +
    "\tFOREIGN KEY (`plane_registration`) REFERENCES Plane('plane_registration')\n" +
    ");"
    

    connection.query(query);
    */
}

//createTables();
function getFiles(dir, files = []) {
    // Get an array of all files and directories in the passed directory using fs.readdirSync
    const fileList = fs.readdirSync(dir)
    // Create the full path of the file/directory by concatenating the passed directory and file/directory name
    for (const file of fileList) {
      const name = `${dir}/${file}`
      // Check if the current file/directory is a directory using fs.statSync
      if (fs.statSync(name).isDirectory()) {
        // If it is a directory, recursively call the getFiles function with the directory path and the files array
        getFiles(name, files)
      } else {
        // If it is a file, push the full path to the files array
        if(name.includes('Passenger') || name.includes('Luggage'))
            files.push(name)
      }
    }
    return files
  }

  function setStaticTime(){

    const staticTime = '2024-01-04 10:30:00';
    const query1 = "UPDATE flight SET status = 'completed'  WHERE arrival_time < '" + staticTime  + "';";
    const query2 = "UPDATE flight SET status = 'onflight'  WHERE departure_time <= '" + staticTime  + "' AND arrival_time >= '" + staticTime + "';";
    const query3 = "UPDATE flight SET status = 'scheduled'  WHERE departure_time > '" + staticTime  + "';";

    Promise.all([connection.query(query1),connection.query(query2),connection.query(query3)])
        .then(([result1,result2,result3]) => {console.log})
        .catch(console.log);


//    "UPDATE passenger SET check_in = true WHERE national_id = " + connection.escape(result[0].national_id) +";"

      
  }

  //setStaticTime();