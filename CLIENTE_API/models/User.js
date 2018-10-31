exports = module.exports = function (app, mongoose) {

    var userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        lastName: String,
        email: { type: String, lowercase: true, required: true, unique: true },
        password: { type: String, required: true },
        devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device'}]
    });

    module.exports = mongoose.model('User', userSchema);
};