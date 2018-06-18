import render from '.';
import createElement from './create-element';
import Fragment from './fragment';

describe('Depth', () => {
	it('zero', () => {
		const rendered = render(
			<Fragment>
                <Fragment>
                    123
                </Fragment>
			</Fragment>
		);

		expect(
			rendered
		).toEqual(
			[1, [2, [3]]]
		)
	});
});