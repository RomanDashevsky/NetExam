import template from './index.hbs';

const studentDataChannel = Radio.channel('studentData');

export default Mn.View.extend({

    template,

    events: {
        'click .showExam': 'showExam'
    },

    initialize: function () {
        this.exams = studentDataChannel.request('studentData:get:exams');
        this.examsCurrent = studentDataChannel.request('studentData:get:examsCurrent');
        studentDataChannel.trigger('studentData:exams:fetch', false);
        studentDataChannel.trigger('studentData:exams:current:fetch', false);
    },

    onRender: function () {

        const exams = this.exams.slice();
        const examsCurrent = this.examsCurrent.slice();

        this.$el.html(this.template({
            exams: exams,
            examsCurrent: examsCurrent
        }));

        return this;

    },

    showExam: function (event) {
        event.stopPropagation();
        const id = $(event.currentTarget).find('.idAttr').html();
        Backbone.history.navigate('student/exams/' + id + '/questions', {trigger: true});
    }

});
