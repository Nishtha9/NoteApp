var fs=require('fs');

var fetchNotes= ()=>{
  try {
  var noteString=fs.readFileSync('notes-data.json');
  return JSON.parse(noteString);
  } catch(e) {
  return [];
  }
};
var saveNotes= (notes)=>{
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

var addNote= (title,body) => {
  var notes=fetchNotes();
  var note={
    title,
    body
  };

var duplicates=notes.filter((note) => note.title===title);

if (duplicates.length ===0 )
{
notes.push(note);
saveNotes(notes);
return note;
};

};

var getAll=() => {
  return fetchNotes();
};

var getNote= (title) => {
  var notes=fetchNotes();
  var filtered=notes.filter((note)=> note.title === title );
  return filtered[0];
};

var removeNote= (title) => {
var notes=fetchNotes();
var filtered=notes.filter((note) => (note.title!==title));
saveNotes(filtered);
if (notes.length!==filtered.length)
{
  return true;
}
else return false;
};

var logNote=(note)=>{
  console.log('--');
  console.log('Title: ',note.title);
  console.log('Body: ',note.body);
};

module.exports={
  addNote, getAll, getNote, removeNote, logNote
};
