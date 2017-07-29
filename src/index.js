import './scss/index.scss';
import 'bootstrap-sass';
import 'bootstrap-material-design';
import 'jquery-touchswipe';
import NetExam from './js/app';
import initHbsHelpers from './js/hbsHelpers';
import initScripts from './js/InitScripts';


function initApp() {
    initHbsHelpers();
    NetExam.start();
    initScripts();
}

$(document).ready(()=>(initApp()));
