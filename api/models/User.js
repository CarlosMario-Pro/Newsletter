const mongoose = require('mongoose'); 


const usuarioSchema = new mongoose.Schema({ 
    name: { 
        type: String, required: true 
    }, 
    phone: { 
        type: Number, required: true 
    }, 
    email: { 
        type: String, required: true 
    } 
}); 


module.exports = mongoose.model('User', usuarioSchema);