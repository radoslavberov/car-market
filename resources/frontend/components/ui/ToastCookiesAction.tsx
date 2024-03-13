import { Button } from '@/components/ui/Button';
import { ToastAction } from './Toast';

export function ToastCookiesAction() {
	const handleOkClick = () => {
		// Set the flag in localStorage
		localStorage.setItem('cookiesAccepted', 'true');
	};

	return (
		<div>
			<Button onClick={() => handleOkClick()} size="sm" variant="default" asChild>
				<ToastAction altText="OK">OK</ToastAction>
			</Button>
		</div>
	);
}
