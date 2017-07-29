const layoutChannel = Radio.channel('layout');

export default Mn.Behavior.extend({

    onSubmit: function (view, event) {

        const inputDataArray = $(event.currentTarget).serializeArray();

        _.each(inputDataArray, (element) => {
            view.model.set(element.name, element.value);
        });

        layoutChannel.trigger('loader:show', 'submitLoader');

        const savePromise = view.model.save();

        if (savePromise) {
            savePromise
                .done((...params) => {
                    this.complete();
                    view.triggerMethod('done', ...params);
                })
                .fail((...params) => {
                    this.complete();
                    view.triggerMethod('fail', ...params);
                });
        }

    },

    complete: function () {
        layoutChannel.trigger('loader:hide', 'submitLoader');
    }

});
