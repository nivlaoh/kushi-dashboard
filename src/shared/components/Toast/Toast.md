```jsx
import Toast from './Toast';
let show = false;
const showToast = (e) => {
	show = true;
};

<div>
	<button type="button" onClick={showToast}>Click to show Toast</button>
	<Toast message="Hello" show={show} />
</div>
```