import BaseModel from '../baseModel';

export default BaseModel.extend({

    url: '/api/settings',

    defaults: {
        maxNameLength: 50,
        minPasswordLength: 8,
        minAnswers: 2,
        minQuestionsCountPerExam: 2,
        minTime: 10
    }

});
