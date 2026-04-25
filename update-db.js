/* eslint-disable @typescript-eslint/no-require-imports */
const initSqlJs = require('sql.js');
const fs = require('fs');

async function updateDatabase() {
  const SQL = await initSqlJs();
  const dbPath = 'C:\\Users\\Hamizah\\AppData\\Roaming\\ags-monitoring-dashboard\\notifications.db';

  // Load database
  let data = null;
  if (fs.existsSync(dbPath)) {
    data = fs.readFileSync(dbPath);
    console.log('Database file loaded:', dbPath);
  } else {
    console.log('Database file NOT found at:', dbPath);
    return;
  }
  const db = new SQL.Database(data);

  // Check current table structure with PRAGMA
  console.log('\n=== PRAGMA table_info(notifications) ===');
  const tableInfo = db.exec('PRAGMA table_info(notifications)');
  if (tableInfo.length > 0) {
    console.log('Columns:');
    tableInfo[0].values.forEach(row => {
      console.log('  -', row[1], '(' + row[2] + ')', row[3] ? 'NOT NULL' : '', row[4] ? 'DEFAULT: ' + row[4] : '', row[5] ? 'PRIMARY KEY' : '');
    });
  }

  // Check current data
  console.log('\n=== Current priority values ===');
  const currPriority = db.exec('SELECT priority, COUNT(*) as count FROM notifications GROUP BY priority');
  if (currPriority.length > 0) {
    console.log('Priority distribution:');
    currPriority[0].values.forEach(row => {
      console.log('  -', row[0] || 'NULL', ':', row[1], 'records');
    });
  } else {
    console.log('No records found');
  }

  // Show sample records
  console.log('\n=== Sample records (first 5) ===');
  const sample = db.exec('SELECT id, title, priority, status, created_at FROM notifications LIMIT 5');
  if (sample.length > 0) {
    sample[0].values.forEach(row => {
      console.log('  ID:', row[0], '| Title:', row[1], '| Priority:', row[2], '| Status:', row[3], '| Date:', row[4]);
    });
  } else {
    console.log('No records');
  }

  // Now update records with priority = 'info' to 'critical'
  console.log('\n=== Running UPDATE ===');
  db.run("UPDATE notifications SET priority = 'critical' WHERE priority = 'info'");
  const changes = db.getRowsModified();
  console.log('Records updated:', changes);

  // Verify the update
  console.log('\n=== Updated priority values ===');
  const updatedPriority = db.exec('SELECT priority, COUNT(*) as count FROM notifications GROUP BY priority');
  if (updatedPriority.length > 0) {
    console.log('New priority distribution:');
    updatedPriority[0].values.forEach(row => {
      console.log('  -', row[0] || 'NULL', ':', row[1], 'records');
    });
  }

  // Save changes
  const buffer = Buffer.from(db.export());
  fs.writeFileSync(dbPath, buffer);
  console.log('\nDatabase saved successfully!');

  db.close();
}

updateDatabase().catch(console.error);