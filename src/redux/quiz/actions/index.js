import { readQuizes } from "config/firebaseDatabase"
import {
	FETCH_QUIZES_ERROR,
	FETCH_QUIZES_START,
	FETCH_QUIZES_SUCCESS,
	FETCH_QUIZ_SUCCESS,
	FINISH_QUIZ,
	QUIZ_NEXT_QUESTION,
	QUIZ_RETRY,
	QUIZ_SET_STATE,
} from "../types"

export function fetchQuizes() {
	return async (dispatch) => {
		dispatch(fetchQuizesStart())
		try {
			const quizes = []
			await readQuizes().then((results) =>
				results.map((quiz, index) => {
					quizes.push({
						id: quiz.key,
						name: `${index + 1}. ${
							quiz.val()[0].question
						}`,
					})
				})
			)
			dispatch(fetchQuizesSuccess(quizes))
		} catch (e) {
			dispatch(fetchQuizesError(e))
			console.log(e)
		}
	}
}

export function fetchQuizById(quizId) {
	return async (dispatch) => {
		dispatch(fetchQuizesStart())
		try {
			// const quiz = readQuizById(quizId)
			console.log("hi :>> ")
		} catch (e) {
			dispatch(fetchQuizesError(e))
		}
	}
}

export function fetchQuizesStart() {
	return {
		type: FETCH_QUIZES_START,
	}
}

export function fetchQuizesSuccess(quizes) {
	return {
		type: FETCH_QUIZES_SUCCESS,
		quizes,
	}
}

export function fetchQuizSuccess(quiz) {
	return {
		type: FETCH_QUIZ_SUCCESS,
		quiz,
	}
}

export function fetchQuizesError(e) {
	return {
		type: FETCH_QUIZES_ERROR,
		error: e,
	}
}

export function quizSetState(
	answerState,
	results
) {
	return {
		type: QUIZ_SET_STATE,
		answerState,
		results,
	}
}

export function finishQuiz() {
	return {
		type: FINISH_QUIZ,
	}
}

export function retryQuiz() {
	return {
		type: QUIZ_RETRY,
	}
}

export function quizNextQuestion(number) {
	return {
		type: QUIZ_NEXT_QUESTION,
		number,
	}
}

export function quizAnswerClick(answerId, state) {
	return (dispatch) => {
		if (state.answerState) {
			const key = Object.keys(
				state.answerState
			)[0]
			if (state.answerState[key] === "success") {
				return
			}
		}

		const question =
			state.quiz[state.activeQuestion]
		const results = state.results

		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = "success"
			}

			dispatch(
				quizSetState(
					{ [answerId]: "success" },
					results
				)
			)

			const timeout = window.setTimeout(() => {
				if (isQuizFinished(state)) {
					dispatch(finishQuiz())
				} else {
					dispatch(
						quizNextQuestion(
							state.activeQuestion + 1
						)
					)
				}

				window.clearTimeout(timeout)
			}, 1000)
		} else {
			results[question.id] = "error"
			dispatch(
				quizSetState(
					{ [answerId]: "error" },
					results
				)
			)
		}
	}
}

function isQuizFinished(state) {
	return (
		state.activeQuestion + 1 === state.quiz.length
	)
}
