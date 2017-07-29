import ConfigModel from '../modules/_common/models/config';

const layoutChannel = Radio.channel('layout');

export default Mn.Object.extend({

    channelName: 'config',

    initialize() {
        this.config = new ConfigModel;
        this.onFetch();
    },

    radioRequests: {
        'config:get:maxNameLength': 'getMaxNameLength',
        'config:get:minPasswordLength': 'getMinPasswordLength',
        'config:get:minAnswers': 'getMinAnswers',
        'config:get:minQuestionsCountPerExam': 'getMinQuestionsCountPerExam',
        'config:get:minTime': 'getMinTime'
    },

    radioEvents: {
        'config:fetch': 'onFetch'
    },

    onFetch: function () {
        this.beforeSend();
        this.config.fetch({complete: this.completeExams});
    },

    getMaxNameLength: function () {
        return this.config.get('maxNameLength');
    },

    getMinPasswordLength: function () {
        return this.config.get('minPasswordLength');
    },

    getMinAnswers: function () {
        return this.config.get('minAnswers');
    },

    getMinQuestionsCountPerExam: function () {
        return this.config.get('minQuestionsCountPerExam');
    },

    getMinTime: function () {
        return this.config.get('minTime');
    },

    beforeSend: function () {
        layoutChannel.trigger('loader:show', 'configLoad');
    },

    completeExams: function () {
        layoutChannel.trigger('loader:hide', 'configLoad');
    }

});
