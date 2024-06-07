import { createLazyFileRoute } from '@tanstack/react-router';

import { useAuth } from '../hooks/useAuth';
import UsersTable from '../components/UsersTable';
import Login from '../components/Login';

const AuthComponent = () => {
	const { isAuth, loading } = useAuth();

	if (loading) {
		return <div>Загрузка ...</div>;
	}

	return isAuth ? <UsersTable /> : <Login />;
};

export const Route = createLazyFileRoute('/')({
	component: AuthComponent,
});
