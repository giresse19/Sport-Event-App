const models = require('./models');

module.exports = {
  getLogs: (callback) => models.Log.find({}, callback),

  getAthletes: (callback) => models.Athlete.find({}, callback),

  log: (message) => {
    let record = new models.Log({message});
    record.save();
  },

  initialize: function (callback) {   
    models.Athlete.remove({}, (err) => { if (err) return void callback(err); });
    models.Log.remove({}, (err) => { if (err) return void callback(err); });

    const athletes = [
      { AthleteID: 1, StartNumber: 100, FullName: 'Usain BOLT' },
      { AthleteID: 3, StartNumber: 200, FullName: 'Carl LEWIS' },
      { AthleteID: 2, StartNumber: 300, FullName: 'Justin GATLIN' },
      { AthleteID: 6, StartNumber: 400, FullName: 'Linford CHRISTIE' },
      { AthleteID: 7, StartNumber: 500, FullName: 'Maurice GREENE' },
      { AthleteID: 5, StartNumber: 600, FullName: 'Frank Jarvis' },
      { AthleteID: 8, StartNumber: 700, FullName: 'Valery BORZOV' },
      { AthleteID: 9, StartNumber: 800, FullName: 'Archie Hahn' },
      { AthleteID: 4, StartNumber: 900, FullName: 'Ralph Craig' },
      { AthleteID: 10, StartNumber: 10, FullName: 'Charley Paddock' },
      { AthleteID: 13, StartNumber: 20, FullName: 'Harold Abrahams' },
      { AthleteID: 12, StartNumber: 30, FullName: 'Harold Abrahams' },
      { AthleteID: 16, StartNumber: 40, FullName: 'Eddie Tolan' },
      { AthleteID: 17, StartNumber: 50, FullName: 'Harrison Dillard' },
      { AthleteID: 15, StartNumber: 60, FullName: 'Lindy Remigino' },
      { AthleteID: 18, StartNumber: 70, FullName: 'Bobby Morrow' },
      { AthleteID: 19, StartNumber: 80, FullName: ' Armin Hary' },
      { AthleteID: 14, StartNumber: 90, FullName: 'Linford Christie' }
    ];

    models.Athlete.insertMany(athletes, (err) => {
      if (err) return void callback(err);

      this.log('Database initialized');

      callback(null, 'Database initialize complete');
    });
  }
};
