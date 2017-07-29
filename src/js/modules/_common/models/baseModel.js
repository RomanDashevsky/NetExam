import BaseFunc from './baseObject';

const baseFunc = new BaseFunc();
const sync = baseFunc.sync;
const beforeSend = baseFunc.beforeSend;

export default Bb.Model.extend({
    sync,
    beforeSend
});