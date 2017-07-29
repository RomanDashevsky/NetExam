import SessionType from '../modules/_common/models/sessionType';

const sessionType = new SessionType();

export default Mn.Object.extend({

    channelName: 'session',

    radioRequests: {
        'session:get:type': 'getSessionType',
        'session:get': 'getSession',
        'session:set': 'setSession',
        'session:delete': 'deleteSession',
        'session:get:fullUserName': 'getFullUserName',
        'session:get:namePatronymic': 'getNamePatronymic',
        'session:get:token': 'getToken'
    },

    getSessionType: function () {

        const session = this.getSession();

        if (session === null) {
            return sessionType.guest;
        }

        if (session.userInfo.userType == 'student') {
            return sessionType.student;
        } else if (session.userInfo.userType == 'teacher') {
            return sessionType.teacher;
        }

        return sessionType.guest;

    },

    getSession: function () {
        const localData = localStorage.getItem('session');
        return localData === null ? null : JSON.parse(localData);
    },

    setSession: function (data) {
        localStorage.setItem('session', JSON.stringify(data));
    },

    deleteSession: function () {
        localStorage.removeItem('session');
    },

    getFullUserName: function () {

        const lastName = this.getLastName();
        const firstName = this.getFirstName().charAt(0);
        let patronymic = this.getPatronymic();

        patronymic = patronymic === null ? null : patronymic.charAt(0);

        return (lastName + ' ' + firstName + '.') + (patronymic === null ? '' : ( ' ' + patronymic + '.'));

    },

    getNamePatronymic: function () {
        const firstName = this.getFirstName();
        const patronymic = this.getPatronymic();
        return (firstName) + (patronymic === null ? '' : ( ' ' + patronymic));
    },

    getLastName: function () {
        return this.getSession().userInfo.lastName;
    },

    getFirstName: function () {
        return this.getSession().userInfo.firstName;
    },

    getPatronymic: function () {
        return this.getSession().userInfo.patronymic;
    },

    getToken: function () {
        const session = this.getSession();
        return session === null ? null : session.token;
    }

});