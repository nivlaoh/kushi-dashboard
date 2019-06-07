```jsx
import Toast from './Toast';
import Button from '../Button';
const showToast = (e) => {
	setState({ show: true });
};

<div>
	<Button type="primary" onClick={showToast}>Show Toast</Button>
	<Toast message="Hello" show={state.show} />
</div>
```