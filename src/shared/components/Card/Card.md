Card with text content only
```jsx
import Card from './Card';
import CardBody from './CardBody';
<Card>
	<CardBody>
		Card text goes here...
	</CardBody>
</Card>
```
Card with title
```jsx
import Card from './Card';
import CardTitle from './CardTitle';
import CardBody from './CardBody';
<Card>
	<CardTitle>Title here</CardTitle>
	<CardBody>
		Card text goes here...
	</CardBody>
</Card>
```
Card with footer
```jsx
import Card from './Card';
import CardTitle from './CardTitle';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import Button from '../Button';
<Card>
	<CardTitle>Title here</CardTitle>
	<CardBody>
		Card text goes here...
	</CardBody>
	<CardFooter>
		<Button type="primary">Ok</Button>
	</CardFooter>
</Card>
```