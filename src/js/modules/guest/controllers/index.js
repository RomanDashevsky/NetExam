import SessionType from '../../_common/models/sessionType';
import {
    NavigationMenu,
    LogInView,
    SignUpView,
    SignUpTeacherView,
    SignUpStudentView
} from '../views';
import {
    SessionModel,
    SignUpTeacherModel,
    SignUpStudentModel,
} from '../models';

const sessionTypeEnum = new SessionType();
const layoutChannel = Radio.channel('layout');
const sessionChannel = Radio.channel('session');

export default Mn.Object.extend({

    initialize() {
        this.sessionModel = new SessionModel();
        this.signUpTeacherModel = new SignUpTeacherModel();
        this.signUpStudentModel = new SignUpStudentModel();
    },

    logIn: function () {
        this.showView(new LogInView({model: this.sessionModel}));
    },

    signUp: function () {
        this.showView(new SignUpView());
    },

    signUpStudent: function () {
        this.showView(new SignUpStudentView({model: this.signUpStudentModel}));
    },

    signUpTeacher: function () {
        this.showView(new SignUpTeacherView({model: this.signUpTeacherModel}));
    },

    showView: function (view) {
        if (this.userIsGuest()) {
            layoutChannel.trigger('menu:show', new NavigationMenu());
            layoutChannel.trigger('content:show', view);
        }
    },

    userIsGuest: function () {

        const sessionType = sessionChannel.request('session:get:type');

        if (sessionType === sessionTypeEnum.guest) {
            return true;
        }

        Backbone.history.navigate('', {trigger: true});

        return false;
        
    }

});