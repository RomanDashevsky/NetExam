import Controller from '../controllers';

const controller = new Controller();

export default Mn.AppRouter.extend({

    controller,

    appRoutes: {
        'login' : 'logIn',
        'signup': 'signUp',
        'signup/student': 'signUpStudent',
        'signup/teacher': 'signUpTeacher',
    }
    
});