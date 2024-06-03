import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getUsers } from '../../services/apiService';
import { User as UserModel } from '../../types/models';

export default function GetUsers() {
	const { data, error, isLoading, isError } = useQuery<UserModel[]>({
		queryKey: ['users'],
		queryFn: getUsers,
	});

	useEffect(() => {
		if (data) console.log(data);
	}, [data]);

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Error: {error.message}</div>;

	return 123;
	/* 	return (
		<ul>
			{data?.map(item => (
				<li key={item.id}>
					Здесь находится {item.name} {item.last_name}
				</li>
			))}
		</ul>
	); */
}
