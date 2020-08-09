
import React from 'react';
import styled from 'styled-components';
import { createTheme } from './theme';
import "./index.scss"
const disabledTheme = {
	color: 'rgba(0,0,0,0.25)',
	cursor: 'not-allowed',
	background: '#f5f5f5',
	borderColor: '#d9d9d9',
	hover: {
		background: '#f5f5f5',
	},
}

const StyledButton = styled.button`
	${(props) => props.theme}
	&:hover {
		${(props) => props.theme?.hover ?? ''}
	}
	&:focus {
		${(props) => props.theme?.focus ?? ''}
	}
`;
function Button(props) {
	const {
		theme = {},
		onClick,
		isLoader,
		disabled,
		children,
	} = props;
	let Theme = createTheme(disabled ? disabledTheme : theme);

	return (
		<StyledButton {...props} theme={Theme} onClick={!disabled ? () => onClick() : isLoader ? () => console.log("no") : () => onClick()}>
			{isLoader ? <div className='spinner'></div> : children}
		</StyledButton>
	);
}


Button.defaultProps = {
	onClick: () => console.log("log"),
	isLoader: false,
	disabled: false,
};

export default Button;
