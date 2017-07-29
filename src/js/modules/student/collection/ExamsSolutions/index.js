import BaseCollection from '../../../_common/models/baseCollection';
import ExamSolution from '../../models/ExamSolution';

export default BaseCollection.extend({

    url: '/api/exams/solutions',

    model: ExamSolution,

    parse: function(response){
        return response.exams;
    }
    
});
