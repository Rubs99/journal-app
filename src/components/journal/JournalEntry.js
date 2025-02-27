import React from 'react'
import moment from 'moment';
import { activeNote } from '../../actions/notes';
import { useDispatch } from 'react-redux';
export const JournalEntry = ({ id, date, title, body }) => {

    const noteDate = moment(date);

    const dispatch = useDispatch();
    const handleEntryClick=()=>{

        dispatch(
            activeNote(id,{
                date,title,body
            })
        );
    }
   
    return (


        <div className="journal__entry pointer"
        onClick={handleEntryClick}
        >


            <div className="journal__entry-body">

                <p className="journal__entry-title">

                    {title}
                </p>

                <p className="journal__entry-content">
                    {body}


                </p>

            </div>

            <div className="journal__entry-date-box">

                <span>{noteDate.format('dddd')},</span>
                <h4>{noteDate.format('D')}</h4>
            </div>
        </div>


    )
}
