import template from './index.hbs';

const teacherDataChannel = Radio.channel('teacherData');

export default Mn.View.extend({
    
    template,

    initialize: function (options) {
        this.exam = options.exam;
        this.questions = teacherDataChannel.request('teacherData:get:questions', this.exam.attributes.id);
        this.listenTo(this.questions, 'all', this.onRender, this);
    },

    onRender: function () {
        this.$el.html(this.template({exam: this.exam.attributes, questions: this.questions.slice()}));
        return this;
    }

});
