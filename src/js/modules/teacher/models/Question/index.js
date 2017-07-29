import BaseModel from '../../../_common/models/baseModel';
import ValidateMessage from '../../../_common/models/validateMessage';

const validateMessage = new ValidateMessage();

export default BaseModel.extend({

    defaults: {
        question: null,
        number: null,
        answers: [],
        correct: null
    },

    toJSON: function() {
        return _.clone(this.attributes);
    },

    validation: {
        question: [{
            required: true,
            msg: validateMessage.Required
        }, {
            maxLength: 100,
            msg: validateMessage.maxLength_100
        }]
    }

});
