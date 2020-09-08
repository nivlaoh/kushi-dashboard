Normal text message
```jsx
import Alert from './Alert';
<Alert message="Text message" />
```
Error text message
```jsx
import Alert from './Alert';
<Alert message="Error message" type="error" />
```
Dismissible error text message
```jsx
import Alert from './Alert';
<Alert message="Error message" type="error" onDismiss={() => {}} />
```