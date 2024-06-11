import { useMutation } from '@tanstack/react-query';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import type { User as UserModel } from '../../../types/models';

import { updateUser } from '../../../services/user/queries';

const schema = z.object({
	id: z.number(),
	username: z.string().min(1, { message: 'Введите логин' }),
	email: z.string().email(),
	password: z.string().min(1, { message: 'Введите пароль' }),
});

type Schema = z.infer<typeof schema>;

type SetUsers = React.Dispatch<React.SetStateAction<UserModel[]>>;

const mutateUpdateUser = async (input: {
	userId: number;
	userFields: UserModel;
}): Promise<UserModel> => {
	const { userId, userFields } = input;
	return await updateUser(userId, userFields);
};

export default function ChangeButton({
	setUsers,
	user,
}: {
	setUsers: SetUsers;
	user: UserModel;
}) {
	const [showModal, setShowModal] = useState(false);

	const mutation = useMutation({
		mutationFn: mutateUpdateUser,
		onSuccess: newUser => {
			setUsers(prevUsers =>
				prevUsers.map(user => (user.id === newUser.id ? newUser : user)),
			);
			setShowModal(false);
			reset();
			toast.success('Пользователь изменен!');
		},
		onError: error => {
			toast.error(`Ошибка: ${error.message}`);
			console.error(error.message);
			setShowModal(false);
			reset();
		},
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Schema>({
		resolver: zodResolver(schema),
	});

	const onSubmitForm: SubmitHandler<Schema> = data => {
		const userData = { ...data, id: user.id };
		mutation.mutate({ userId: user.id, userFields: userData });
	};

	return (
		<>
			<button
				className='rounded-full bg-blue-500 text-white px-3 py-1'
				onClick={() => setShowModal(true)}
				disabled={mutation.isPending ? true : false}>
				{mutation.isPending ? 'изменяем ...' : 'Изменить челика'}
			</button>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Изменение пользователя</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmitForm)}>
						<Form.Group className='mb-3'>
							<Form.Label>
								Имя<span className='text-[red]'>*</span>
							</Form.Label>
							<Form.Control
								type='text'
								placeholder='Введите имя'
								defaultValue={user.username}
								{...register('username', { required: true })}
							/>
							{errors.username?.message && (
								<p className='text-[red]'>{errors.username?.message}</p>
							)}
						</Form.Group>

						<Form.Group className='mb-3'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								placeholder='Введите почту'
								defaultValue={user.email}
								{...register('email')}
							/>
						</Form.Group>

						<Form.Group className='mb-3'>
							<Form.Label>
								Пароль<span className='text-[red]'>*</span>
							</Form.Label>
							<Form.Control
								type='password'
								placeholder='Введите пароль'
								{...register('password', { required: true })}
							/>
							{errors.password?.message && (
								<p className='text-[red]'>{errors.password?.message}</p>
							)}
						</Form.Group>

						<Button className='w-full' variant='primary' type='submit'>
							Изменить
						</Button>
					</Form>
				</Modal.Body>
			</Modal>

			<Toaster position='top-center' reverseOrder={false} />
		</>
	);
}
