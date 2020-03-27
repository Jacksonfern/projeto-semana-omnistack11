import React, { useState, useEffect } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './style.css';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get(`incidents`, {
            headers: {
                Authorization: ongId
            }
        })
            .then(response => {
                setIncidents(response.data);
            })
            .catch(error => {
                alert(`Erro ao obter incidentes: ${error.message}`);
            });
    }, [ongId]);

    async function handleDelete(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch(err){
            alert(`Erro ao deletar incidente! ${err.message}`);
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={ logoImg } alt="Be the Hero"/>
                <span>Bem-vinda, {ongName}</span>
                <Link to="/incidents/new" className="button">
                    Cadastrar novo caso
                </Link>

                <button onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
            {
                incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDelete(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))
            }
            </ul>
        </div>
    );
}