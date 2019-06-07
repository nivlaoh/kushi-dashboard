```jsx
import { withTooltip } from './index';
import Button from '../Button';


const BtnWithTooltip = withTooltip(() => (
  <Button type="primary">Hover Me</Button>
));
<BtnWithTooltip text="Tooltip text" />
```