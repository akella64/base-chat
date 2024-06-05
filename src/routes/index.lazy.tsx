import { createLazyFileRoute } from '@tanstack/react-router';
import UsersTable from '../components/UsersTable';

export const Route = createLazyFileRoute('/')({
	component: () => (
		<>
			<UsersTable />
		</>
	),
});
