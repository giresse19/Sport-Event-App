process.on('uncaughtException', console.error);

const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const db = require('./db');

const PORT = process.env.PORT || 8000;

const http_server = http.createServer(app);
const io = socketIo(http_server);


// Converts array of objects into object
const mapArrayByProp = (arr, prop) => Object.assign({}, ...arr.map((el) => ({ [el[prop]]: el })));

// check if runner is registered in DB.. 
const checkChipId = (athletes, chipId) => {
	for (const id in athletes) {
		if ((athletes[id].AthleteID.indexOf(chipId) > -1)) {
			console.log(athletes[id].FullName)
			return athletes[id].FullName;
		}
	}
};

const  generateRandomTime = (min_value , max_value) => {    
	let random_time = Math.random() * (max-min) + min;
	 return Math.floor(random_time);
 }

// converts array of object to object.. use for client-testing case
const mapArray = (arr) => arr.map((el) => el);

io.on('connection', (socket, callback) => {
	console.log('[new socket] connected');

	const clientType = socket.handshake.query.clientType;

	// Joining to room
	socket.join(clientType);

	// for testing client-side as required in task
	if (clientType === 'uiClientTest') {

		socket.on('start', ({ runner }) => {

			console.log('athletes from browser', runner);

			db.getAthletes((err, athletes) => {
				if (err) return void callback(err);

				athletes = mapArray(athletes);
				const runners = [];
				
				runner.forEach((runnerElement) => {
					athletes.forEach((athlete) => {
						if(athlete.AthleteID === runnerElement.AthleteID){
                           runners.push(athlete)
						}
					})
				})
				
				console.log('athletes from DB', runners);
				socket.emit('incorridor', 					
						runners
					);
			})
		});

		socket.on('finish', ({ runner }) => {

			console.log('finishline athletes from browser', runner);

			db.getAthletes((err, athletes) => {
				if (err) return void callback(err);

				athletes = mapArray(athletes);
				const runnersFinal = [];

				runner.forEach((runnerElement) => {
					athletes.forEach((athlete) => {
						if(athlete.AthleteID == runnerElement.AthleteID){
							runnersFinal.push(athlete)
						}
					})
				})

				console.log('finishing line...', runnersFinal);

				socket.emit('getfinish',					
						runnersFinal
					);
			})
		});

		socket.on('disconnect', () => {
			console.log('Client disconnected');
			// TODO.. non-mandatory task
		});
	}


	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  */
	// An example real time scenario code(real life runner)..just a suggestion code.
	// P.S.. Pay attention to how emit is done	
	if (clientType === 'runner') {

		let runners = [];
		socket.on('getTime', (chipId, locationType, time) => {
			module.exports = () => {
				if (!chipId) return void callback({ status: 400, message: 'AthletechipId cannot be empty' });

				// get the athlete from database using chipId, create a response object including athlete info
				db.getAthletes((err, athletes) => {
					if (err) return void callback(err);

					athletes = mapArrayByProp(athletes, 'AthleteID');

					checkChipId(athletes, chipId);
					if (!Object.keys(athletes).length)
						return void callback({ status: 400, message: 'No Athletes passed from ChipId check' });
					athletes.locationType = locationType;
					athletes.time = time;
					db.runner(athletes);
					runners.push(athletes);
				});
			};

			// Send the response object to all ui clients
			io.to('uiClients').emit('sendingData', runners);
		});

		socket.on('disconnect', () => {
			console.log('Client disconnected');
		});
	}

});

http_server.listen(PORT, console.log('Listening on', PORT));

