import BaseModel from '../../../_common/models/baseModel';

export default BaseModel.extend({

    defaults: {
        answers: [],
        results: []
    },

    initialize: function (options) {
        this.idExam = options.idExam;
    },

    url: function () {
        return '/api/exams/' + this.idExam + '/solutions';
    },

});
