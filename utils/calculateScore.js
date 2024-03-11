function convertAnswer(answer, correct_option) {

    const list = [
        { id: "option_1", value: 'a' },
        { id: "option_2", value: 'b' },
        { id: "option_3", value: 'c' },
        { id: "option_4", value: 'd' }
    ];

    const opt = list.find((option) => option.id === correct_option);


    if (opt?.value === answer) return true;
    return false;

}


export function calculateScore(candidate_answers, quiz) {
    let quiz_score = 0;

    candidate_answers
        .map((each_candidate_quiz) => {
            let each_quiz = quiz?.questions?.find((quiz) => quiz?.number === each_candidate_quiz?.number);
        if (convertAnswer(each_candidate_quiz?.answer, each_quiz?.correct_answer)) return quiz_score += each_quiz?.mark
        return quiz_score += 0;
    });


    return quiz_score
};
