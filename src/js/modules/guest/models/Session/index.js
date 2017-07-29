import ValidateMessage from '../../../_common/models/validateMessage';
import ValidateChecker from '../../../_common/models/validateChecker';

const validateMessage = new ValidateMessage();
const validateChecker = new ValidateChecker();

export default Backbone.Model.extend({

    url: '/api/session',

    defaults: {
        login: null,
        password: null
    },

    validation: {
        login: [{
            required: true,
            msg: validateMessage.Required
        }, {
            maxLength: 50,
            msg: validateMessage.maxLength_50
        }, {
            pattern: validateChecker.RomanCyrillicNumber,
            msg: validateMessage.RomanCyrillicNumber
        }],

        password: [{
            required: true,
            msg: validateMessage.Required
        }, {
            minLength: 8,
            msg: validateMessage.minLength_8
        },{
            maxLength: 50,
            msg: validateMessage.maxLength_50
        }]
    }
    
});
