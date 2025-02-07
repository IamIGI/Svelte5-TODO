<script lang="ts">
	import type { Task } from '$lib/types';
	import { fade } from 'svelte/transition';

	interface Props {
		tasks: Task[];
		toggleDone: (task: Task) => void;
		removeTask: (id: string) => void;
	}

	let { tasks, toggleDone, removeTask }: Props = $props();
</script>

<section>
	{#each tasks as task}
		<article class="task" transition:fade>
			<label for={`title_${task.id}`}>
				<input
					id={`title_${task.id}`}
					checked={task.done}
					onchange={() => toggleDone(task)}
					type="checkbox"
				/>
				<span class:done={task.done}> {task.title} </span>
			</label>
			<button class="outline" onclick={() => removeTask(task.id)}>remove</button>
		</article>
	{/each}
</section>

<style lang="scss">
	.task {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.done {
		text-decoration: line-through;
	}
</style>
