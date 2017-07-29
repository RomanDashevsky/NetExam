import ErrorAlertView from '../modules/_common/views/Alerts/Error';
import SuccessAlertView from '../modules/_common/views/Alerts/Success';
import ErrorCode from '../modules/_common/models/errorCode';

const errorCode = new ErrorCode();

export default Mn.Object.extend({

    channelName: 'layout',

    initialize(options) {
        this.layout = options.layout;
        this.showLoaderMap = new Map();
    },

    radioEvents: {
        'menu:show': 'onMenuShow',
        'content:show': 'onContentShow',
        'success:show': 'onSuccessShow',
        'error:show': 'onErrorShow',
        'error:parse': 'parseErrors',
        'validate:check': 'onValidateCheck',
        'validate:hide': 'onValidateHide',
        'validate:show': 'onValidateShow',
        'loader:show': 'onLoaderShow',
        'loader:hide': 'onLoaderHide'
    },

    onMenuShow: function (view) {
        view.render();
        this.layout.showMenuView(view);
    },

    onContentShow: function (view) {
        view.render();
        this.layout.showContentView(view);
    },

    onSuccessShow: function (message) {
        this.layout.showSuccessAlertView(new SuccessAlertView({message: message}));
    },

    onErrorShow: function (message) {
        this.layout.showErrorAlertView(new ErrorAlertView({message: message}));
    },

    parseErrors: function (errors) {

        errors.forEach((error) => {
            const err = errorCode[error.errorCode];

            if(!err){
                this.onErrorShow(error.message);
            }

            if (err.field) {
                this.onValidateShow(error.field, err.text);
            } else {
                this.onErrorShow(err.text);
            }
        });

    },

    onValidateCheck: function(elem, tooltipMessage, validateCheck) {
        if(validateCheck(elem.value)){
            this.onValidateHide(elem);
        }else{
            this.onValidateShow(elem.name, tooltipMessage);
        }
    },

    onValidateShow: function (name, errorMessage) {

        const $el = $('[name=' + name + ']');
        const $group = $el.closest('.form-group');

        $group.addClass('has-error');
        $group.find('.help-block').html(errorMessage).removeClass('hidden');

    },

    onValidateHide: function (name) {

        const $el = $('[name=' + name + ']');
        const $group = $el.closest('.form-group');

        $group.removeClass('has-error');
        $group.find('.help-block').html('').addClass('hidden');

    },

    onLoaderShow: function (nameCallFunc) {
        this.showLoaderMap.set(nameCallFunc, setTimeout(function () {
            $('#content').addClass('hidden');
            $('#loaderWrapper').removeClass('hidden');
        }, 1000));
    },

    onLoaderHide: function (nameCallFunc) {

        clearTimeout(this.showLoaderMap.get(nameCallFunc));

        $('#loaderWrapper').addClass('hidden');
        $('#content').removeClass('hidden');

    },
});