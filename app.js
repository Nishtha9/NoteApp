//console.log('Starting app.js');

const fs=require('fs');
const l=require('lodash');
const yargs=require('yargs');

const notes=require('./notes.js');

const titleOptions={  description:'Note title',
            demand: true,
            alias: 't'
          };
const bodyOptions={
                description:'Body of the note',
                demand:true,
                alias: 'b'
          }
const argv=yargs
.command('add','Add a new note',{
  title :titleOptions ,
  body:bodyOptions
})
.command('list', 'list all notes')
.command('read','Read a note',{
  title:titleOptions
})
.command('remove','Remove a note',{
  title: titleOptions
})
.help()
.argv;
var command= argv._[0];
//console.log('Command: ',command);
//console.log('Yargs: ',argv);

if (command === 'add')
{
  var note=notes.addNote(argv.title,argv.body);
  if (note===undefined) {
    console.log('The note could not be saved because this title alredy exists.');
  }
  else {
    console.log('Note saved');
    notes.logNote(note);
  }
}
else if (command === 'list') {
  var allNotes= notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note)=> notes.logNote(note));
}
else if (command==='read') {
var note=  notes.getNote(argv.title);
if (note){
  console.log('Note found');
  notes.logNote(note);
}
else{
  console.log('Note not found.');
}
} else if (command==='remove') {
  var note=notes.removeNote(argv.title);
  var message=note?'Note removed.':'Note not found.';
  console.log(message);
}
else {
  console.log('Command not recognized.');
}
