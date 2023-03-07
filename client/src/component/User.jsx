import React, { useState } from 'react';
import axios from "axios";


function validate (input) {
    let errors = {};
    if(!input.name){
        errors.name = "El nombre es requerido.";
    } else if(/[.!@#$%^&*()_+-=]/.test(input.name)){
        errors.name = "El nombre no puede tener números o caracteres especiales.";
    }
    if(!input.email) {
        errors.email = "El email  es requerido.";
    } else if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input.email)) {
        errors.name = "El email es requerido.";
    }
    if(!input.phone) {
        errors.phone = "El telefono es requerido.";
    } else if (!/^\d{10,15}$/.test(input.phone)) {
        errors.phone = "El número telefónico no es válido.";
    }
    return errors;
};


export default function ContactUs () {
    const [ errors, setErrors ] = useState({});

    const [ input, setInput ] = useState({
        name: '',
        email: '',
        phone: ''
    });


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    };


    async function handleSubmit(e) {
        e.preventDefault();
        const response = await axios.post("http://localhost:3001/user", input);
        console.log(response);
        setInput({
            name: '',
            email: '',
            phone: ''
        });
    };


    return (
        <div>
            <section>
                <div className='container-ContactUs'>
                    <h1>Suscribete a nuestras Newsletters</h1>
                    <div className='row-ContactUs'>
                        <div className='address-ContactUs'>
                            <div className='contact-widget'>
                            </div>
                        </div>

                        <div className="form-ContactUs">
                            <div className="contact-form-ContactUs">
                                <form className='form-mail' onSubmit={(e) => handleSubmit(e)}>
                                    <input type="text"  name='name' value={ input.name } placeholder='Name' onChange={(e) => handleChange(e)} />
                                    {errors.name && <p className="danger">{ errors.name }</p>}

                                    <input type="email" name='email' value={ input.email } placeholder='Email' onChange={(e) => handleChange(e)} />
                                    {errors.email && <p className="danger">{ errors.email }</p>}

                                    <input type="text" name='phone' value={ input.phone } placeholder='Phone' onChange={(e) => handleChange(e)} />
                                    {errors.phone && <p className="danger">{ errors.phone }</p>}

                                    {
                                        !errors.name && input.name.length > 0 &&
                                        !errors.email && input.email.length > 0 &&
                                        !errors.phone && input.phone.length > 0 ?
                                        <button className="site-btn" type="submit">SEND MESSAGE</button> : <button className="site-btnDesaprobated" type="submit" disabled>SEND MESSAGE</button>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};