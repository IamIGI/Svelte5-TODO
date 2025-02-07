export enum Filter {
	All = 'all',
	Todo = 'todo',
	Done = 'done'
}

export type Task = {
	id: string;
	title: string;
	done: boolean;
};
