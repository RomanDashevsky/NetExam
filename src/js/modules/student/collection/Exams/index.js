import BaseCollection from '../../../_common/models/baseCollection';
import Exam from '../../models/Exam';

export default BaseCollection.extend({

    url: '/api/exams',

    model: Exam,

    parse: function(response){
        return response.exams;
    }
    
});
