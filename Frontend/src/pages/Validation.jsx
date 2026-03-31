import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api";
import "../style.css";

export default function Validation(){
    const [workStatus, setWorkStatus] = useState('');
    const [job, setJob] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [income, setIncome] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRequestValidation = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/validation', {
                work_status: workStatus,
                job: job,
                job_description: jobDescription,
                income: income,
                reason: reason,
            });

            alert('Marvelous Request Validation Has Sent!');
            navigate('/dashboard');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'error while sending the validation';
            alert(errorMessage);
        } finally {
            setLoading(true);
        }
    }
}
