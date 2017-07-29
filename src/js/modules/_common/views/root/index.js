import template from './index.hbs';

export default Mn.View.extend({

    template,

    regions: {
        menu: '#menu',
        content: '#content',
        success: '#successAlertRegion',
        error: '#errorAlertRegion',
    },

    events: {
        'click #menuOff': 'hideMenu',
        'click #menuOn': 'showMenu'
    },

    initialize: function() {
        this.menuVisible = false;
    },

    onRender: function () {
        $(document).swipe({
            swipeLeft: this.swipeHideMenu.bind(this),
            swipeRight: this.swipeShowMenu.bind(this),
            threshold: 0
        });
    },

    hideMenu: function () {
        $('#navigation').animate({'margin-left': '-=260'});
        this.menuVisible = false;
    },

    swipeHideMenu: function () {
        if (this.menuVisible && window.innerWidth<=768) {
            this.hideMenu();
        }
    },

    showMenu: function () {
        $('#navigation').animate({'margin-left': '+=260'});
        this.menuVisible = true;
    },

    swipeShowMenu: function () {
        if (!this.menuVisible && window.innerWidth<=768) {
            this.showMenu();
        }
    },

    showView: function (region, view) {
        this.showChildView(region, view);
        view.delegateEvents();
    },

    showMenuView: function (view) {
        this.showView('menu', view);
    },

    showContentView: function (view) {
        this.showView('content', view);
        $.material.init();
        window.scrollTo(0, 0);
    },

    showSuccessAlertView: function (view) {
        this.showChildView('success', view);
        setTimeout(this.hideSuccessAlertView, 2000);
    },

    hideSuccessAlertView: function () {
        $('#successAlert').fadeOut('slow');
    },

    showErrorAlertView: function (view) {
        this.showChildView('error', view);
    }

});