/* global it, describe, expect */

import React from 'react';
import { shallow } from 'enzyme';
import { Container } from '../../../components/index';

describe('Container Component Test', () => { 
	it('should render without throwing an error', () => {
		expect(shallow(
			<Container width={50}>
				<h1>{'Child'}</h1>
			</Container>
		).find('.container').exists()).toBe(true);
	});

	it('should render with a children', () => {
		expect(shallow(
			<Container width={50}>
				<h1 className="children">{'Children'}</h1>
			</Container>
		).find('.children').exists()).toBe(true);
	});
});