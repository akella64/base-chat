import { useMutation } from '@tanstack/react-query';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import type { User as UserModel } from '../../../types/models';

import { createUser } from '../../../services/apiService';

const schema = z.object({
	id: z.number(),
	username: z.string().min(1, { message: 'Введите логин' }),
	email: z.string().email(),
	password: z.string().min(1, { message: 'Введите пароль' }),
});

type Schema = z.infer<typeof schema>;

type SetUsers = React.Dispatch<React.SetStateAction<UserModel[]>>;

export default function CreateButton({ setUsers }: { setUsers: SetUsers }) {
	const [showModal, setShowModal] = useState(false);

	const mutation = useMutation({
		mutationFn: createUser,
		onSuccess: newUser => {
			setUsers(prevUsers => [newUser, ...prevUsers]);
			setShowModal(false);
			reset();
			toast.success('Пользователь создан!');
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

	const onSubmitForm: SubmitHandler<Schema> = data => mutation.mutate(data);

	return (
		<>
			{mutation.isError ? (
				<div>Ошибка при создании: {mutation.error.message}</div>
			) : null}

			<button
				className='rounded-full text-white bg-green-600 py-1 px-2'
				onClick={() => setShowModal(true)}
				disabled={mutation.isPending ? true : false}>
				{mutation.isPending ? 'создаем ...' : 'Создать челика'}
			</button>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Создание пользователя</Modal.Title>
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
							Создать
						</Button>
					</Form>
				</Modal.Body>
			</Modal>

			<Toaster position='top-center' reverseOrder={false} />
		</>
	);
}
