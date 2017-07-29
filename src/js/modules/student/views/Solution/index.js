import template from './index.hbs';

export default Mn.View.extend({

    template,

    initialize: function (options) {
        this.solutions = options.solutions;
        console.log(this.solutions);
    },

    onRender: function () {

        const results = this.solutions.get('results');
        const count = results.length;
        const correctAnswers = _.filter(results, (elem) => elem === 'YES').length;
        const wrongAnswers = _.filter(results, (elem) => elem === 'NO').length;
        const noAnswers = _.filter(results, (elem) => elem === 'NO_ANSWER').length;
        const procent = count ? Math.floor(correctAnswers * 100 / count) : 0;
        const total = '' + correctAnswers + ' из ' + count + ' (' + procent + '%)';


        this.$el.html(this.template({
            count: count,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
            noAnswers: noAnswers,
            total: total,
        }));

        return this;

    }

});
