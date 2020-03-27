import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    function handle(e){
        e.preventDefault();
        const data = { id };

        api.post('session', data)
            .then(response => {
                localStorage.setItem('ongId', id);
                localStorage.setItem('ongName', response.data.name);

                history.push('profile');
            })
            .catch(error => {
                alert(`Erro ao fazer login: ${error}`); 
            });
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the hero"/>

                <form onSubmit = { handle }>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Sua id"
                        value = { id }
                        onChange = { e => setId(e.target.value) }
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={ heroesImg } alt="Heroes" />
        </div>
    );
}