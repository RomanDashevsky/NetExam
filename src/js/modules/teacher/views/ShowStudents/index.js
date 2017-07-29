import template from './index.hbs';

const teacherDataChannel = Radio.channel('teacherData');

export default Mn.View.extend({

    template,

    initialize: function (options) {
        this.students = teacherDataChannel.request('teacherData:get:students', options.idExam);
        this.listenTo(this.students, 'all', this.onRender, this);
        teacherDataChannel.trigger('teacherData:students:fetch');
    },

    onRender: function () {

        const name = this.students.get('name');
        const groups = this.students.get('groups');

        this.$el.html(this.template({
            name: name,
            groups: groups
        }));

        return this;

    }

});
