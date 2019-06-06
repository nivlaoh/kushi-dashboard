```jsx
import TextBox from './TextBox';
let val = '';
const onChange = (e) => {
	console.log('here', e.target.value);
	val = e.target.value;
};
<TextBox placeholder="Type here..." onChange={onChange} value={val} />
```