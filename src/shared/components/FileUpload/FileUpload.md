FileUpload start state
```jsx
import FileUpload from './FileUpload';
<FileUpload />
```
FileUpload with uploaded files and custom title and description
```jsx
import FileUpload from './FileUpload';
const files = [
	{ ref: { name: 'file1.jpg', type: 'image/jpeg', size: 123456 }, status: 'UPLOADED' },
	{ ref: { name: 'file2.pdf', type: 'application/pdf', size: 1223456 }, status: 'UPLOADED' }
];
<FileUpload title="Upload Documents" description="Please drag and drop your files here" fileList={files} />
```