import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import toast, { Toaster } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import type { Tokens } from '../../types/responses';

import { loginAuth } from '../../services/auth/queries';
import { useState } from 'react';

const schema = z.object({
	username: z.string().min(1, { message: 'Введите логин' }),
	password: z.string().min(1, { message: 'Введите пароль' }),
});

type Schema = z.infer<typeof schema>;

const mutateLoginAuth = async (input: Schema) => {
	const { username, password } = input;
	return await loginAuth(username, password);
};

export default function Login() {
	const [rememberCheck, setRememberCheck] = useState(false);

	const mutation = useMutation({
		mutationFn: mutateLoginAuth,
		onSuccess: (data: Tokens) => {
			if (rememberCheck) {
				sessionStorage.removeItem('access_token');
				localStorage.setItem('access_token', data.access);
			} else {
				localStorage.removeItem('access_token');
				sessionStorage.setItem('access_token', data.access);
			}
			window.location.reload();
			reset();
		},
		onError: error => {
			toast.error(`Ошибка: ${error.message}`);
			console.error(error);
			reset();
		},
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

	const onSubmitForm: SubmitHandler<Schema> = data =>
		mutation.mutate({ username: data.username, password: data.password });

	return (
		<>
			<div className='w-full h-[100vh] flex flex-col'>
				<Form
					onSubmit={handleSubmit(onSubmitForm)}
					className='w-[30%] m-auto bg-slate-400 p-5 rounded-lg'>
					<Form.Group as={Col} className='mb-3'>
						<Form.Label column sm={2}>
							Логин<span className='text-[red]'>*</span>
						</Form.Label>
						<Col sm={12}>
							<Form.Control
								type='text'
								{...register('username', { required: true })}
							/>
							{errors.username?.message && (
								<p className='text-[red]'>{errors.root}</p>
							)}
						</Col>
					</Form.Group>

					<Form.Group as={Col} className='mb-3'>
						<Form.Label column sm={2}>
							Пароль<span className='text-[red]'>*</span>
						</Form.Label>
						<Col sm={12}>
							<Form.Control
								type='password'
								{...register('password', { required: true })}
							/>
							{errors.password && (
								<span className='text-[red]'>
									Поле обязательно для заполнения
								</span>
							)}
						</Col>
					</Form.Group>
					<Form.Group as={Row} className='mb-3'>
						<Col sm={12}>
							<Form.Check
								type='checkbox'
								onChange={e => setRememberCheck(e.target.checked)}
								label='Запомнить'
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className='mb-3'>
						<Col sm={12}>
							<Button className='w-full' type='submit'>
								Войти
							</Button>
						</Col>
					</Form.Group>
				</Form>
			</div>
			<Toaster position='top-center' reverseOrder={false} />
		</>
	);
}
