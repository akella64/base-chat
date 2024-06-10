import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import toast, { Toaster } from 'react-hot-toast';

import type { Tokens } from '../../types/responses';

import { loginAuth } from '../../services/auth/queries';

type UserLogin = {
	username: string;
	password: string;
};

const mutateLoginAuth = async (input: UserLogin) => {
	const { username, password } = input;
	return await loginAuth(username, password);
};

export default function Login() {
	const mutation = useMutation({
		mutationFn: mutateLoginAuth,
		onSuccess: (data: Tokens) => {
			sessionStorage.setItem('access_token', data.access);
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
	} = useForm<UserLogin>();

	const onSubmitForm: SubmitHandler<UserLogin> = data =>
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
							{errors.username && (
								<span className='text-[red]'>
									Поле обязательно для заполнения
								</span>
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
						<Col sm={{ span: 10, offset: 2 }}>
							<Form.Check label='Запомнить' />
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
