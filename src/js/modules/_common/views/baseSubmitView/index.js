import {ValidationBehavior, SaveModelOnSubmitBehavior} from '../../../../behaviors';

const layoutChannel = Radio.channel('layout');

export default Mn.View.extend({

    ui: {
        form: 'form',
        input: '.form-control'
    },

    triggers: {
        'submit @ui.form': 'submit',
        'blur @ui.input': 'valid'
    },

    behaviors: [ValidationBehavior, SaveModelOnSubmitBehavior],

    onDone() {
    },

    onFail(jqXHR) {

        const response = jqXHR.responseJSON;

        if (_.isObject(response) && _.has(response, 'errors')) {
            layoutChannel.trigger('error:parse', response.errors);
        } else {
            layoutChannel.trigger('error:show', 'Error : ' + jqXHR.status + ' - ' + jqXHR.statusText);
        }

    }

});