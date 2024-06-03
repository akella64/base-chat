import { Link } from '@tanstack/react-router';

export default function Header() {
	return (
		<div className='p-2 flex gap-2'>
			<Link to='/' className='[&.active]:font-bold'>
				Home
			</Link>
		</div>
	);
}
