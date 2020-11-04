import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote } from '../../actions/notes'

export const NotesAppBar = () => {

    const noteDate = moment(Date.now());
    const { active } = useSelector(state => state.notes);
    const dispatch = useDispatch();

    const handleSave = () => {
        //console.log(active);
        dispatch(startSaveNote(active));
    }
    return (
        <div className="notes__appbar">
            <span>{noteDate.format('dddd')} {noteDate.format('Do')} {noteDate.format('YYYY')}</span>
            <div>
                <button className="btn"> picture</button>
            </div>

            <div>
                <button className="btn"

                    onClick={handleSave}

                >

                    Save</button>
            </div>
        </div>
    )
}
