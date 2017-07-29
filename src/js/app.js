import {
    LayoutChannel,
    SessionChannel,
    TeacherDataChannel,
    StudentDataChannel,
    ConfigChannel
} from './channels';
import RootView from './modules/_common/views/root';
import MainRouter from './modules/_common/routers';
import GuestRouter from './modules/guest/routers';
import TeacherRouter from './modules/teacher/routers';
import StudentRouter from './modules/student/routers';

const NetExam = Mn.Application.extend({

    region: '#app',

    onStart() {
        this.layout = new RootView();
        this.showView(this.layout);
        this.initChannels();
        this.initRouters();
        Bb.history.start({pushState: true});
    },

    initRouters: function() {
        new MainRouter();
        new GuestRouter();
        new TeacherRouter();
        new StudentRouter();
    },

    initChannels: function() {
        new LayoutChannel({layout: this.layout});
        new SessionChannel();
        new TeacherDataChannel();
        new StudentDataChannel();
        new ConfigChannel();
    }

});

export default new NetExam();
