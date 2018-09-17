/* global it, describe, expect */

import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../components/index';

describe('Input Component Test', () => { 
	it('should render without throwing an error', () => {
		expect(shallow(<Input />).find('.form-input').exists()).toBe(true);
	});
});