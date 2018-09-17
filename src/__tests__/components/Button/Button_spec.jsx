/* global it, describe, expect */

import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '../../../components/index';

describe('Button Component Test', () => { 
	it('should render without throwing an error', () => {
		expect(shallow(<Button />).find('.button').exists()).toBe(true);
	});

	it('should render with a children', () => {
		expect(shallow(
			<Button>
				{'Children'}
			</Button>
		).find('.button').exists()).toBe(true);
	});
});