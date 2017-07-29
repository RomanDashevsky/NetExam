import BaseModel from '../../../_common/models/baseModel';
import ValidateMessage from '../../../_common/models/validateMessage';

const validateMessage = new ValidateMessage();

export default BaseModel.extend({

    url: '/api/exams',

    defaults: {
        name: null,
        semester: null,
        ready: null,
        questionsCountPerExam: null,
        timeInMinutes: null
    },

    validation: {
        name: [{
            required: true,
            msg: validateMessage.Required
        }, {
            maxLength: 50,
            msg: validateMessage.maxLength_50
        }],

        semester: [{
            required: true,
            msg: validateMessage.Required
        }, {
            min: 1,
            msg: validateMessage.min_1
        }, {
            max: 12,
            msg: validateMessage.max_12
        }]
    }
    
});
