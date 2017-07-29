import template from './index.hbs';
import BaseSubmitView from '../../../_common/views/baseSubmitView';
import ExamModel from '../../models/Exam';

const teacherDataChannel = Radio.channel('teacherData');
const layoutChannel = Radio.channel('layout');

export default BaseSubmitView.extend({

    template,

    events: {
        'click #addExam': 'addExam',
        'click .editExam': 'editExam'
    },

    initialize: function () {
        this.exams = teacherDataChannel.request('teacherData:get:exams');
        this.listenTo(this.exams, 'all', this.onRender, this);
        teacherDataChannel.trigger('teacherData:exams:fetch');
        this.model = new ExamModel();
        this.showExamWrapper = false;
    },

    editExam: function (event) {
        const id = $(event.currentTarget).find('.idAttr').html();
        Backbone.history.navigate('teacher/edit/' + id, {trigger: true});
    },

    addExam: function () {

        const self = this;

        if (this.showExamWrapper) {

            $('.addExamForm').fadeOut('slow', function () {
                $('#addExamWrapper').animate({
                    height: 100
                }, function () {
                    $('.addExamHeader').fadeIn('slow');
                    self.showExamWrapper = false;
                });
            });

        } else {

            $('.addExamHeader').fadeOut('slow', function () {
                $('#addExamWrapper').animate({
                    height: 400
                }, function () {
                    $('.addExamForm').fadeIn('slow');
                    self.showExamWrapper = true;
                });
            });

        }

    },

    onRender: function () {
        const collection = teacherDataChannel.request('teacherData:get:incompleteExams');
        this.$el.html(this.template({collection: collection}));
        return this;
    },

    onDone: function () {

        $('.addExamForm').fadeOut('slow', function () {
            $('#addExamWrapper').animate({
                height: 100
            }, function () {
                $('.addExamHeader').fadeIn('slow', function () {
                    self.showExamWrapper = false;
                    layoutChannel.trigger('success:show', 'Экзамен добавлен');
                    this.model = new ExamModel();
                    teacherDataChannel.trigger('teacherData:exams:fetch');
                });
            });
        });

    },

    onFail: function (jqXHR) {

        const response = jqXHR.responseJSON;

        if (_.isObject(response) && _.has(response, 'errors')) {
            layoutChannel.trigger('error:parse', response.errors);
        } else {
            layoutChannel.trigger('error:show', 'Error : ' + jqXHR.status + ' - ' + jqXHR.statusText);
        }

        this.model = new ExamModel();
        
    }

});
