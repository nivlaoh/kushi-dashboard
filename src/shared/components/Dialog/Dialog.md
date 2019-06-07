Alert Dialog
```jsx
import Button from '../Button';
import Dialog from './Dialog';

const openDialog = () => {
	setState({
		open: true,
	});
};
const closeDialog = () => {
	setState({
		open: false,
	});
};

<div>
	<Button type="primary" onClick={openDialog}>Open Alert</Button>
	<Dialog mode="alert" text="Hello world" show={state.open} onConfirm={closeDialog} />
</div>
```
Confirm Dialog
```jsx
import Button from '../Button';
import Dialog from './Dialog';

const openDialog = () => {
	setState({
		open: true,
	});
};
const closeDialog = () => {
	setState({
		open: false,
	});
};

<div>
	<Button type="primary" onClick={openDialog}>Open Confirm</Button>
	<Dialog mode="confirm" text="Hello world" show={state.open} onConfirm={closeDialog} onDismiss={closeDialog} />
</div>
```
Prompt Dialog
```jsx
import Button from '../Button';
import Dialog from './Dialog';

const openDialog = () => {
	setState({
		open: true,
	});
};
const closeDialog = () => {
	setState({
		open: false,
	});
};

<div>
	<Button type="primary" onClick={openDialog}>Open Prompt</Button>
	<Dialog mode="prompt" defaultPrompt="Answer here" text="Hello world" show={state.open} onConfirm={closeDialog} onDismiss={closeDialog} />
</div>
```