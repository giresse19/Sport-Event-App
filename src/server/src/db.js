const models = require("./models");

module.exports = {
  getLogs: callback => models.Log.find({}, callback),

  getAthletes: callback => models.Athlete.find({}, callback),

  log: message => {
    let record = new models.Log({ message });
    record.save();
  },

  // database collection for testing purpose
  initialize: function(callback) {
    models.Athlete.remove({}, err => {
      if (err) return void callback(err);
    });
    models.Log.remove({}, err => {
      if (err) return void callback(err);
    });

    const athletes = [
      {
        AthleteID: 1,
        StartNumber: 100,
        FullName: "Usain BOLT",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 3,
        StartNumber: 200,
        FullName: "Carl LEWIS",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 2,
        StartNumber: 300,
        FullName: "Justin GATLIN",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 6,
        StartNumber: 400,
        FullName: "Linford CHRISTIE",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 7,
        StartNumber: 500,
        FullName: "Maurice GREENE",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 5,
        StartNumber: 600,
        FullName: "Frank Jarvis",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 8,
        StartNumber: 700,
        FullName: "Valery BORZOV",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 9,
        StartNumber: 800,
        FullName: "Archie Hahn",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 4,
        StartNumber: 900,
        FullName: "Ralph Craig",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 10,
        StartNumber: 10,
        FullName: "Charley Paddock",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 13,
        StartNumber: 20,
        FullName: "Harold Abrahams",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 12,
        StartNumber: 30,
        FullName: "Harold Abrahams",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 16,
        StartNumber: 40,
        FullName: "Eddie Tolan",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 17,
        StartNumber: 50,
        FullName: "Harrison Dillard",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 15,
        StartNumber: 60,
        FullName: "Lindy Remigino",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 18,
        StartNumber: 70,
        FullName: "Bobby Morrow",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 19,
        StartNumber: 80,
        FullName: " Armin Hary",
        StartTime: "",
        FinishTime: ""
      },
      {
        AthleteID: 14,
        StartNumber: 90,
        FullName: "Linford Christie",
        StartTime: "",
        FinishTime: ""
      }
    ];

    models.Athlete.insertMany(athletes, err => {
      if (err) return void callback(err);

      this.log("Database initialized");

      callback(null, "Database initialize complete");
    });
  }
};
