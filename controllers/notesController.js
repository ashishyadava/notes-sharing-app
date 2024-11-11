const poolImport = require("../db/pool");

const pool = poolImport;

exports.getNotes = async (req, res) => {

    const userId = req.user.id;
    let result;
    try{
      result = await pool.query("SELECT * FROM notes WHERE user_id = $1", [userId]);
    }catch(error) {
      console.error(error);
      res.status(500).send("Error fetching notes");
    }


    res.render('notes', {user : req.user, notes: result.rows})
}

exports.createNote = async(req, res) => {

    const {heading, content} = req.body;
    const userId = req.user.id;

    try {
        await pool.query(
          "INSERT INTO notes (user_id, heading, content) VALUES ($1, $2, $3)",
          [userId, heading, content]
        );
        res.redirect("/notes"); //doubt here, why doing this again if we are already sending post request to /notes from frontend
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving note!!!");
    }

}

exports.getNotesPage = (req, res) => {

    res.render('create-notes', {user: req.user});

}

exports.deleteNote = async(req, res) => {

    console.log(req.params);
    const noteId = req.params.id;

    try{
        const result = await pool.query("DELETE FROM notes WHERE note_id = $1", [noteId]);
        res.redirect('/notes');
    }catch(err) {
        console.error(err);
        res.status(500).send("Error deleting note");
    }
}

exports.editNote = async(req, res) => {

  const noteId = Number(req.params.id);
  const {heading, content} = req.body;

  try{
      const result = await pool.query("UPDATE notes SET heading = $1, content = $2 WHERE note_id = $3", [heading, content, noteId]);
      res.redirect('/notes');
  }catch(err) {
      console.error(err);
      res.status(500).send("Error deleting note");
  }
}

exports.showEditForm = async (req, res) => {
  const noteId = req.params.id;

  try {
    
    const result = await pool.query("SELECT * FROM notes WHERE note_id = $1", [noteId]);
    const note = result.rows[0];
    console.log(note);
    res.render('edit-note', { note });


  } catch (error) {
      console.error(error)
      res.status(500).send("Error retriving note");
  }


}