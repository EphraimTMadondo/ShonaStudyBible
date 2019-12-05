import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export class Database {
  constructor(dbName) {
    this.dbName = dbName;
  }

  initDB = () => {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check ...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed ...');
          console.log('Opening database ...');
          SQLite.openDatabase({
            name: this.dbName,
            createFromLocation: 1,
          })
            .then(DB => {
              db = DB;
              console.log('Database OPEN');
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest failed - plugin not functional');
        });
    });
  };

  closeDatabase = db => {
    if (db) {
      console.log('Closing DB');
      db.close()
        .then(status => {
          console.log('Database CLOSED');
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log('Database was not OPENED');
    }
  };

  listVerses = () => {
    return new Promise(resolve => {
      this.initDB().then(db => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM words WHERE bookNum = 1 AND chNum = 1',
            [],
          )
            .then(([tx, results]) => {
              console.log('Query completed');
              console.log({results});
              resolve(results);
            })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        }).catch(err => {
          console.log(err);
        });
      });
    });
  };
}
