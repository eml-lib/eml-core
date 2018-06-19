import render from './render';
import createElement from './create-element';
import Fragment from './fragment';


const Component = props => [4, 5, 6];

console.log(render(
    <div>
        <Fragment>
            <Fragment>
                <Fragment>
                    1
                </Fragment>
                <Fragment>
                    2
                </Fragment>
            </Fragment>
            <Fragment>
                2
            </Fragment>
            <Component/>
        </Fragment>
    </div>
));