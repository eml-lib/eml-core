import renderHtml from './render-html';
import renderJsx from './render-jsx';
import createElement from './create-element';
import Component from './component';
import Fragment from './fragment';

import { inspect } from 'util';
function log(object) {
    return console.log(inspect(object, {
        colors: true,
        depth: Infinity
    }));
}

const B = props => {
	return (
		<div className="b">
			1
		</div>
	);
};
B.css = {
	'.b': { border: '1px solid green' }
};
B.styles = () => ({
	b: 2
});


class A extends Component {
	render() {
		const { size } = this.props;

		return (
			<div className="block">
				{ [1, 2, 3].map(i => (
					<div className="block__body">
						<B />
					</div>
				)) }
			</div>
		);
	}

	static css = {
		'.block': {
			border: '1px solid red'
		}
	};

	static styles = ({ size }) => ({
		'@media (max-width: 600px)': {
			'.block_body': {
				width: 100 / size + 'px'
			}
		}
	});

	// static css = {
	// 	a: { border: '1px solid red' },
	// 	a_css: { left: 0, top: 0 }
	// };
    //
	// static styles = () => ({
	// 	a: 1
	// });
}

// const { css, styles, html } = ;
//
// log({
// 	css,
// 	styles,
// 	html
// });

it('Self-closing elements', () => {
	expect(
		renderJsx(
			<Fragment>1</Fragment>
		)
	).toEqual({});
});