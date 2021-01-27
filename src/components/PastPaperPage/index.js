import React, { useState, useEffect } from 'react'
import './PastPaperPage.css'
import { RiArrowRightSFill } from 'react-icons/ri'
import db from '../../firebase.js'

function PastPaperPage() {

    const [pastPapers, setPastPapers] = useState([]);
    const [pastPaperRecord, setPastPaperRecord] = useState([]);

    const [clickedId, setClickedId] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isComponentModalOpen, setIsComponentModalOpen] = useState(false);

    const [pastPaperName, setPastPaperName] = useState('');

    const [component, setComponent] = useState('');
    const [year, setYear] = useState('');
    const [session, setSession] = useState('');
    const [variant, setVariant] = useState('');
    const [time, setTime] = useState('');
    const [marks, setMarks] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        db.collection('past_paper').onSnapshot(snapshot => {
            setPastPapers(snapshot.docs.map(doc=>({id: doc.id, data: doc.data()})))
        })
    }, [])

    useEffect(() => {
        db.collection('past_paper_record').onSnapshot(snapshot => {
            setPastPaperRecord(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    const setModal = (e) => {
        e.preventDefault()
        setIsModalOpen(!isModalOpen);
    }

    const setComponentModal = (e) => {
        e.preventDefault()
        setIsComponentModalOpen(!isComponentModalOpen)
    }

    const addNewPastPaper = (e) => {
        e.preventDefault();
        db.collection('past_paper').add({
            user_id: "1",
            name: pastPaperName
        })
        setPastPaperName('');
        setIsModalOpen(false);
    }

    const clearComponentModal = () => {
        setComponent('')
        setYear('')
        setSession('')
        setVariant('')
        setTime('')
        setMarks('')
        setNote('')
    }

    const addNewPastPaperRecord = (e) => {
        e.preventDefault()
        db.collection('past_paper_record').add({
            component: component,
            year: year,
            session: session,
            variant: variant,
            time: time,
            marks: marks,
            note: note
        })

        clearComponentModal()
        setIsComponentModalOpen(false)

    }

    const setPaperRecordSelection = (id) => {
        clickedId == id ? setClickedId(null) : setClickedId(id)
    }

    return (
        <div className="PastPaperPage">

            <div className="pastPaper__left_panel">
                <input className="pastPaper__searchbar" placeholder="Search" />
                <button onClick={setModal} className="btn primary">+ Add</button>

                <div className="pastPaper__list">
                    {pastPapers.map((pastPaper) => (
                        <details id={pastPaper.id} className="pastPaper__item">
                            <summary>
                                <p>{pastPaper.data.name}</p>
                                <div className="pastPaper__dropdown_btn"><RiArrowRightSFill size={24}/></div>
                            </summary>
                            <div className="pastPaper__components">
                                <div className="pastPaper__component active">
                                    <p>Paper 1</p>
                                </div>
                                <div className="pastPaper__component">
                                    <p>Paper 2</p>
                                </div>
                                <div className="pastPaper__component">
                                    <p>Paper 3</p>
                                </div>
                            </div>
                        </details>
                    ))}
                    
                </div>
            </div>

            <div className={isModalOpen ? "pastPaper__modal active" : "pastPaper__modal"}>
                <div className="pastPaper__modal_form">
                    <form>
                        <label>Enter a name</label>
                        <input placeholder="Name" onChange={(e) => setPastPaperName(e.target.value)} />
                        <div className="pastPaper__modal_actions">
                            <button onClick={addNewPastPaper} className="btn primary">Add</button>
                            <button onClick={setModal} className="btn danger">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={isComponentModalOpen ? "pastPaper__modal active" : "pastPaper__modal"}>
                <div className="pastPaper__component_modal_form">
                    <form>
                        <div>
                            <label>Component</label>
                            <input placeholder="Component" value={component} onChange={(e) => setComponent(e.target.value)} />
                        </div>
                        
                        <div>
                            <label>Year</label>
                            <input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
                        </div>

                        <div>
                            <label>Session</label>
                            <input placeholder="Session" value={session} onChange={(e) => setSession(e.target.value)} />
                        </div>
                        
                        <div>
                            <label>Variant</label>
                            <input placeholder="Variant" value={variant} onChange={(e) => setVariant(e.target.value)} />
                        </div>

                        <div>
                            <label>Time</label>
                            <input placeholder="Time Taken" value={time} onChange={(e) => setTime(e.target.value)} />
                        </div>
                    
                        <div>
                            <label>Marks</label>
                            <input placeholder="Marks obtained" value={marks} onChange={(e) => setMarks(e.target.value)} />
                        </div>

                        <div>
                            <label>Note</label>
                            <textarea rows="5" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                        </div>
                        
                        <div className="pastPaper__modal_actions">
                            <button onClick={addNewPastPaperRecord} className="btn-2x primary">Add</button>
                            <button onClick={setComponentModal} className="btn-2x danger">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="pastPaper__right_panel">
                <div className="pastPaper__right_panel_header">
                    <p>Paper 2</p>
                    <div className="pastPaper__right_panel_actions">
                        <button className="btn-2x save">Save</button>
                        <button onClick={setComponentModal} className="btn-2x danger">Cancel</button>
                        <button onClick={setComponentModal} className="btn-2x primary">+ New</button>
                    </div>
                </div>

                <hr />

                <table>
                    <tr>
                        <th>Year</th>
                        <th>Session</th>
                        <th>Variant</th>
                        <th>Time</th>
                        <th>Marks</th>
                    </tr>
                    {pastPaperRecord.map((ppr) => (
                        <>
                        <tr onClick={() => setPaperRecordSelection(ppr.id)} id={ppr.id}>
                            <td>{ppr.data.year}</td>
                            <td>{ppr.data.session}</td>
                            <td>{ppr.data.variant}</td>
                            <td>{ppr.data.time}</td>
                            <td>{ppr.data.marks}</td>
                        </tr>
                        <tr className="pastPaper__details" style={clickedId !== ppr.id ? {display: "none"} : {}}>
                            <td colSpan="5">
                                <div className="pastPaper__details_content">
                                    <div className="pastPaper__details_row">
                                        <label>Year</label>
                                        <input value={ppr.data.year} />
                                        <label>Session</label>
                                        <input value={ppr.data.session} />
                                        <label>Variant</label>
                                        <input value={ppr.data.variant} />
                                    </div>
                                    <div className="pastPaper__details_row">
                                        <label>Time</label>
                                        <input value={ppr.data.time} />
                                        <label>Marks</label>
                                        <input value={ppr.data.marks} />
                                    </div>
                                    <div className="pastPaper__details_notes">
                                        <label>Note</label>
                                        <textarea rows="10" cols="50" value={ppr.data.note}></textarea>
                                    </div>
                                </div>
                                
                            </td>
                        </tr>
                        </>
                    ))}
                    
                </table>
            </div>
        </div>
    )
}

export default PastPaperPage
