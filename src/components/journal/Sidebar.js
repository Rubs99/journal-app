import React from 'react'
import { JournalEntries } from './JournalEntries';
import { useDispatch, useSelector } from 'react-redux';
import { startLogOut } from '../../actions/auth';
import { startNewNotes } from '../../actions/notes';

export const Sidebar = () => {

    const {name} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const handleLogOut = () => {

        dispatch(startLogOut());
    }

    

    const handleAddNew=()=>{
        dispatch(startNewNotes());
    }
    return (
        <aside className="jorunal__sidebar">

            <div className="journal__sidebar-navbar">



                <h3 className="mt-5">

                    <i className="far fa-moon"></i>

                    <span>{name}</span><br/>
                   
                </h3>

                <button
                    onClick={handleLogOut}
                    className="btn">

                    logout

                </button>

            </div>

            <div className="journal__new-entry"
            onClick={handleAddNew}>

                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">New wntry</p>
            </div>

            <JournalEntries />
        </aside>
    )
}
