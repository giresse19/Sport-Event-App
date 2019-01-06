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
      { AthleteID: 1, StartNumber: 100, FullName: 'Bill Gates' },
      { AthleteID: 3, StartNumber: 200, FullName: 'Warren Buffets' },
      { AthleteID: 2, StartNumber: 300, FullName: 'Mark Zuckerberg' },
      { AthleteID: 6, StartNumber: 400, FullName: 'Donald Trump' },
      { AthleteID: 7, StartNumber: 500, FullName: 'Michele Obama' },
      { AthleteID: 5, StartNumber: 600, FullName: 'Enow Cecilia' },
      { AthleteID: 8, StartNumber: 700, FullName: 'Elion Musk' },
      { AthleteID: 9, StartNumber: 800, FullName: 'Marie Curie' },
      { AthleteID: 4, StartNumber: 900, FullName: 'Kersti Kaljulaid' }
    ];

    models.Athlete.insertMany(athletes, (err) => {
      if (err) return void callback(err);

      this.log('Database initialized');

      callback(null, 'Database initialize complete');
    });
  }
};
