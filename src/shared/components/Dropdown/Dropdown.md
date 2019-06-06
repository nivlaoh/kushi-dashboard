```jsx
import Dropdown from './Dropdown';
const options = [
	{ key: 'opt1', value: 'Option 1' },
	{ key: 'opt2', value: 'Option 2' }
];
<div>
	<button type="button" ref={(r) => { this.btn = r; }}>Trigger</button>
	<Dropdown options={options} target={this.btn} />
</div>
```