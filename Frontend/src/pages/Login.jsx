import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api";
import "../Login.css"

export default function Login() {
    const [idCardNumber, setIdCardNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const response = await api.post('auth/login', {
                id_card_number: idCardNumber,
                password: password
            });

            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            const messageError = error.response?.data?.message || 'Waduh Login Gagal Cuy';
    alert(messageError);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-wrapper">
            <div className="login-card">
                
                <div className="login-header">
                    <h2>🚗 AutoCredit</h2>
                    <p>Portal Pengajuan Kredit Mobil</p>
                </div>
                
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="idCard">ID Card Number</label>
                        <input 
                            type="text" 
                            id="idCard" 
                            value={idCardNumber}
                            placeholder="Masukkan 8 digit ID Card" 
                            onChange={(e) => setIdCardNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            placeholder="Masukkan password Anda" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Pakai type="button" sementara biar gak ke-refresh pas diklik */}
                    <button type="submit" disabled={loading} className="btn-login">
                        {loading ? "Lagi Loading" : "Gas Login Cuy!"}
                    </button>
                </form>

            </div>
        </div>
    );
}