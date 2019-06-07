```jsx
import Dropdown from './Dropdown';
import Button from '../Button';

const options = [
	{ key: 'opt1', value: 'Option 1' },
	{ key: 'opt2', value: 'Option 2' }
];
<div>
	<Button type="primary" ref={(r) => { this.btn = r; }}>Trigger</Button>
	<Dropdown options={options} target={this.btn} />
</div>
```