import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import api from "../Api";
import '../style.css';

export default function CarDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, loading, error } = useFetch(`/instalment/detail/${id}`);

    console.log("Data: ", data);
    const car = data?.Instalment;

    const [months, setMonths] = useState('');
    const [notes, setNotes] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);

    const handleApply = async (e) => {
        e.preventDefault();

        if(!months) {
            alert("Choose The Months of Your Instalment Cost");
            return;
        }

        setSubmitLoading(true);

        try {
            await api.post('/apply', {
                instalment_id: id,
                months: months,
                notes: notes
            });

            alert("The Apply Has Successfull Sent");
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error While Sending Apply';
            alert(errorMessage);
        } finally {
            setSubmitLoading(false);
        }

    }

      const handleLogout = () => {
            localStorage.removeItem('token');
            navigate('/');
        }
    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* NAVBAR */}
            <nav className="navbar">
                <div className="navbar-brand" style={{cursor: 'pointer'}} onClick={() => navigate('/dashboard')}>
                    🚗 AutoCredit
                </div>
                <div className="navbar-user">
                    <span className="user-name" style={{marginRight: '15px'}}>Arya Developer</span>
                    <button className="btn-logout" onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            <div className="container">
                <button 
                    onClick={() => navigate('/cars')} 
                    style={{ marginBottom: '20px', background: 'none', border: 'none', color: '#1b3b5c', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    &larr; Back to Cars List
                </button>

                <h1 className="page-title">Detail Car</h1>

                {/* HANDLING LOADING & ERROR GET DATA */}
                {loading && <p>Starting To Fetch The Engine...</p>}
                {error && <p style={{ color: 'red' }}>Wow error: {error}</p>}

                {/* KALAU DATANYA UDAH DAPET, TAMPILIN INI */}
                {car && (
                    <div className="box">
                        <div style={{ borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                            <h2 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{car.brand} {car.car}</h2>
                            <p style={{ color: '#7f8c8d', fontSize: '16px', margin: '0 0 10px 0' }}>{car.description}</p>
                            <h3 style={{ color: '#28a745', margin: '0' }}>Rp {Number(car.price).toLocaleString('id-ID')}</h3>
                        </div>

                        <div className="section-title">Form Instalment Cost</div>
                        
                        {/* FORM APPLY INSTALMENT */}
                        <form onSubmit={handleApply}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Pilih Lama Cicilan</label>
                                <select 
                                    className="form-control"
                                    value={months}
                                    style={{ color: 'black' }}
                                    onChange={(e) => setMonths(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>-- Pilih Bulan --</option>
                                    {/* Looping pilihan bulan dari database */}
                                    {car.available_month?.map((m) => (
                                        <option key={m.month} value={m.month}>
                                            {m.month} Months
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Notes (Alasan)</label>
                                <textarea 
                                    className="form-control"
                                    style={{ color: 'black'}}
                                    placeholder="Why Did You Choose This Vehicle?"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="btn-red" 
                                style={{ width: '100%', padding: '15px', fontSize: '16px' }}
                                disabled={submitLoading}
                            >
                                {submitLoading ? 'Sending Data Applyment...' : 'Apply Instalment'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}