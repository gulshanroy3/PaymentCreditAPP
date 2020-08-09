import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { getImagePath } from "../../util/common"
const ModalWrapper = Styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	z-index: 30;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
	background-color: #00000073;
	.db-modal-wrapper {
		overflow: auto;
		position: relative;
		// margin-top: 10%;
		background-color: #ffffff;
		border-radius: 8px;
		position:relative;
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
		.modal-main-block {
			width: 100%;
			height: 100%;
		}
	}
	.close-icon {
		width: 32px;
    height: 32px;
    position: absolute;
    right: 0%;
    z-index: 100;
	top: 0%;
	cursor: pointer;
}
`;
function Modal(props) {
	const {
		modalContainerClass,
		modalWrapperClass,
		modalMainClass,
		children,
		onClose,
		hasCloseIcon
	} = props;
	return (
		<ModalWrapper className={`db-modal-container ${modalContainerClass}`}>

			<div className={`db-modal-wrapper ${modalWrapperClass}`}>
			{hasCloseIcon && <img src={getImagePath("/cross.png")} alt="" class='close-icon' onClick={onClose} />}
				<div className={`modal-main-block ${modalMainClass}`}>

					{children}</div>

			</div>
			<div onClick={onClose} className={`modal-back ${props.class}`} />
		</ModalWrapper>
	);
}

Modal.defaultProps = {
	modalWrapperClass: 'predefined-wrapper',
	modalMainClass: 'predefined-main',
	closeIconblock: 'predefined-close-block',
	closeIcon: 'predefined-close-icon',
	modalContainerClass: '',
	hasCloseIcon:false
};

Modal.propTypes = {
	modalWrapperClass: PropTypes.string,
	imagePath: PropTypes.string,
	onClose: PropTypes.func,
};

export default (Modal);
