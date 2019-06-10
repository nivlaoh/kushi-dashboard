```jsx
import Loader from './Loader';
import Button from '../Button';

initialState = {
	show: false,
};
const showLoader = () => {
	setState({
		show: true,
	});
};
const stopLoading = () => {
	setState({
		show: false,
	});
};
<div>
	<Button type="primary" onClick={showLoader}>Show loader</Button>
	<Loader activate={state.show} timeout={5000} timeoutFn={stopLoading} />
</div>
```