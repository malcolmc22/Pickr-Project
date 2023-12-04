import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<nav>
			<div>
				<NavLink exact to="/">Home</NavLink>
			</div>
			{isLoaded && !sessionUser && (
				<div className="auth-container">
				<div className="nav-buttons-container">
					<div>
						<NavLink exact to="/login">
							<button className="nav-login-button">Log In</button>
						</NavLink>
					</div>
					<div>
						<NavLink exact to="/signup">
							<button className="nav-signup-button">Sign Up</button>
						</NavLink>
					</div>
				</div>
			</div>
			)}
			{isLoaded && sessionUser && (
				<div>
				<div>

				</div>
				<div>
					<button> Log Out </button>
					{/* <ProfileButton user={sessionUser} isLoaded={isLoaded} /> */}
				</div>
				</div>
			)}
		</nav>
	);
}

export default Navigation;
