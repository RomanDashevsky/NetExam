import Controller from '../controllers';

const controller = new Controller();

export default Mn.AppRouter.extend({

    controller,

    appRoutes: {
        'teacher/' : 'indexTeacher',
        'teacher/exams' : 'getExams',
        'teacher/exams/:id/questions' : 'getExamsQuestions',
        'teacher/students' : 'getExamStudents',
        'teacher/students/:id/students' : 'getStudents',
        'teacher/add-exam' : 'addExam',
        'teacher/incomplete-exams' : 'getIncompleteExams',
        'teacher/edit/:id' : 'editExam',
        'teacher/edit/:id/add' : 'addQuestion',
        'teacher/edit/:id/question/:id' : 'editQuestion',
        'teacher/edit/:id/state' : 'editExamStatus'
    }
    
});