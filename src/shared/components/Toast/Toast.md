```jsx
import Toast from './Toast';
import Button from '../Button';
let show = false;
const showToast = (e) => {
	show = true;
};

<div>
	<Button type="primary" onClick={showToast}>Show Toast</Button>
	<Toast message="Hello" show={show} />
</div>
```