import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api";
import "../App.css";

export default function Validation(){
    // isi form nya nanti
    const [workStatus, setWorkStatus] = useState('');
    const [job, setJob] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [income, setIncome] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // handle request validation
    const handleRequestValidation = async (e) => {
        e.preventDefault();
        setLoading(true);

        // ngepost data / kirim data ke /validation
        try {
            const response = await api.post('/validation', {
                // isi data yang dikirim
                work_status: workStatus,
                job: job,
                job_description: jobDescription,
                income: income,
                reason_accepted: reason,
            });

            alert('Marvelous Request Validation Has Sent!');
            navigate('/dashboard');
            // penanganan apabila terjadi error
        } catch (error) {
            // pesan error nya + alert
            const errorMessage = error.response?.data?.message || 'error while sending the validation';
            alert(errorMessage);
        } finally {
            // pelepasan loading 
            setLoading(true);
        }
    }

    return (
        <div className="container">
            <h1 className="page-title">Request Data Validation</h1>

            <form onSubmit={handleRequestValidation}>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <label>Are You working?</label>
                    <select className="form-control" style={{ width: 'auto', marginBottom: '0'}}
                    value={workStatus}
                    onChange={(e) => setWorkStatus(e.target.value)}>
                        <option value="yes">Yes, I Have</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div className="box" style={{ backgroundColor: '#fafafa'}}>
                    <input type="text" placeholder="Your Job" className="form-control" value={job} onChange={(e) => setJob(e.target.value)} required/>
                    <textarea placeholder="Describe what you do in your job" className="form-control" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}></textarea>
                    <input type="number" placeholder="Income (Rp)" className="form-control" style={{ marginBottom: '0'}} value={income} onChange={(e) => setIncome(e.target.value)} required/>
                    
                    <div className="section-title" style={{ marginTop: '20px'}}>Reason Accepted</div>
                    <textarea placeholder="Explain Why you should be accepted" className="form-control" value={reason} onChange={(e) => setReason(e.target.value)}></textarea>

                    <button type="submit" className="btn-blue" style={{ marginTop: '15px'}} disabled={loading}>
                        {loading ? 'Mengirim Data...' : 'Send Request'}
                    </button>
                </div> 
            </form>
        </div>
    );
}
