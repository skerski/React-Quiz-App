import { useEffect } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { logout } from "../../store/actions/auth"

const Logout = props => {
	useEffect(() => {
		props.logout()
		// eslint-disable-next-line
	}, [])

	return <Redirect to={"/"} />
}

function mapDispatchToProps(dispatch) {
	return {
		logout: () => dispatch(logout()),
	}
}

export default connect(null, mapDispatchToProps)(Logout)
