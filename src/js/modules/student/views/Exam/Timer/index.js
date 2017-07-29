import template from './index.hbs';

export default Mn.View.extend({

    template,

    initialize: function (options) {
        this.timer = options.timer;
        this.timer.setTimer(options.secDiff);
        this.listenTo(this.timer, 'change:seconds', this.onRender, this);
        this.timer.startTimer();
    },

    onRender: function () {

        const time = this.timer.getTime();
        const lessMinutes = this.timer.get('hours') === 0 && this.timer.get('minutes') === 0;

        this.$el.html(this.template({
            time: time,
            lessMinutes: lessMinutes
        }));

        return this;

    }

});