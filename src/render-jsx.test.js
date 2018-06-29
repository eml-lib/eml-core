import renderJsx from './render-jsx';
import createElement from './create-element';
import Fragment from './fragment';

const el = (tagName, attrs, children = []) => ({
	tagName,
	attrs: attrs ? attrs : {},
	children
});

describe('Element', () => {
	it('one level', () => {
		expect(
			renderJsx(
				<div>1</div>
			)
		).toEqual(
			{
				tagName: 'div',
				attrs: {},
				children: ['1'],
			}
		)
	});

	it('two levels', () => {
		expect(
			renderJsx(
				<div>
					<div>1</div>
					<div>2</div>
				</div>
			)
		).toEqual(
			el('div', null, [
				el('div', null, ['1']),
				el('div', null, ['2'])
			])
		)
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
		).toEqual(
			el('table', {
				cellpadding: 0,
				cellspacing: 0
			}, [
				el('tr', null, [
					el('td', {
						colspan: 2,
						rowspan: 3
					})
				])
			])
		)
	});
});

describe('Arrays', () => {
	it('array in arrays', () => {
		expect(
			renderJsx(
				[[[[[[[[[1]]]]]]]]]
			)
		).toEqual(
			['1']
		)
	});

	it('arrays in arrays', () => {
		expect(
			renderJsx(
				[1, [2], [[3]]]
			)
		).toEqual(
			['1', '2', '3']
		)
	});
});

describe('Fragment', () => {
	it('flat', () => {
		expect(
			renderJsx(
				<Fragment>1</Fragment>
			)
		).toEqual(
			['1']
		)
	});

	it('2 levels', () => {
		expect(
			renderJsx(
				<Fragment>
					<Fragment>1</Fragment>
					<Fragment>2</Fragment>
				</Fragment>
			)
		).toEqual(
			['1', '2']
		)
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
		).toEqual(
			['1', '2', '3', '4']
		)
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
		).toEqual(
			[
				el('div', null, [
					'1', '2'
				]),
				el('div', null, [
					'3', '4'
				]),
				'[[5]]'
			]
		)
	});
});