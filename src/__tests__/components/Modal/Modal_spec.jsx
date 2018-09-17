/* global it, describe, expect */

import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from '../../../components/index';

describe('Modal Component Test', () => { 
	it('should render without throwing an error', () => {
		expect(shallow(<Modal />).find('.modal').exists()).toBe(true);
	});
	
	it('should render with a children', () => {
		expect(shallow(
			<Modal>
				<h1 className="children">{'Children'}</h1>
			</Modal>
		).find('.children').exists()).toBe(true);
	});

	it('should render without close button', () => {
		expect(shallow(
			<Modal showClose={false}>
				<h1 className="children">{'Children'}</h1>
			</Modal>
		).find('.close').exists()).toBe(false);
	});
});