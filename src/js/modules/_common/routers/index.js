import Controller from '../controllers';

const controller = new Controller();

export default Mn.AppRouter.extend({

    controller,

    appRoutes: {
        '' : 'indexPage',

        'access-denied': 'accessDenied',
        'page-not-found': 'pageNotFound',
        '*notFound': 'pageNotFoundRedirect'
    }

});