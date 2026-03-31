import React from "react";
import { useNavigate } from "react-router";
import useFetch from '../hooks/useFetch';
import "../Dasboard.css" // Hati-hati typo nama file CSS-nya!

export default function Dashboard() {
    const navigate = useNavigate();

    const { data: valData, loading: valLoading } = useFetch('/validation');

    const validation = valData?.validation || null;
    const appLoading = false;
    const instalment = []; // Typo dikit: di kodingan lu 'installment', gw samain jadi 'instalment'

    // PERBAIKAN 1: Fungsi Logout dirapihin
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (

        <div className="dashboard-container" >
            {/* NAVBAR SESUAI PDF LKS */}
            <nav className="navbar">
                <div className="navbar-brand">🚗 AutoCredit</div>
                <div className="navbar-menu">
                    <span className="user-name" style={{marginRight: '15px'}}>Arya Developer</span>
                    <button className="btn-logout" onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            <main className="dashboard-content" style={{padding: '20px', maxWidth: '900px', margin: '0 auto'}}>
                <h1 className="page-title">Dashboard</h1>

                {/* SECTION 1: DATA VALIDATION */}
                <section className="dashboard-section">
                    <div className="section-title">My Data Validation</div>
                    
                    {valLoading ? (
                        <p>Wait Checking Data...</p>
                    ) : !validation ? (
                        
                        /* Kalau belum ngajuin */
                        <div className="box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', color: '#333'}}>Data Validation</span>
                            <button onClick={() => navigate('/validation')} className="btn-blue">
                                + Request Validation
                            </button>
                        </div>
                        
                    ) : (
                        
                        /* PERBAIKAN 2: Kurung tutup div yang rapi untuk bagian kalau SUDAH ngajuin */
                        <div className="box" style={{ borderLeft: validation.status === 'accepted' ? '5px solid #28a745' : '5px solid #f39c12' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <strong style={{ fontSize: '18px', color: '#333' }}>Status Your Validation:</strong>
                                <span style={{ 
                                    fontWeight: 'bold',
                                    color: validation.status === 'accepted' ? '#28a745' : '#f39c12',
                                    backgroundColor: validation.status === 'accepted' ? '#e8f8f5' : '#fef5e7',
                                    padding: '5px 10px', borderRadius: '4px'
                                }}>
                                    {validation.status.toUpperCase()}
                                </span>
                            </div>
                            <p style={{ margin: '5px 0', color: '#666' }}><strong>Job:</strong> {validation.job}</p>
                            
                            {validation.validator_notes && (
                                <p style={{ margin: '10px 0 0 0', color: '#d35400', backgroundColor: '#fdf2e9', padding: '10px', borderRadius: '4px' }}>
                                    <strong>Validator Notes:</strong> {validation.validator_notes}
                                </p>
                            )}
                        </div>
                    )}

                    {/* SECTION 2: MY INSTALMENT CARS */}
                    <div className="section-title" style={{marginTop: '40px'}}>My Instalment Cars</div>

                    {validation?.status === 'accepted' ? (
                        <div>
                            <button onClick={() => navigate('/cars')} className="btn-blue" style={{ marginBottom: '20px'}}>
                                + Add Instalment Cars
                            </button>

                            {appLoading ? <p>Searching Lists...</p> : null}

                            {instalment && instalment.length > 0 ? (
                                instalment.map((item) => (
                                    <div key={item.id} className="box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fafafa' }}>
                                        <div>
                                            <strong style={{ fontSize: '18px', color: '#333' }}>{item.brand} {item.car}</strong>
                                            <p style={{ color: '#888', margin: '5px 0 0', fontSize: '14px' }}>Rp {item.price}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ backgroundColor: '#1b3b5c', color: 'white', padding: '5px 10px', borderRadius: '4px', fontSize: '12px' }}>
                                                {item.applications[0].month} Months
                                            </span>
                                            <p style={{ color: '#28a745', fontWeight: 'bold', margin: '5px 0 0', fontSize: '14px' }}>
                                                Status: {item.applications[0].apply_status.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: '#888' }}>Nothing Happens Here</p>
                            )}
                        </div>
                    ) : (
                        <div className="alert-warning">
                            Your validation must be approved by validator to Installment Cars.
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}