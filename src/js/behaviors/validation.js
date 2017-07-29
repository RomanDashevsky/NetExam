const layoutChannel = Radio.channel('layout');

export default Mn.Behavior.extend({

    onRender() {
        Validation.bind(this.view, {
            valid: this.valid,
            invalid: this.invalid
        });
    },

    onValid(view, event){

        const elem = event.currentTarget;
        const errorMessage = view.model.preValidate(elem.name, elem.value);

        if(errorMessage){
            layoutChannel.trigger('validate:show', elem.name, errorMessage);
        }else{
            layoutChannel.trigger('validate:hide', elem.name);
        }

    },

    valid(view, attr) {
        layoutChannel.trigger('validate:hide', attr);
    },

    invalid(view, attr, error) {
        layoutChannel.trigger('validate:show', attr, error);
    }

});
