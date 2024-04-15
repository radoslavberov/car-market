import { User } from '@/types/index';

export interface Auth {
	user: User | null;
	token: string | null;
}

export interface LoginInput {
	email: string;
	password: string;
}

export interface RegisterInput {
	name: string;
	email: string;
	password: string;
	phone_number: string;
	password_confirmation: string;
	terms: boolean;
}
export interface ChangePasswordInput {
	old_password: string;
	password: string;
	password_confirmation: string;
}

export interface EditUserInput {
	name: string;
	email: string;
}
