import ValidateMessage from '../../../../_common/models/validateMessage';
import ValidateChecker from '../../../../_common/models/validateChecker';

const validateMessage = new ValidateMessage();
const validateChecker = new ValidateChecker();

export default Backbone.Model.extend({

    url: '/api/student',

    defaults: {
        firstName: null,
        lastName: null,
        patronymic: null,
        login: null,
        password: null,
        semester: null,
        group: null
    },

    validation: {

        firstName: [{
            required: true,
            msg: validateMessage.Required
        }, {
            maxLength: 50,
            msg: validateMessage.maxLength_50
        }, {
            pattern: validateChecker.CyrillicSpaceDash,
            msg: validateMessage.CyrillicSpaceDash
        }],

        lastName: [{
            required: true,
            msg: validateMessage.Required
        }, {
            maxLength: 50,
            msg: validateMessage.maxLength_50
        }, {
            pattern: validateChecker.CyrillicSpaceDash,
            msg: validateMessage.CyrillicSpaceDash
        }],

        patronymic: [{
            required: true,
            msg: validateMessage.Required
        }, {
            maxLength: 50,
            msg: validateMessage.maxLength_50
        }, {
            pattern: validateChecker.CyrillicSpaceDash,
            msg: validateMessage.CyrillicSpaceDash
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
        }],

        group: [{
            required: true,
            msg: validateMessage.Required
        }, {
            maxLength: 50,
            msg: validateMessage.maxLength_50
        }],

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
        }, {
            maxLength: 50,
            msg: validateMessage.maxLength_50
        }]

    }

});
