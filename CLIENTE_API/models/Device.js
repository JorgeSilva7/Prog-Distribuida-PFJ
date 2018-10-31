exports = module.exports = function (app, mongoose) {

    var deviceSchema = new mongoose.Schema({
        userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        ip: {type: String, required: true},
        name: { type: String, required: true  },
    });

    module.exports = mongoose.model('Device', deviceSchema);
};