import Handlebars from 'handlebars/runtime';

const configChannel = Radio.channel('config');

export default function () {

    Handlebars.registerHelper('isTrueAnswer', function (correct, numberAnswer) {
        if (correct == numberAnswer) {
            return true;
        }
        return false;
    });

    Handlebars.registerHelper('calculateRating', function (correct, wrong, noAnswer) {

        const count = correct + wrong + noAnswer;
        const procent = count ? Math.floor(correct * 100 / count) : 0;
        return '' + correct + ' из ' + count + ' (' + procent + '%)';

    });

    Handlebars.registerHelper('isInValidQuestion', function (question) {

        if (!question.question || question.correct === null) {
            return true;
        }

        const countAnswer = question.answers.length - 1;
        const minAnswers = configChannel.request('config:get:minAnswers');

        if (countAnswer < minAnswers || countAnswer < question.correct) {
            return true;
        }

        question.answers.forEach((answer) => {
            if (!answer) {
                return true;
            }
        });

        return false;

    });

    Handlebars.registerHelper('InvalidExamStatus', function (questions) {

        if (questions && questions.length > 0 && questions[0].id) {

            const maxIndex = questions.length - 1;
            let question = null;

            for (let i = 0; i <= maxIndex; i++) {

                question = questions[i].attributes;

                if (!question.question || question.correct === null) {
                    return true;
                }

                const countAnswer = question.answers.length - 1;
                const minAnswers = configChannel.request('config:get:minAnswers');

                if (countAnswer < minAnswers || countAnswer < question.correct) {
                    return true;
                }

                question.answers.forEach((answer) => {
                    if (!answer) {
                        return true;
                    }
                });

            }

        }

        return false;

    });

    Handlebars.registerHelper('incIndex', function (index) {
        return ++index;
    });

    Handlebars.registerHelper('debugger', function (obj) {
        console.log(obj);
    });

    Handlebars.registerHelper('isItNotFirstQuestion', function (index) {
        return index != 0;
    });

}
