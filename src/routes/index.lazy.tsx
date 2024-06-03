import { createLazyFileRoute } from '@tanstack/react-router';
import GetUsers from '../components/getUsers';

export const Route = createLazyFileRoute('/')({
	component: () => <GetUsers />,
});
