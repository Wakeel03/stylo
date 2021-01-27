import React from 'react'
import './PastPaperPage.css'
import { RiArrowRightSFill } from 'react-icons/ri'

function PastPaperPage() {
    return (
        <div className="PastPaperPage">

            <div className="pastPaper__left_panel">
                <input className="pastPaper__searchbar" placeholder="Search" />
                <button className="btn primary">+ Add</button>

                <div className="pastPaper__list">
                    <details className="pastPaper__item">
                        <summary>
                            <p>Cambridge Maths</p>
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
                </div>
            </div>

            <div className="pastPaper__modal">
                <div className="pastPaper__modal_form">
                    <form>
                        <label>Enter a name</label>
                        <input placeholder="Name" />
                        <div className="pastPaper__modal_actions">
                            <button className="btn primary">Add</button>
                            <button className="btn danger">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="pastPaper__right_panel">
                <div className="pastPaper__right_panel_header">
                    <p>Paper 2</p>
                    <div className="pastPaper__right_panel_actions">
                        <button className="btn-2x save">Save</button>
                        <button className="btn-2x danger">Cancel</button>
                        <button className="btn-2x primary">+ New</button>
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
                    <tr>
                        <td>2020</td>
                        <td>Summer</td>
                        <td>2</td>
                        <td>1 h 25</td>
                        <td>93</td>
                    </tr>
                    <tr className="pastPaper__details">
                        <td colSpan="5">
                            <div className="pastPaper__details_content">
                                <div className="pastPaper__details_row">
                                    <label>Year</label>
                                    <input value="2020" />
                                    <label>Session</label>
                                    <input value="Summer" />
                                    <label>Variant</label>
                                    <input value="2" />
                                </div>
                                <div className="pastPaper__details_row">
                                    <label>Time</label>
                                    <input value="1 h 25" />
                                    <label>Marks</label>
                                    <input value="93" />
                                </div>
                                <div className="pastPaper__details_notes">
                                    <label>Notes</label>
                                    <textarea rows="10" cols="50"></textarea>
                                </div>
                            </div>
                            
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default PastPaperPage
