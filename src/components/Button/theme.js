const commonTheme = {
	boxSizing: 'border-box',
	display: 'inline-flex',
	position: 'relative',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	minWidth: '120px',
	minHeight: '32px',
	textTransform: 'none',
	letterSpacing: '0.3px',
	fontSize: '14px',
	fontWeight: 500,
	whiteSpace: 'nowrap',
	textAlign: 'center',
	color: '#FFFFFF',
	opacity: 1,
	cursor: 'pointer',
	background: '#4b4fcc',
	borderWidth: '1px',
	borderStyle: 'solid',
	borderColor: 'transparent',
	borderRadius: '16px',
	padding: '12px 38px',
	margin: '0',
	boxShadow: '0 2px 0 rgba(0,0,0,0.015)',
	transition: 'all .3s cubic-bezier(0.645,0.045,0.355,1)',
	focus: {
		outline: 'none',
	},
	hover: {
		background: '#1519B6',
		transition: 'background 0.6s ease',
	},
};
export const createTheme = (customTheme) => {
	return Object.assign({}, commonTheme, customTheme);
};


