/* global it, describe, expect */

import React from 'react';
import { shallow } from 'enzyme';
import { Card } from '../../../components/index';

describe('Card Component Test', () => { 
	it('should render without throwing an error', () => {
		expect(shallow(<Card />).find('.card').exists()).toBe(true);
	});

	it('should render with a children', () => {
		expect(shallow(
			<Card>
				<h1 className="children">{'Children'}</h1>
				<h1 className="children">{'Children'}</h1>
			</Card>
		).find('.children').exists()).toBe(true);
	});
});