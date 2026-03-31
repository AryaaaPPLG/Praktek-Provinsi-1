import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import '../style.css';

export default function Cars()
{
    const navigate = useNavigate();

    const { data, loading, error } = useFetch('/instalment');

    const carList = data?.cars || [];

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
                <div className="navbar-menu">
                    <span className="user-name" style={{marginRight: '15px'}}>Arya Developer</span>
                    <button className="btn-logout" onClick={handleLogout} style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container">
                <button 
                    onClick={() => navigate('/dashboard')} 
                    style={{ marginBottom: '20px', background: 'none', border: 'none', color: '#1b3b5c', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    &larr; Back to Dashboard
                </button>

                <h1 className="page-title">Cars</h1>
                <div className="section-title">List of Cars</div>

                {/* HANDLING LOADING & ERROR */}
                {loading && <p>Manasin mesin bentar cuy, narik data dari garasi...</p>}
                {error && <p style={{ color: 'red' }}>Waduh meledak: {error}</p>}

                {/* LOOPING DATA MOBIL */}
                {!loading && carList.length === 0 ? (
                    <p>Belum ada mobil di database lu bro.</p>
                ) : (
                    carList.map((car) => (
                        <div key={car.id} className="box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fafafa', marginBottom: '15px' }}>
                            
                            {/* Kiri: Info Mobil */}
                            <div style={{ flex: '2' }}>
                                <strong style={{ fontSize: '18px', color: '#333' }}>{car.brand} {car.car}</strong>
                                <p style={{ color: '#888', margin: '5px 0 0', fontSize: '14px' }}>
                                    {car.description}
                                </p>
                                <p style={{ color: '#28a745', margin: '5px 0 0', fontWeight: 'bold' }}>
                                    Rp {Number(car.price).toLocaleString('id-ID')}
                                </p>
                            </div>
                            
                            {/* Tengah: Bulan Cicilan */}
                            <div style={{ flex: '2' }}>
                                <strong style={{ fontSize: '14px', color: '#333' }}>Available Month</strong>
                                <p style={{ color: '#888', margin: '5px 0 0', fontSize: '14px' }}>
                                    {/* Looping array available_month di dalam array cars! */}
                                    {car.available_month?.map(m => `${m.month} Months`).join(', ')}
                                </p>
                            </div>
                            
                            {/* Kanan: Tombol Action */}
                            <div style={{ flex: '1', textAlign: 'right' }}>
                                {/* Tombol merah mengarah ke halaman Detail / Apply Instalment */}
                                <button 
                                    type="button" 
                                    className="btn-red"
                                    onClick={() => navigate(`/cars/${car.id}`)}
                                >
                                    Detail
                                </button>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
}