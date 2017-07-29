import template from './index.hbs';

export default Mn.View.extend({

    template,

    events: {
        'click .answerText': 'onRadioClick'
    },

    initialize: function (options) {
        this.question = options.question;
        this.index = options.index;
    },

    onRadioClick: function (event) {
        event.stopPropagation();
        this.removeAllChecked();
        $(event.currentTarget).find('.circle').addClass('checkCircle');
    },

    removeAllChecked: function () {
        $('.circle').removeClass('checkCircle');
    },

    onRender: function () {

        const question = this.question.get('question');
        const number = this.index + 1;
        const answers = this.question.get('answers');

        this.$el.html(this.template({
            question: question,
            number: number,
            answers: answers
        }));

        return this;

    }

});