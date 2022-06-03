import React, { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
    const [form, setForm] = useState({ email: '', phoneNo: '', firstName: '', lastName: '', isPhoneNo: false, isEmail: false, selectedSupervisor: '-1' })
    const [supervisor, setSupervisor] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleInputChange = (event) => {
        clearPrompt();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setForm({
            ...form,
            [name]: value, 
        });
    }
    useEffect(() => {

        axios.get('http://localhost:3000/api/supervisors').then(res => {
            setSupervisor(res.data);
        }).catch(e => console.error(e));


    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        clearPrompt();
        axios.post('http://localhost:3000/api/submit', form).then(x => {
            setSuccess("Request Succeeded")
            console.log("Success", x.data);
            clearForm();
        }).catch(x => {
            setError(x.response.data);
            console.error("Error", x.response.data);
        })

    }
    const clearPrompt=()=>{
        setSuccess('');
        setError('');
    }
    const clearForm = () => {
        setForm({ email: '', phoneNo: '', firstName: '', lastName: '', isPhoneNo: false, isEmail: false, selectedSupervisor: '-1' });
    }
    return (

        <div className="container center">
            <form onSubmit={handleSubmit}>
                <div className="form">

                    <div className="formheader"> Notification Form</div>
                    <div className="formBody">
                        <div className="flex-container justify-content-center">
                            <div className="control">
                                <div className="lbl"> First name</div>
                                <div className="inputControl"> <input required value={form.firstName} name="firstName" onChange={handleInputChange} type="text" /> </div>
                            </div>
                            <div className="control">
                                <div className="lbl"> Last name</div>
                                <div className="inputControl"> <input  required type="text" value={form.lastName} name="lastName" onChange={handleInputChange} /> </div>
                            </div>
                        </div>

                        <p className="flex-container justify-content-left" >How would you be prefer to be notified?</p>

                        <div className="flex-container justify-content-center">
                            <div className="control">
                                <div className="lbl flex-container"> <input type="checkbox" value={form.isEmail} checked={form.isEmail} name="isEmail" onChange={handleInputChange} /> <span> Email</span></div>
                                <div className="inputControl"> <input type="email" value={form.email} name="email" onChange={handleInputChange} /> </div>
                            </div>
                            <div className="control">
                                <div className="lbl flex-container"> <input type="checkbox" value={form.isPhoneNo} checked={form.isPhoneNo} name="isPhoneNo" onChange={handleInputChange} />  <span>Phone Number</span></div>
                                <div className="inputControl"> <input type="text" value={form.phoneNo} name="phoneNo" onChange={handleInputChange} /> </div>
                            </div>
                        </div>
                        <div className="flex-container justify-content-center">
                            <div className="control">
                                <div className="lbl"> Supervisor</div>
                                <div className="inputControl">
                                    <select required value={form.selectedSupervisor} name="selectedSupervisor" onChange={handleInputChange}>
                                        <option value={-1}>Please Select</option>
                                        {supervisor.map((s) =>
                                            
                                             <option key={s} value={s}>{s}</option>
                                        )}
                                        
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div className="flex-container justify-content-center">
                            <div className="control">
                                <input className="btn" type="submit" value="SUBMIT" />
                            </div>

                        </div>
                        {error.length>0 &&
                            <div className="flex-container justify-content-center">
                            <div className="control">
                                <p style={{ color: 'red' }}>{error}</p>
                                </div>

                            </div>
                        }
                        {success.length > 0 &&
                            <div className="flex-container justify-content-center">
                            <div className="control">
                                <p style={{ color: 'green' }}>{success}</p>
                                </div>

                            </div>
                        }
                    </div>
                </div>
            </form>
        </div>
    );
}

export default App;
