import classes from "./Auth.module.scss"
import React, { useState } from "react"
import Button from "../../../components/UI/Button/Button"
import Input from "../../../components/UI/Input/Input"
import is from "is_js"
import { connect } from "react-redux"
import { auth } from "../../../store/actions/auth"

const Auth = props => {

	const [state, setState] = useState({
		isFormValid: false,
		formControls: {
			email: {
				value: "",
				type: "email",
				label: "Email",
				errorMessage: "Please, check email-field",
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true,
				},
			},
			password: {
				value: "",
				type: "password",
				label: "Password",
				errorMessage: "Please, check password-field",
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6,
				},
			},
		},
	})

	const loginHandler = () => {
		props.auth(
			state.formControls.email.value,
			state.formControls.password.value,
			true
		)
	}
	const registerHandler = () => {
		props.auth(
			state.formControls.email.value,
			state.formControls.password.value,
			false
		)
	}
	const submitHandler = e => {
		e.preventDefault()
	}

	const validateControl = (value, validation) => {
		if (!validation) {
			return true
		}

		let isValid = true

		if (validation.required) {
			isValid = value.trim() !== "" && isValid
		}

		if (validation.email) {
			isValid = is.email(value) && isValid
		}

		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid
		}

		return isValid
	}

	const onChangeHandler = (e, controlName) => {
		const formControls = { ...state.formControls }
		const control = { ...formControls[controlName] }

		control.value = e.target.value
		control.touched = true
		control.valid = validateControl(control.value, control.validation)

		formControls[controlName] = control

		let isFormValid = true

		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})

		setState({
			formControls,
			isFormValid,
		})
	}

	const renderInputs = () => {
		return Object.keys(state.formControls).map((controlName, index) => {
			const control = state.formControls[controlName]
			return (
				<Input
					key={controlName + index}
					type={control.type}
					value={control.value}
					valid={control.valid}
					touched={control.touched}
					label={control.label}
					shouldValidate={!!control.validation}
					errorMessage={control.errorMessage}
					onChange={e => onChangeHandler(e, controlName)}
				/>
			)
		})
	}

	return (
		<div className={classes.Auth}>
			<div>
				<h1>Authorization</h1>

				<form className={classes.AuthForm} onSubmit={submitHandler}>
					{renderInputs()}

					<Button
						type="success"
						onClick={loginHandler}
						disabled={!state.isFormValid}>
						Sign in
					</Button>
					<Button
						type="primary"
						onClick={registerHandler}
						disabled={!state.isFormValid}>
						Sign up
					</Button>
				</form>
			</div>
		</div>
	)
}

// class Auth extends Component {
// 	state = {
// 		isFormValid: false,
// 		formControls: {
// 			email: {
// 				value: "",
// 				type: "email",
// 				label: "Email",
// 				errorMessage: "Please, check email-field",
// 				valid: false,
// 				touched: false,
// 				validation: {
// 					required: true,
// 					email: true,
// 				},
// 			},
// 			password: {
// 				value: "",
// 				type: "password",
// 				label: "Password",
// 				errorMessage: "Please, check password-field",
// 				valid: false,
// 				touched: false,
// 				validation: {
// 					required: true,
// 					minLength: 6,
// 				},
// 			},
// 		},
// 	}

// 	loginHandler = () => {
// 		this.props.auth(
// 			this.state.formControls.email.value,
// 			this.state.formControls.password.value,
// 			true
// 		)
// 	}
// 	registerHandler = () => {
// 		this.props.auth(
// 			this.state.formControls.email.value,
// 			this.state.formControls.password.value,
// 			false
// 		)
// 	}
// 	submitHandler = e => {
// 		e.preventDefault()
// 	}

// 	validateControl(value, validation) {
// 		if (!validation) {
// 			return true
// 		}

// 		let isValid = true

// 		if (validation.required) {
// 			isValid = value.trim() !== "" && isValid
// 		}

// 		if (validation.email) {
// 			isValid = is.email(value) && isValid
// 		}

// 		if (validation.minLength) {
// 			isValid = value.length >= validation.minLength && isValid
// 		}

// 		return isValid
// 	}

// 	onChangeHandler = (e, controlName) => {
// 		const formControls = { ...this.state.formControls }
// 		const control = { ...formControls[controlName] }

// 		control.value = e.target.value
// 		control.touched = true
// 		control.valid = this.validateControl(control.value, control.validation)

// 		formControls[controlName] = control

// 		let isFormValid = true

// 		Object.keys(formControls).forEach(name => {
// 			isFormValid = formControls[name].valid && isFormValid
// 		})

// 		this.setState({
// 			formControls,
// 			isFormValid,
// 		})
// 	}

// 	renderInputs() {
// 		return Object.keys(this.state.formControls).map((controlName, index) => {
// 			const control = this.state.formControls[controlName]
// 			return (
// 				<Input
// 					key={controlName + index}
// 					type={control.type}
// 					value={control.value}
// 					valid={control.valid}
// 					touched={control.touched}
// 					label={control.label}
// 					shouldValidate={!!control.validation}
// 					errorMessage={control.errorMessage}
// 					onChange={e => this.onChangeHandler(e, controlName)}
// 				/>
// 			)
// 		})
// 	}

// 	render() {
// 		return (
// 			<div className={classes.Auth}>
// 				<div>
// 					<h1>Authorization</h1>

// 					<form className={classes.AuthForm} onSubmit={this.submitHandler}>
// 						{this.renderInputs()}

// 						<Button
// 							type="success"
// 							onClick={this.loginHandler}
// 							disabled={!this.state.isFormValid}>
// 							Sign in
// 						</Button>
// 						<Button
// 							type="primary"
// 							onClick={this.registerHandler}
// 							disabled={!this.state.isFormValid}>
// 							Sign up
// 						</Button>
// 					</form>
// 				</div>
// 			</div>
// 		)
// 	}
// }

function mapDispatchToProps(dispatch) {
	return {
		auth: (email, password, isLogin) =>
			dispatch(auth(email, password, isLogin)),
	}
}

export default connect(null, mapDispatchToProps)(Auth)
