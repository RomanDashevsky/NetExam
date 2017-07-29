const sessionChannel = Radio.channel('session');

export default Mn.Object.extend({

    sync: function(method, model, options) {
        options.beforeSend = this.beforeSend;
        return Backbone.Model.prototype.sync.apply(this, arguments);
    },

    beforeSend: function(xhr) {
        const token = sessionChannel.request('session:get:token');
        xhr.setRequestHeader('token',token);
    }

});