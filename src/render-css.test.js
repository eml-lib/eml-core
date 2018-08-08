import renderCss from './render-css';

it('Smthng', () => {
	expect(
		renderCss(
			{
				'table': {
					border: '1px solid red'
				},
				'@media (max-width: 100px)': {
					'.a, .b, .c': {
						width: 100,
						height: 200
					},
					'.rule2': {
						height: '100px',
						backgroundColor: 'red',
						WebkitFlex: 1
					}
				}
			}
		)
	).toMatchSnapshot();
});