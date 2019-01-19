process.on("uncaughtException", console.error);

const app = require("./app");
const http = require("http");
const socketIo = require("socket.io");
const db = require("./db");

const PORT = process.env.PORT || 8000;

const http_server = http.createServer(app);
const io = socketIo(http_server);

// Converts array of objects into object
const mapArrayByProp = (arr, prop) =>
  Object.assign({}, ...arr.map(el => ({ [el[prop]]: el })));

// check if runner is registered in DB..
const checkChipId = (athletes, chipId) => {
  for (const id in athletes) {
    if (athletes[id].AthleteID.indexOf(chipId) > -1) {
      console.log(athletes[id].FullName);
      return athletes[id].FullName;
    }
  }
};

// clock-time with 2 decimals precision
const getRandomArbitrary = (min, max) => {
  const precision = 100;
  const randomnum =
    Math.floor(
      Math.random() * (max * precision - min * precision) + min * precision
    ) /
    (min * precision);
  return randomnum;
};

// converts array of object to object.. use for client-testing case
const mapArray = arr => arr.map(el => el);

io.on("connection", (socket, callback) => {
  console.log("[new socket] connected");

  const clientType = socket.handshake.query.clientType;

  // Joining to room
  socket.join(clientType);

  // for testing client-side as required in task
  if (clientType === "uiClientTest") {
    socket.on("start", ({ startRunner }) => {
      db.getAthletes((err, athletes) => {
        if (err) return void callback(err);

        athletes = mapArray(athletes);

        athletes.forEach(athlete => {
          if (athlete.AthleteID !== startRunner.AthleteID) {
            return;
          }

          if (athlete.AthleteID == startRunner.AthleteID) {
            athlete.StartTime = getRandomArbitrary(1, 3);

            console.log("athletes from browser", athlete);
            socket.emit("incorridor", athlete);
            return;
          }
        });
      });
    });

    socket.on("finish", ({ finishRunner }) => {
      console.log("finishline athletes from browser", finishRunner);

      db.getAthletes((err, athletes) => {
        if (err) return void callback(err);

        athletes = mapArray(athletes);

        athletes.forEach(athlete => {
          if (athlete.AthleteID !== finishRunner.AthleteID) {
            return;
          }

          if (athlete.AthleteID == finishRunner.AthleteID) {
            athlete.FinishTime = getRandomArbitrary(5, 10);
            // TODO: IMPLEMENT mergesort for on finishTime before emit
            console.log("athletes from browser", athlete);
            
            socket.emit("getfinish", athlete);
            return;
          }
        });
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      // TODO.. non-mandatory task
    });
  }

  // Posssibly real time scenario suggestion code(real life runner).
  // P.S.. Pay attention to how emit is done
  if (clientType === "runner") {
    let runners = [];
    socket.on("getTime", (chipId, locationType, time) => {
      module.exports = () => {
        if (!chipId)
          return void callback({
            status: 400,
            message: "AthletechipId cannot be empty"
          });

        db.getAthletes((err, athletes) => {
          if (err) return void callback(err);

          athletes = mapArrayByProp(athletes, "AthleteID");

          checkChipId(athletes, chipId);
          if (!Object.keys(athletes).length)
            return void callback({
              status: 400,
              message: "No Athletes passed from ChipId check"
            });
          athletes.locationType = locationType;
          athletes.time = time;
          db.runner(athletes);
          runners.push(athletes);
        });
      };

      // Send the response object to all ui clients
      io.to("uiClients").emit("sendingData", runners);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  }
});

http_server.listen(PORT, console.log("Listening on", PORT));
