import { flatten } from './utils/array';

export default (type, props, ...children) => ({
    _isElement: true,
    type,
    props: {
        ...props,
        children: children ? flatten(children) : []
    }
});