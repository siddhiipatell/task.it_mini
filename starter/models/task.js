const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide Name'],
        trim: true,
        maxlength: [20, 'Name can not be more than 20 characters']
    },
    description: {
        type: String,
        required: [true, 'Must Provide Description'],
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
        default: () => {
            const currentDate = new Date();
            return currentDate.getHours() + ':' + currentDate.getMinutes();
        },
        required: [true, 'Must Provide Time'],
        trim: true
    }
});

module.exports = mongoose.model('Task', TaskSchema);
