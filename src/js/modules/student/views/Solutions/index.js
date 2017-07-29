import template from './index.hbs';

const studentDataChannel = Radio.channel('studentData');

export default Mn.View.extend({

    template,

    events: {
        'click .showExam': 'showExam'
    },

    initialize: function () {
        this.examsSolutions = studentDataChannel.request('studentData:get:examsSolutions');
        this.listenTo(this.examsSolutions, 'all', this.onRender, this);
        studentDataChannel.trigger('studentData:examsSolutions:fetch');
    },

    onRender: function () {

        const exams = this.examsSolutions.slice();


        this.$el.html(this.template({
            exams: exams
        }));

        return this;

    },

    showExam: function (event) {
        event.stopPropagation();
        const id = $(event.currentTarget).find('.idAttr').html();
        Backbone.history.navigate('student/solutions/' + id, {trigger: true});
    }

});
