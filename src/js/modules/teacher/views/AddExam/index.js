import template from './index.hbs';
import BaseSubmitView from '../../../_common/views/baseSubmitView';
import AddExamModel from '../../models/Exam';

const layoutChannel = Radio.channel('layout');

export default BaseSubmitView.extend({

    template,

    initialize: function () {
        this.model = new AddExamModel();
    },

    onDone() {
        layoutChannel.trigger('success:show', 'Экзамен добавлен');
        Backbone.history.navigate('teacher/incomplete-exams',{trigger:true});
    }

});
