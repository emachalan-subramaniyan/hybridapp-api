const client = require('./client');


const create_notes_table_query = `
CREATE TABLE IF NOT EXISTS notes (
  id varchar NOT NULL,
  title varchar,
  content varchar,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp,
  PRIMARY KEY (id)
);
`;

client
  .query(create_notes_table_query)
  .then(result => {
    console.log('notes table created successfully');
  })
  .catch(e => console.error('users db connection error', e.stack));
