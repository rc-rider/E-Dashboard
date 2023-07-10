const mongoose = require('mongoose');

const peoplesSchema = new mongoose.Schema({
    "name":String,
    "email":String,
    "password":String
});
module.exports = mongoose.model("people",peoplesSchema,"people");
