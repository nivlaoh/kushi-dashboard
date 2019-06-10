Dismissible Toast
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
Auto-hide Toast
```jsx
import Toast from './Toast';
import Button from '../Button';
const showToast = (e) => {
	setState({ show: true });
};

<div>
	<Button type="primary" onClick={showToast}>Show Toast</Button>
	<Toast message="Hello" show={state.show} dismissible={false} />
</div>
```
Success Toast
```jsx
import Toast from './Toast';
import Button from '../Button';

const showToast = (e) => {
	setState({ show: true });
};

<div>
	<Button type="primary" onClick={showToast}>Show Toast</Button>
	<Toast message="Hello" show={state.show} dismissible={false} type="success" />
</div>
```
Info Toast
```jsx
import Toast from './Toast';
import Button from '../Button';
const showToast = (e) => {
	setState({ show: true });
};

<div>
	<Button type="primary" onClick={showToast}>Show Toast</Button>
	<Toast message="Hello" show={state.show} dismissible={false} type="info" />
</div>
```
Error Toast
```jsx
import Toast from './Toast';
import Button from '../Button';
const showToast = (e) => {
	setState({ show: true });
};

<div>
	<Button type="primary" onClick={showToast}>Show Toast</Button>
	<Toast message="Hello" show={state.show} dismissible={false} type="error" />
</div>
```