import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import type { ApiResponse } from '../../types/responses';
import type { User } from '../../types/models';

import { getUsers } from '../../services/user/queries';
import CreateButton from './CreateButton/index';
import ChangeButton from './ChangeButton';
import DeleteButton from './DeleteButton';

export default function UsersTable() {
	const [users, setUsers] = useState<User[]>([]);

	const { data, error, isLoading, isError } = useQuery<ApiResponse>({
		queryKey: ['users'],
		queryFn: getUsers,
	});

	useEffect(() => {
		if (data) setUsers(data?.results);
	}, [data]);

	if (isLoading) return <div>Загрузка...</div>;

	if (isError) return <div>Ошибка: {error.message}</div>;

	return (
		<>
			<div className='w-[40%] flex m-10 border-black border-[1px] rounded-md p-5 flex-wrap gap-3'>
				{users.map(item => (
					<div
						className='w-full bg-slate-200 px-5 py-3 rounded-md flex gap-3'
						key={item.id}>
						<div>
							Имя: <b>{item.username}</b>
						</div>
						<ChangeButton user={item} setUsers={setUsers} />
						<DeleteButton userId={item.id} setUsers={setUsers} />
					</div>
				))}
			</div>

			<CreateButton setUsers={setUsers} />
		</>
	);
}
