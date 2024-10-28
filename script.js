document.addEventListener("DOMContentLoaded", function () {
    const noteContainer = document.getElementById("note-container");
    const newNoteButton = document.getElementById("new-note-button");
    const colorForm = document.getElementById("color-form");
    const colorInput = document.getElementById("color-input");

    // 1	// TODO: Load the note color from the local storage.
    let noteColor = localStorage.getItem("noteColor") || null; // Stores the selected note color from the form.
    console.log(noteColor);


    // 2	// TODO: Load the note ID counter from the local storage.
    let noteIdCounter = Number(localStorage.getItem("noteIdCounter")) || 0;  // Counter for assigning unique IDs to new notes.

    // 3	// TODO: Load the notes from the local storage.

    function readNotes() {
        let notes = localStorage.getItem("notes")

        if (!notes) {
            notes = {};
        }
        else {
            notes = JSON.parse(localStorage.getItem("notes"));
        }
        return notes;
    }


    function loadNotes() {
        let notes = JSON.parse(localStorage.getItem("notes")) || {};

        for (const note of notes) {

            const note = document.createElement("textarea");
            note.setAttribute("data-note-id", id.toString()); // Stores the note ID to its data attribute.
            note.value = content; // Sets the note ID as value.
            note.className = "note"; // Sets a CSS class.
            note.style.backgroundColor = noteColor; // Sets the note's background color using the last selected note color.
            noteContainer.appendChild(note); // Appends it to the note container element as its child.
        }
    }

    loadNotes();

    function addNewNote() {
        const id = noteIdCounter;
        const content = `Note ${id}`;

        const note = document.createElement("textarea");
        note.setAttribute("data-note-id", id.toString()); // Stores the note ID to its data attribute.
        note.value = content; // Sets the note ID as value.
        note.className = "note"; // Sets a CSS class.
        note.style.backgroundColor = noteColor; // Sets the note's background color using the last selected note color.
        noteContainer.appendChild(note); // Appends it to the note container element as its child.

        console.log(note);

        let notes = JSON.parse(localStorage.getItem("notes")) || {}; //create the notes object and check to see if any notes are already in the object
        notes[id] = content; //adds new note to notes object
        localStorage.setItem("notes", JSON.stringify(notes));  //saves updated object with new note to localStorage


        noteIdCounter++; // Increments the counter since the ID is used for this note.

        // 4 		// TODO: Add new note to the saved notes in the local storage.
    }

    colorForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents the default event.

        const newColor = colorInput.value.trim();  // Removes whitespaces.

        const notes = document.querySelectorAll(".note");
        for (const note of notes) {
            note.style.backgroundColor = newColor;
        }

        colorInput.value = ""; // Clears the color input field after from submission.

        noteColor = newColor; // Updates the stored note color with the new selection.

        // 5		// TODO: Update the note color in the local storage.

        localStorage.setItem("noteColor", noteColor);
    });

    newNoteButton.addEventListener("click", function () {
        addNewNote();
    });

    document.addEventListener("dblclick", function (event) {
        if (event.target.classList.contains("note")) {
            event.target.remove(); // Removes the clicked note.

            localStorage.removeItem("note");

            // 6			// TODO: Delete the note from the saved notes in the local storage. 
        }
    });

    noteContainer.addEventListener("blur", function (event) {
        if (event.target.classList.contains("note")) {
            // 7			// TODO: Update the note from the saved notes in the local storage. 
        }
    }, true);

    window.addEventListener("keydown", function (event) {
        /* Ignores key presses made for color and note content inputs. */
        if (event.target.id === "color-input" || event.target.type === "textarea") {
            return;
        }

        /* Adds a new note when the "n" key is pressed. */
        if (event.key === "n" || event.key === "N") {
            addNewNote(); // Adds a new note.
        }
    });
});
