import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange,reset] = useForm(note);

    const { title, body,id} = formValues;
    const  dispatch= useDispatch();

    const handleDelete=()=>{
        dispatch(startDeleting(id))
    }
    const activeId= useRef(note.id);
    useEffect(() => {

        if(note.id !== activeId.current){

            reset(note);
            activeId.current=note.id
        }
       
    }, [note,reset]);


    useEffect(() => {
      dispatch(activeNote(formValues.id,{...formValues}))
    }, [formValues,dispatch]);
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">

                <  input type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea placeholder="What happen today"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}

                >

                </textarea>

               


            </div>

            <button className="btn btn-danger"
            onClick={handleDelete}
            >

                delete

            </button>

        </div>
    )
}
