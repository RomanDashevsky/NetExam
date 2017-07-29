import template from './index.hbs';
import BaseSubmitView from '../../../_common/views/baseSubmitView';

const sessionChannel = Radio.channel('session');
const layoutChannel = Radio.channel('layout');
const configChanel = Radio.channel('config');

export default BaseSubmitView.extend({

    template,

    onDone(model) {
        layoutChannel.trigger('success:show', 'Регистрация выполнена');
        sessionChannel.request('session:set', model);
        configChanel.trigger('config:fetch');
        Backbone.history.navigate('',{trigger:true});
    }

});