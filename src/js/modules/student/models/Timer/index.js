export default Bb.Model.extend({

    defaults: {
        seconds: 0,
        minutes: 0,
        hours: 0,
        sendAnswers: 0
    },

    setTimer: function (secDiff) {

        this.set('seconds', secDiff % 60);
        secDiff = Math.floor(secDiff / 60);
        this.set('minutes', secDiff % 60);
        secDiff = Math.floor(secDiff / 60);
        this.set('hours', secDiff % 24);

    },

    getTime: function () {

        let h = this.get('hours');
        let m = this.get('minutes');
        let s = this.get('seconds');

        if (m < 10) m = '0' + m;
        if (s < 10) s = '0' + s;

        return (h ? ( h + ':') : '')  + (h || m ? (m + ':') : '')+ s;
    },

    startTimer: function () {

        let h = this.get('hours');
        let m = this.get('minutes');
        let s = this.get('seconds');
        if (s === 0) {
            if (m === 0) {
                if (h === 0) {
                    return;
                }
                h--;
                m = 60;
            }
            m--;
            s = 59;
        }
        else s--;

        if(h === 0 && m === 0 && s <= 3 && !this.sendAnswers){
            this.sendAnswers = 1;
        }

        this.set('hours', h);
        this.set('minutes', m);
        this.set('seconds', s);

        setTimeout(this.startTimer.bind(this), 1000);

    }

});
