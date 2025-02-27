import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        console.log(uid);
        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        console.log(doc.id);
        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));


    }
}

export const activeNote = (id, note) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note
    }



});

export const addNewNote = (id, note) => ({

    type: types.notesAddNew,
    payload: {
        id, ...note
    }

})


export const startLoadingNotes = (uid) => {
    return async (dispatch) => {

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({


    type: types.notesLoad,
    payload: notes



});


export const startSaveNote = (note) => {

    return async (dispatch, getState) => {

        try {

            const { uid } = getState().auth;

            const noteToFireStore = { ...note };
            delete noteToFireStore.id;

            await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFireStore);


            console.log(note.id)
            dispatch(refreshNotes(note.id, noteToFireStore));

            Swal.fire('Saved', note.title, 'success');

        } catch (err) {

            console.log(err)
        }


    }
}


export const refreshNotes = (id, note) => ({

    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }

});

export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {
         
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch( deleteNote(id) );

    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});
