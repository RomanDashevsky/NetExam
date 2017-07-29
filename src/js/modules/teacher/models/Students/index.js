import BaseModel from '../../../_common/models/baseModel';

export default BaseModel.extend({

    defaults: {
        name: null,
        groups: null
    },

    initialize: function (options) {
        this.idExam = options.idExam;
    },

    url: function () {
        return '/api/exams/' + this.idExam + '/students';
    }

});
