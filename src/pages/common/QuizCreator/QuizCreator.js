import classes from "./QuizCreator.module.scss"
import React from "react"
import Button from "../../../components/UI/Button/Button"
import {
	createControl,
	validate,
	validateForm,
} from "../../../components/forms/formFramework"
import Input from "../../../components/UI/Input/Input"
import Select from "../../../components/UI/Select/Select"
import Auxiliary from "../../../hocs/Auxiliary/Auxiliary"
import { connect } from "react-redux"
import {
	createQuizQuestion,
	finishCreateQuiz,
} from "../../../store/actions/create"
import { Component } from "react"

function createOptionControl(number) {
	return createControl(
		{
			label: `Answer ${number}`,
			errorMessage: "The field can't be empty",
			id: number,
		},
		{ required: true }
	)
}

function createFormControls() {
	return {
		question: createControl(
			{
				label: "Type the question",
				errorMessage: "The field can't be empty",
			},
			{ required: true }
		),
		option1: createOptionControl(1),
		option2: createOptionControl(2),
		option3: createOptionControl(3),
		option4: createOptionControl(4),
	}
}

// const QuizCreator = props => {
// 	const [state, setState] = useState({
// 		isFormValid: false,
// 		rightAnswerId: 1,
// 		formControls: createFormControls(),
// 	})

// 	const submitHandler = event => {
// 		event.preventDefault()
// 	}

// 	const addQuestionHandler = event => {
// 		event.preventDefault()

// 		const { question, option1, option2, option3, option4 } = state.formControls

// 		const questionItem = {
// 			question: question.value,
// 			id: props.quiz.length + 1,
// 			rightAnswerId: state.rightAnswerId,
// 			answers: [
// 				{ text: option1.value, id: option1.id },
// 				{ text: option2.value, id: option2.id },
// 				{ text: option3.value, id: option3.id },
// 				{ text: option4.value, id: option4.id },
// 			],
// 		}

// 		props.createQuizQuestion(questionItem)

// 		setState({
// 			isFormValid: false,
// 			rightAnswerId: 1,
// 			formControls: createFormControls(),
// 		})
// 	}

// 	const createQuizHandler = event => {
// 		event.preventDefault()

// 		setState({
// 			isFormValid: false,
// 			rightAnswerId: 1,
// 			formControls: createFormControls(),
// 		})

// 		props.finishCreateQuiz()
// 	}

// 	const changeHandler = (value, controlName) => {
// 		const formControls = { ...state.formControls }
// 		const control = { ...formControls[controlName] }

// 		control.touched = true
// 		control.value = value
// 		control.valid = validate(control.value, control.validation)

// 		formControls[controlName] = control

// 		setState({
// 			formControls,
// 			isFormValid: validateForm(formControls),
// 		})
// 	}

// 	const renderControls = () => {
// 		console.log(state);
// 		return Object.keys(state.formControls).map((controlName, index) => {
// 			const control = state.formControls[controlName]

// 			return (
// 				<Auxiliary key={controlName + index}>
// 					<Input
// 						label={control.label}
// 						value={control.value}
// 						valid={control.valid}
// 						shouldValidate={!!control.validation}
// 						touched={control.touched}
// 						errorMessage={control.errorMessage}
// 						onChange={event => changeHandler(event.target.value, controlName)}
// 					/>
// 					{index === 0 ? <hr /> : null}
// 				</Auxiliary>
// 			)
// 		})
// 	}

// 	const selectChangeHandler = event => {
// 		setState({
// 			rightAnswerId: +event.target.value,
// 		})
// 	}

// 	const select = (
// 		<Select
// 			label="Choose the correct answer"
// 			value={state.rightAnswerId}
// 			onChange={selectChangeHandler}
// 			options={[
// 				{ text: 1, value: 1 },
// 				{ text: 2, value: 2 },
// 				{ text: 3, value: 3 },
// 				{ text: 4, value: 4 },
// 			]}
// 		/>
// 	)

// 	return (
// 		<div className={classes.QuizCreator}>
// 			<div>
// 				<h1>Quiz creating</h1>

// 				<form onSubmit={submitHandler}>
// 					{renderControls()}

// 					{select}

// 					<Button
// 						type="primary"
// 						onClick={addQuestionHandler}
// 						disabled={!state.isFormValid}>
// 						Add question
// 					</Button>

// 					<Button
// 						type="success"
// 						onClick={createQuizHandler}
// 						disabled={props.quiz.length === 0}>
// 						Create test
// 					</Button>
// 				</form>
// 			</div>
// 		</div>
// 	)
// }

class QuizCreator extends Component {
	state = {
		isFormValid: false,
		rightAnswerId: 1,
		formControls: createFormControls(),
	}

	submitHandler = event => {
		event.preventDefault()
	}

	addQuestionHandler = event => {
		event.preventDefault()

		const {
			question,
			option1,
			option2,
			option3,
			option4,
		} = this.state.formControls

		const questionItem = {
			question: question.value,
			id: this.props.quiz.length + 1,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{ text: option1.value, id: option1.id },
				{ text: option2.value, id: option2.id },
				{ text: option3.value, id: option3.id },
				{ text: option4.value, id: option4.id },
			],
		}

		this.props.createQuizQuestion(questionItem)

		this.setState({
			isFormValid: false,
			rightAnswerId: 1,
			formControls: createFormControls(),
		})
	}

	createQuizHandler = event => {
		event.preventDefault()

		this.setState({
			isFormValid: false,
			rightAnswerId: 1,
			formControls: createFormControls(),
		})
		this.props.finishCreateQuiz()
	}

	changeHandler = (value, controlName) => {
		const formControls = { ...this.state.formControls }
		const control = { ...formControls[controlName] }

		control.touched = true
		control.value = value
		control.valid = validate(control.value, control.validation)

		formControls[controlName] = control

		this.setState({
			formControls,
			isFormValid: validateForm(formControls),
		})
	}

	renderControls() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName]

			return (
				<Auxiliary key={controlName + index}>
					<Input
						label={control.label}
						value={control.value}
						valid={control.valid}
						shouldValidate={!!control.validation}
						touched={control.touched}
						errorMessage={control.errorMessage}
						onChange={event =>
							this.changeHandler(event.target.value, controlName)
						}
					/>
					{index === 0 ? <hr /> : null}
				</Auxiliary>
			)
		})
	}

	selectChangeHandler = event => {
		this.setState({
			rightAnswerId: +event.target.value,
		})
	}

	render() {
		const select = (
			<Select
				label="Choose the correct answer"
				value={this.state.rightAnswerId}
				onChange={this.selectChangeHandler}
				options={[
					{ text: 1, value: 1 },
					{ text: 2, value: 2 },
					{ text: 3, value: 3 },
					{ text: 4, value: 4 },
				]}
			/>
		)

		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>Quiz creating</h1>

					<form onSubmit={this.submitHandler}>
						{this.renderControls()}

						{select}

						<Button
							type="primary"
							onClick={this.addQuestionHandler}
							disabled={!this.state.isFormValid}>
							Add question
						</Button>

						<Button
							type="success"
							onClick={this.createQuizHandler}
							disabled={this.props.quiz.length === 0}>
							Create test
						</Button>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		quiz: state.create.quiz,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		createQuizQuestion: item => dispatch(createQuizQuestion(item)),
		finishCreateQuiz: () => dispatch(finishCreateQuiz()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)