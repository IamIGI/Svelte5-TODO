<script lang="ts">
	interface Props {
		addTask: (newTask: string) => void;
	}
	let { addTask }: Props = $props();

	let newTask = $state('');

	const formSubmitted = (e: SubmitEvent) => {
		e.preventDefault();
		addTask(newTask);
		newTask = '';
	};
</script>

<form onsubmit={formSubmitted}>
	<label for="task">
		Task
		<input id="task" type="text" name="newTask" bind:value={newTask} />
	</label>
	<div class="button-container">
		<button>Add</button>
	</div>
</form>

<style lang="scss">
	form {
		margin-bottom: 1rem;
	}
	.button-container {
		display: flex;
		justify-content: flex-end;
	}
</style>
