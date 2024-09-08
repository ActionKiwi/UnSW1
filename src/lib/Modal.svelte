<script>
	export let open = false;
	export let scrollable = false;
</script>

{#if open == true}
	{#if scrollable == false}
		<div class="modal">
			<div class="modal-content">
				<slot />
			</div>
		</div>
	{/if}
	{#if scrollable == true}
		<div class="modal-scrollable">
			<div class="modal-content-scrollable">
				<slot />
			</div>
		</div>
	{/if}
{/if}

<style>
	.modal {
		position: fixed;
		z-index: 1000;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.4);
	}

	.modal-content {
		background-color: #ffffff;
		margin: 3em;
		padding: 1em;
		border: 1px solid #888;
		width: fit-content;
	}

	.modal-scrollable {
		position: fixed;
		z-index: 1000;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.4);
	}

	.modal-content-scrollable {
		background-color: #ffffff;
		margin: 3em;
		padding: 1em;
		border: 1px solid #888;
		width: fit-content;
		height: 90vh;
		overflow-y: auto;
	}
</style>
