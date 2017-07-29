import {AccessDeniedView, PageNotFoundView} from '../views';
import SessionType from '../models/sessionType';
import GuestNavigationMenu from '../../guest/views/NavigationMenu';
import GuestIndexNavigationView from '../../guest/views/IndexNavigation';
import TeacherNavigationMenu from '../../teacher/views/NavigationMenu';
import TeacherIndexNavigationView from '../../teacher/views/IndexNavigation';
import StudentNavigationMenu from '../../student/views/NavigationMenu';
import StudentIndexNavigationView from '../../student/views/IndexNavigation';

const sessionTypeEnum = new SessionType();

const layoutChannel = Radio.channel('layout');
const sessionChannel = Radio.channel('session');

export default Mn.Object.extend({

    indexPage: function () {

        const sessionType = sessionChannel.request('session:get:type');

        if (sessionType === sessionTypeEnum.guest) {
            Backbone.history.navigate('login', {trigger: true});
        } else if (sessionType === sessionTypeEnum.student) {
            Backbone.history.navigate('student/', {trigger: true});
        } else {
            Backbone.history.navigate('teacher/', {trigger: true});
        }

    },

    accessDenied: function () {
        const NavigationViews = this.getNavigationViews();
        this.showView(NavigationViews.NavigationMenu, new AccessDeniedView({navView : NavigationViews.IndexNavigation}));
    },

    pageNotFound: function () {
        const NavigationViews = this.getNavigationViews();
        this.showView(NavigationViews.NavigationMenu, new PageNotFoundView({navView : NavigationViews.IndexNavigation}));
    },

    pageNotFoundRedirect: function () {
        Backbone.history.navigate('page-not-found', {trigger: true});
    },

    showView: function (menu, content) {
        layoutChannel.trigger('menu:show', menu);
        layoutChannel.trigger('content:show', content);
    },

    getNavigationViews: function () {

        const sessionType = sessionChannel.request('session:get:type');
        let NavigationMenu = null;
        let IndexNavigation = null;

        if (sessionType === sessionTypeEnum.student) {
            NavigationMenu = new StudentNavigationMenu();
            IndexNavigation = new StudentIndexNavigationView();
        } else if (sessionType === sessionTypeEnum.teacher) {
            NavigationMenu = new TeacherNavigationMenu();
            IndexNavigation = new TeacherIndexNavigationView();
        } else{
            NavigationMenu = new GuestNavigationMenu();
            IndexNavigation = new GuestIndexNavigationView();
        }

        return {NavigationMenu , IndexNavigation};

    }

});