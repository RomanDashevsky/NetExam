import BaseCollection from '../../../_common/models/baseCollection';
import Question from '../../models/Question';

export default BaseCollection.extend({

    model: Question,

    initialize: function (options) {
        this.idExam = options.idExam;
    },

    url: function () {
        return '/api/exams/' + this.idExam + '/questions/';
    },

    parse: function (response) {
        return response.questions;
    },

    toJSON: function () {
        return {questions: this.map((model)=>model.toJSON())};
    }
    
});