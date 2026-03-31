import React from "react";
import { useNavigate } from "react-router";
import "../Dasboard.css"

export default function Dashboard() 
{
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('auth/logout');

            localStorage.removeItem('token');

            navigate('/');
        } catch (error) {
            console.error("gagal Logout", error);

            localStorage.removeItem('token');
            navigate('/');
        }
    }
   return (
        <div className="dashboard-container">
            {/* NAVBAR SESUAI PDF LKS */}
            <nav className="navbar">
                <div className="navbar-brand">🚗 AutoCredit</div>
                <div className="navbar-menu">
                    <span className="user-name">Arya Developer</span>
                    <button className="btn-logout" onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            <main className="dashboard-content">
                <h1 className="page-title">Dashboard</h1>

                {/* SECTION 1: DATA VALIDATION */}
                <section className="dashboard-section">
                    <h2>My Data Validation</h2>
                    <div className="card">
                        {/* Kalau belum ngajuin, tampilkan ini: */}
                        <div className="validation-empty">
                            <p>Data Validation</p>
                            <button className="btn-primary" onClick={() => navigate('/request-validation')}>
                                + Request validation
                            </button>
                        </div>

                        {/* Kalau SUDAH ngajuin, nanti kita tampilkan tabel info di sini */}
                    </div>
                </section>

                {/* SECTION 2: INSTALMENT CARS */}
                <section className="dashboard-section">
                    <h2>My Installment Cars</h2>
                    
                    {/* Pesan kuning kalau belum di ACC */}
                    <div className="alert-warning">
                        Your validation must be approved by validator to Installment Cars.
                    </div>

                    {/* Nanti kalau udah di-ACC, muncul tombol + Add Installment Cars di sini */}
                </section>
            </main>
        </div>
    );
}