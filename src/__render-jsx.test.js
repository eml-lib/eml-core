import renderJsx from './render-jsx';
import createElement from './create-element';
import Fragment from './fragment';

describe('Element', () => {
	it('one level', () => {
		expect(
			renderJsx(
				<div>1</div>
			)
		).toMatchSnapshot()
	});

	it('two levels', () => {
		expect(
			renderJsx(
				<div>
					<div>1</div>
					<div>2</div>
				</div>
			)
		).toMatchSnapshot()
	});

	it('attributes', () => {
		expect(
			renderJsx(
				<table cellPadding={0} cellSpacing={0}>
					<tr>
						<td colSpan={2} rowSpan={3} />
					</tr>
				</table>
			)
		).toMatchSnapshot()
	});
});

describe('Arrays', () => {
	it('array in arrays', () => {
		expect(
			renderJsx(
				[[[[[[[[[1]]]]]]]]]
			)
		).toMatchSnapshot()
	});

	it('arrays in arrays', () => {
		expect(
			renderJsx(
				[1, [2], [[3]]]
			)
		).toMatchSnapshot()
	});
});

describe('Fragment', () => {
	it('flat', () => {
		expect(
			renderJsx(
				<Fragment>1</Fragment>
			)
		).toMatchSnapshot()
	});

	it('2 levels', () => {
		expect(
			renderJsx(
				<Fragment>
					<Fragment>1</Fragment>
					<Fragment>2</Fragment>
				</Fragment>
			)
		).toMatchSnapshot()
	});

	it('deep levels', () => {
		expect(
			renderJsx(
				<Fragment>
					<Fragment>
						<Fragment>1</Fragment>
						<Fragment>
							<Fragment>2</Fragment>
						</Fragment>
					</Fragment>
					<Fragment>
						<Fragment>3</Fragment>
						<Fragment>4</Fragment>
					</Fragment>
				</Fragment>
			)
		).toMatchSnapshot()
	});
});

describe('Mixed', () => {
	it('fragments with arrays', () => {
		expect(
			renderJsx(
				[
					<div>
						<Fragment>1</Fragment>
						<Fragment>2</Fragment>
					</div>,
					<div>
						<Fragment>3</Fragment>
						<Fragment>4</Fragment>
					</div>,
					<Fragment>
						[[5]]
					</Fragment>
				]
			)
		).toMatchSnapshot()
	});
});