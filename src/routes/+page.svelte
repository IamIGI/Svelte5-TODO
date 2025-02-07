<script lang="ts">
	import TasksForm from '$lib/components/tasks-form.svelte';
	import TasksList from '$lib/components/tasks-list.svelte';
	import { Filter, type Task } from '$lib/types';

	let tasks = $state<Task[]>([]);
	let currentFilter = $state<Filter>(Filter.All);
	let totalDone = $derived(tasks.reduce((total, task) => total + Number(task.done), 0));
	let filteredTasks = $derived.by(() => {
		switch (currentFilter) {
			case 'all': {
				return tasks;
			}
			case 'done': {
				return tasks.filter((t) => t.done);
			}
			case 'todo': {
				return tasks.filter((t) => !t.done);
			}
			default:
				return tasks;
		}
	});

	const addTask = (newTask: string) => {
		tasks.push({
			id: crypto.randomUUID(),
			title: newTask,
			done: false
		});
	};
	const toggleDone = (task: Task) => (task.done = !task.done);
	const removeTask = (id: string) => (tasks = tasks.filter((t) => t.id !== id));
</script>

{#snippet filterButton(filter: Filter)}
	<button
		class="outline"
		class:primary={currentFilter === filter}
		onclick={() => (currentFilter = filter)}>{filter.toUpperCase()}</button
	>
{/snippet}

<main>
	<h1>Task App</h1>
	<TasksForm {addTask} />
	{#if tasks.length > 0}
		<p>Tasks completed: {totalDone} / {tasks.length}</p>
		<div class="button-container">
			{#each Object.values(Filter) as buttonType}
				{@render filterButton(buttonType as Filter)}
			{/each}
		</div>
	{:else}
		<p>Add a task to get started</p>
	{/if}
	<TasksList tasks={filteredTasks} {toggleDone} {removeTask} />
</main>

<style>
	main {
		margin: 1rem auto;
		max-width: 800px;
	}
	.button-container {
		display: flex;
		justify-content: end;
		margin: 1rem;
		gap: 0.5rem;
	}
	.primary {
		background-color: rgb(43, 109, 136);
		color: #fff;
	}
</style>
