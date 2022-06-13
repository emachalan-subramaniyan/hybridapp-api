const crypto = require("crypto");
const client = require('../../db/client');

const createNote = (request, callback) => {
  const id = crypto.randomBytes(16).toString("hex");
    const { title, content } = request;
  
    client.query(
      "INSERT INTO notes (title, content, id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, id],
      (error, result) => {
        if (error) {
          callback(error.message, null);
          return
        }
        callback(null, result.rows[0]);
      }
    );
  };
  
  
  const updateNote = (request, callback) => {
    if(request.id){
      getNoteById(request.id, (err, result) => {
        if (err) {
          callback(err.message, null);
          return
        }
        let id = request.id;
        let title = request.title ?? result.title;
        let content = request.content ?? result.content;

        client.query(
          'UPDATE notes SET title=($2), content=($3) WHERE id=($1) RETURNING *',
          [id, title, content],
          (error, result) => {
            if (error) {
              callback(error.message, null);
              return
            }
            callback(error, result.rows[0]);
          }
        );
      })
    } else {
      callback(`No data found on this id ${request.id}`, null);
    }
  };

  const getNoteById = (id, callback) => {
    try {
      client.query(`select * from notes where id = '${id}'`, (err, res) => {
        if(err) {
          callback(err.message, null);
          return
        } else {
          callback(null, res.rows[0] ?? null);
        }
      })
    } catch (error) {
      console.log(error.message, null);
    }
  };

  const getNotes = (callback) => {
    client.query(`select * from notes`, (err, res) => {
      if(err) {
        callback(err.message, null);
        return
      } else {
        callback(err, res.rows);
      }
    })
  }

  const deleteNote = (id, callback) => {
    client.query(`delete from notes where id = '${id}';`, (err, res) => {
      if(err) {
        callback(err.message, null);
        return
      } else {
        callback(err, res.rows);
      }
    })
  }

  const getNotesBySearch = (search, callback) => {
    if(search){
      client.query(`select * from notes where title LIKE '%${search}%' `, (err, res) => {
        if(err) {
          callback(err.message, null);
          return
        } else {
          callback(err, res.rows);
        }
      });
    }
  }
  
  module.exports = {
    createNote,
    updateNote,
    getNoteById,
    getNotes,
    getNotesBySearch,
    deleteNote
  }