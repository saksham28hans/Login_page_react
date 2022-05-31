const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoleSchema = new Schema({
    name: {
        type: String
    }
});

const Role = mongoose.model('role',RoleSchema);

module.exports = Role;
