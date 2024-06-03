import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getUsers } from '../../services/apiService';
import { User as UserModel } from '../../types/models';

export default function GetUsers() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const queryClient = useQueryClient();

	const { data, error, isLoading, isError } = useQuery<UserModel[]>({
		queryKey: ['users'],
		queryFn: getUsers,
	});

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Error: {error.message}</div>;

	return (
		<ul>
			{data?.map(item => (
				<li key={item.id}>
					Здесь находится {item.name} {item.last_name}
				</li>
			))}
		</ul>
	);
}
