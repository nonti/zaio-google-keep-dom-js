
class Note {
    constructor(id, title, text) {
        this.title = title;
        this.text = text;
        this.id = id;
    }
}

class App {
    constructor() {
        this.notes = [];

        this.$activeForm = document.querySelector(".active-form");
        this.$inactiveForm = document.querySelector(".inactive-form");
        this.$noteTitle = document.querySelector(".note-title");
        this.$noteText = document.querySelector(".note-text");

        // getting the cursor focused when active form replaces inactive form
        this.$noteTitle = document.querySelector("#note-title");
        this.$noteText = document.querySelector("#note-text");
        

        this.addEventListeners();
    }

    addEventListeners(){
        document.body.addEventListener("click", (event) => {
        this.handleFormClick(event);
        });
    }

    handleFormClick(event) {
        const isActiveFormClickedOn = this.$activeForm.contains(event.target);
        const isInActiveFormClickedOn = this.$inactiveForm.contains(event.target);
        const title = this.$noteTitle.value;
        const text =  this.$noteText.value;

        console.log((cuid()));

        if (isInActiveFormClickedOn) {
            this.openActiveForm();
        } else if (!isInActiveFormClickedOn && !isActiveFormClickedOn) {
            this.addNote(title, text);
            this.closeActiveForm();
        }
    }

    closeActiveForm() {
        this.$inactiveForm.style.display = "block";
        this.$activeForm.style.display = "none";
        this.$noteText.value = "";
        this.$noteTitle.value = "";
    }
    

    openActiveForm() {
        this.$inactiveForm.style.display = "none";
        this.$activeForm.style.display = "block";
        this.$noteText.focus();
    }
    
    addNote({ title, text }) {
        if (!text == "") {
            const newNote = new Note(cuid(), title, text);
            this.notes = [...this.notes, newNote];
            this.displayNotes();
        }

    }

    editNote(id, { title, text }) {
        this.notes = this.notes.map((note) => {
            if (note.id == id) {
                note.title = title;
                note.text = text;
            }
            return note;
        });
    }

    displayNotes() {
        this.notes.map(note => console.log(`
        ID: ${note.id}
        Title: ${note.title}
        Text: ${note.text}
        `));
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id != id);
    }

}

const app = new App();
