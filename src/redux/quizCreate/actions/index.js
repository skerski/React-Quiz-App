import { alertError } from "components/common/UI/Alert"
import { writeQuiz } from "config/firebaseDatabase"
import {
	CREATE_QUIZ_QUESTION,
	FINISH_CREATE_QUIZ_ERROR,
	FINISH_CREATE_QUIZ_START,
	FINISH_CREATE_QUIZ_SUCCESS,
} from "../types"

export function createQuizQuestion(item) {
	return {
		type: CREATE_QUIZ_QUESTION,
		item,
	}
}

export function finishCreateQuizStart() {
	return {
		type: FINISH_CREATE_QUIZ_START,
	}
}

export function finishCreateQuizError(error) {
	return {
		type: FINISH_CREATE_QUIZ_ERROR,
		payload: error,
	}
}

export function finishCreateQuizSuccess() {
	return {
		type: FINISH_CREATE_QUIZ_SUCCESS,
	}
}

export function finishCreateQuiz(values) {
	return async (dispatch) => {
		dispatch(finishCreateQuizStart())
		try {
			console.log("values: ", values)
			const questions = values.questions.map(
				(question, index) => {
					return {
						question: question.question,
						id: index + 1,
						rightAnswerId: question.rightAnswerId,
						answers: [
							{
								text: question.option1,
								id: question.hOption1,
							},
							{
								text: question.option2,
								id: question.hOption2,
							},
							{
								text: question.option3,
								id: question.hOption3,
							},
							{
								text: question.option4,
								id: question.hOption4,
							},
						],
					}
				}
			)

			writeQuiz(questions)

			dispatch(finishCreateQuizSuccess())
		} catch (e) {
			dispatch(finishCreateQuizError(e))
			alertError(e)
		}
	}
}
