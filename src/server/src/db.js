const models = require('./models');

module.exports = {
  getLogs: (callback) => models.Log.find({}, callback),

  getAthletes: (callback) => models.Athlete.find({}, callback),

  log: (message) => {
    let record = new models.Log({ message });
    record.save();
  },

  initialize: function (callback) {
    models.Athlete.remove({}, (err) => { if (err) return void callback(err); });
    models.Log.remove({}, (err) => { if (err) return void callback(err); });

    const athletes = [
      { AthleteID: 1, StartNumber: 100, FullName: 'Usain BOLT', StartTime: '' },
      { AthleteID: 3, StartNumber: 200, FullName: 'Carl LEWIS', StartTime: '' },
      { AthleteID: 2, StartNumber: 300, FullName: 'Justin GATLIN', StartTime: '' },
      { AthleteID: 6, StartNumber: 400, FullName: 'Linford CHRISTIE', StartTime: '' },
      { AthleteID: 7, StartNumber: 500, FullName: 'Maurice GREENE', StartTime: '' },
      { AthleteID: 5, StartNumber: 600, FullName: 'Frank Jarvis', StartTime: '' },
      { AthleteID: 8, StartNumber: 700, FullName: 'Valery BORZOV', StartTime: '' },
      { AthleteID: 9, StartNumber: 800, FullName: 'Archie Hahn', StartTime: '' },
      { AthleteID: 4, StartNumber: 900, FullName: 'Ralph Craig', StartTime: '' },
      { AthleteID: 10, StartNumber: 10, FullName: 'Charley Paddock', StartTime: '' },
      { AthleteID: 13, StartNumber: 20, FullName: 'Harold Abrahams', StartTime: '' },
      { AthleteID: 12, StartNumber: 30, FullName: 'Harold Abrahams', StartTime: '' },
      { AthleteID: 16, StartNumber: 40, FullName: 'Eddie Tolan', StartTime: '' },
      { AthleteID: 17, StartNumber: 50, FullName: 'Harrison Dillard', StartTime: '' },
      { AthleteID: 15, StartNumber: 60, FullName: 'Lindy Remigino', StartTime: '' },
      { AthleteID: 18, StartNumber: 70, FullName: 'Bobby Morrow', StartTime: '' },
      { AthleteID: 19, StartNumber: 80, FullName: ' Armin Hary', StartTime: '' },
      { AthleteID: 14, StartNumber: 90, FullName: 'Linford Christie', StartTime: '' }
    ];

    models.Athlete.insertMany(athletes, (err) => {
      if (err) return void callback(err);

      this.log('Database initialized');

      callback(null, 'Database initialize complete');
    });
  }
};
