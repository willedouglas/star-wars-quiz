import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from './Toast.component.jsx';
import actions from '../../../redux/actions';

const Toasts = ({ actions, toasts }) => {
	const { removeToast } = actions;

	return (
		<ul className="toasts">
			{toasts.map(toast => <Toast {...toast} key={toast.id} onRemove={id => removeToast(id)} />)}
		</ul>
	);
};

Toasts.propTypes = {
	actions: PropTypes.shape({ removeToast: PropTypes.func }),
	toasts: PropTypes.arrayOf(PropTypes.object)
};

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ removeToast: actions.removeToast }, dispatch) });

const mapStateToProps = state => ({ toasts: state.toasts });

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);