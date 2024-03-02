import airports from '../airports.json' with { type: 'json' };
import { createConnection } from 'mysql2';
import dayjsRandom from 'dayjs-random';
import dayjs from 'dayjs';
import _ from 'underscore';

dayjs.extend(dayjsRandom);

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALPHANUMERIC = ALPHABET + '0123456789';
const TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss';
const iata = airports.map(airport => airport.iata);
const statuses = ['onflight', 'completed', 'scheduled'];

const NUM_FLIGHTS = 180;
const START = 10137;
const END = 99999;
const MID = (START + END) / 2;
const STEP = Math.ceil(Math.floor(END - START) / NUM_FLIGHTS);

const quote = s => `'${s}'`;

const randomPrice = () => (1000 * (1 + Math.random())).toFixed(2);
const randomGateNumber = () =>  'Gate ' + _.sample(ALPHABET) + _.random(100, 1000).toString();

const randomAirport = seed => seed > MID 
    ? ['ADB', _.sample(iata)]
    : [_.sample(iata), 'ADB'];

const randomTime = () => {
    const departure_time = dayjs.between('2024-01-15', '2024-01-31');
    const arrival_time = departure_time.add(_.random(30, 120), 'minute');
    return [departure_time.format(TIME_FORMAT), arrival_time.format(TIME_FORMAT)];
}


const generateFlights = (regs) => _.range(START, END, STEP).map(seed => {
    // Keys
    const flight_number = `TK${seed}`;
    const plane_registration = _.sample(regs);

    const [departure_airport, destination_airport] =  randomAirport();
    const gate_number = randomGateNumber();
    const [departure_time, arrival_time] = randomTime();
    const price = randomPrice();

    const columns = [
        flight_number,
        departure_airport,
        destination_airport,
        departure_time,
        arrival_time,
        gate_number,
        plane_registration,
        'scheduled',
    ].map(quote)

    columns.unshift('DEFAULT');
    columns.push(price);

    return `(${columns.join(',')})`;
})

const connection = createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "ams",
    password: "12345678",
}).promise();

connection
    .query("SELECT plane_registration FROM plane")
    .then(([columns]) => columns.map(col => col.plane_registration))
    .then(generateFlights)
    .then(values => "INSERT INTO flight VALUES " + values.join(','))
    .then(query => connection.query(query))
    .then(([{affectedRows}]) => console.log("Success, the number of inserted records is: ", affectedRows))
    .catch(console.log)
    .finally(() => connection.close());
