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
<div>
	<Button type="primary" onClick={showLoader}>Show loader</Button>
	<Loader activate={state.show} timeout={5000} />
</div>
```