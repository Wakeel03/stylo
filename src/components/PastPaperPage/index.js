import React, { useState, useEffect } from 'react'
import './PastPaperPage.css'
import { RiArrowRightSFill } from 'react-icons/ri'
import db from '../../firebase.js'

function PastPaperPage() {

    const [searchbarPaper, setSearchbarPaper] = useState('');

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

    const [addComponentSet, setAddComponentSet] = useState('')
    const  [newComponent, setNewComponent] = useState('')
    const [componentList, setComponentList] = useState([])
    const [selectedComponent, setSelectedComponent] = useState(null);

    const [editYear, setEditYear] = useState('');
    const [editSession, setEditSession] = useState('');
    const [editVariant, setEditVariant] = useState('');
    const [editTime, setEditTime] = useState('');
    const [editMarks, setEditMarks] = useState('');
    const [editNote, setEditNote] = useState('');
    const [isEdited, setIsEdited] = useState(false)
    const [editedPaper, setEditedPaper] = useState('');

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

    useEffect(() => {
        db.collection('components').onSnapshot(snapshot => {
            setComponentList(snapshot.docs.map(doc => ({
                id: doc.id,
                past_paper_id: doc.data().past_paper_id,
                past_paper_name: doc.data().past_paper_name,
                name: doc.data().name 
            })))
        })
    }, [])

    const editPastPaper = (id) => {
        db.collection('past_paper_record').doc(id).update({
            year: editYear,
            session: editSession,
            variant: editVariant,
            time: editTime,
            marks: editMarks,
            note: editNote,
        })
    }

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
            component: selectedComponent.id,
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

    const setPaperRecordSelection = (ppr) => {
        if (isEdited){
                setIsEdited(false)
                editPastPaper(editedPaper)
                setEditedPaper('')
        }

        if (clickedId === ppr.id){
            setClickedId(null)
        }else{

            setClickedId(ppr.id)

            setEditYear(ppr.data.year)
            setEditSession(ppr.data.session)
            setEditVariant(ppr.data.variant)
            setEditTime(ppr.data.time)
            setEditMarks(ppr.data.marks)
            setEditNote(ppr.data.note)
        }
    }

    const addNewComponent = (e, past_paper) => {
        e.preventDefault()

        db.collection('components').add({
            past_paper_id: past_paper.id,
            past_paper_name: past_paper.data.name,
            name: newComponent
        })

        setNewComponent('')
        setAddComponentSet('')
    }

    const selectComponent = (comp) => {
        setSelectedComponent(comp)
        db.collection('past_paper_record').where("component", "==", comp.id).onSnapshot(snapshot => {
            setPastPaperRecord(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }

    return (
        <div className="PastPaperPage">
            
            <div className="pastPaper__left_panel">
                <input className="pastPaper__searchbar" placeholder="Search" onChange={(e) => {e.preventDefault(); setSearchbarPaper(e.target.value)}}/>

                <button onClick={setModal} className="btn primary">+ Add</button>
                <div className="pastPaper__list">
                    {pastPapers.filter((val) => {
                        if (searchbarPaper == ""){
                            return val
                        }else if (val.data.name.toLowerCase().includes(searchbarPaper.toLowerCase())){
                            return val
                        }
                    }).map((pastPaper) => (
                        <details id={pastPaper.id} className="pastPaper__item">
                            <summary>
                                <p>{pastPaper.data.name}</p>
                                <div className="pastPaper__dropdown_btn"><RiArrowRightSFill size={24}/></div>
                            </summary>
                            
                            <div className="pastPaper__components">
                                {componentList.map((comp) => {
                                    if (comp.past_paper_id === pastPaper.id) return (
                                        <div id={comp.id} onClick={() => selectComponent(comp)} className={selectedComponent?.id === comp.id ? "pastPaper__component active" : "pastPaper__component"}>
                                                <p>{comp.name}</p>
                                        </div>
                                    )
                                }                                    
                                )}
                                                               
                            </div>
                            {addComponentSet === pastPaper.id && (
                                <form onSubmit={(e) => addNewComponent(e, pastPaper)} className="pastPaper__component">
                                    <input onChange={(e) => setNewComponent(e.target.value)}/>
                                </form>
                                
                            )}
                            <div className="pastPaper__component_add" onClick={() => setAddComponentSet(pastPaper.id)}>+</div>
                        </details>
                    ))}
                    
                </div>
            </div>

            <div className={isModalOpen ? "pastPaper__modal active" : "pastPaper__modal"}>
                <div className="pastPaper__modal_form">
                    <form>
                        <>
                        <label>Enter a name</label>
                        <input placeholder="Name" onChange={(e) => setPastPaperName(e.target.value)} />
                        </>
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
                            <input placeholder="Component" value={selectedComponent?.name} disabled />
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
                    {selectComponent !== null ? (<p>{selectedComponent?.past_paper_name + " - " + selectedComponent?.name}</p>) : ""}
                    
                    <div className="pastPaper__right_panel_actions">
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
                        <tr onClick={() => setPaperRecordSelection(ppr)} id={ppr.id}>
                            <td>{ppr.data.year}</td>
                            <td>{ppr.data.session}</td>
                            <td>{ppr.data.variant}</td>
                            <td>{ppr.data.time}</td>
                            <td>{ppr.data.marks}</td>
                        </tr>
                        <tr id={ppr.id} className="pastPaper__details" style={clickedId !== ppr.id ? {display: "none"} : {}}>
                            <td colSpan="5">
                                <div className="pastPaper__details_content">
                                    <div className="pastPaper__details_row">
                                        <label>Year</label>
                                        <input value={editYear} onChange={(e) => {setEditYear(e.target.value); setIsEdited(true); setEditedPaper(ppr.id)}}/>
                                        <label>Session</label>
                                        <input value={editSession} onChange={(e) => {setEditSession(e.target.value); setIsEdited(true); setEditedPaper(ppr.id)}}/>
                                        <label>Variant</label>
                                        <input value={editVariant} onChange={(e) => {setEditVariant(e.target.value); setIsEdited(true); setEditedPaper(ppr.id)}}/>
                                    </div>
                                    <div className="pastPaper__details_row">
                                        <label>Time</label>
                                        <input value={editTime} onChange={(e) => {setEditTime(e.target.value); setIsEdited(true); setEditedPaper(ppr.id)}}/>
                                        <label>Marks</label>
                                        <input value={editMarks} onChange={(e) => {setEditMarks(e.target.value); setIsEdited(true); setEditedPaper(ppr.id)}}/>
                                    </div>
                                    <div className="pastPaper__details_notes">
                                        <label>Note</label>
                                        <textarea rows="10" cols="50" value={editNote} onChange={(e) => {setEditNote(e.target.value); setIsEdited(true); setEditedPaper(ppr.id)}}></textarea>
                                    </div>
                                </div>
                                
                            </td>
                        </tr>
                        <tr></tr>
                        </>
                    ))}
                    
                </table>
            </div>
        </div>
    )
}

export default PastPaperPage
