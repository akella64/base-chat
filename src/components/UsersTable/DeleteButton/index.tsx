import { useMutation } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';

import type { User as UserModel } from '../../../types/models';
import { deleteUser } from '../../../services/apiService';

type SetUsers = React.Dispatch<React.SetStateAction<UserModel[]>>;

export default function Delete({
	userId,
	setUsers,
}: {
	userId: number;
	setUsers: SetUsers;
}) {
	const mutation = useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			setUsers(users => users.filter(item => item.id !== userId));
			toast.success('Пользователь удален!');
		},
		onError: error => {
			toast.error(`Ошибка: ${error.message}`);
			console.error(error.message);
		},
	});

	return (
		<>
			<button
				onClick={() => mutation.mutate(userId)}
				className='tex-white rounded-full bg-red-400 px-3 py-1'
				disabled={mutation.isPending ? true : false}>
				{mutation.isPending ? 'удаляем ...' : 'Удалить челика'}
			</button>
			<Toaster position='top-center' reverseOrder={false} />
		</>
	);
}
