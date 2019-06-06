Dropdown mode
```jsx
import MultiSelect from './MultiSelect';
const options = [
	{ key: 'opt1', value: 'Option 1' },
	{ key: 'opt2', value: 'Option 2' }
];
<MultiSelect placeholder="Select an option" options={options} />
```
Dropdown without text search
```jsx
import MultiSelect from './MultiSelect';
const options = [
	{ key: 'opt1', value: 'Option 1' },
	{ key: 'opt2', value: 'Option 2' }
];
<MultiSelect placeholder="Select an option" options={options} searchable={false} />
```
MultiSelect mode
```jsx
import MultiSelect from './MultiSelect';
const options = [
	{ key: 'opt1', value: 'Option 1' },
	{ key: 'opt2', value: 'Option 2' },
	{ key: 'opt3', value: 'Option 3' },
	{ key: 'opt4', value: 'Option 4' },
	{ key: 'opt5', value: 'Option 5' },
	{ key: 'opt6', value: 'Option 6' }
];
<MultiSelect placeholder="Select an option" options={options} multi />
```