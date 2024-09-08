<script>
	let modalOpen = false;
	import Modal from '$lib/Modal.svelte';
	let teamModal1Open = false;
	let teamModal2Open = false;
</script>

<nav>
	<div id="left_navigation">
		<div class="navigation">
			<a data-sveltekit-reload href="/sim">Simulation</a>
		</div>
		<div class="navigation">
			<a data-sveltekit-reload href="/team">Teams</a>
		</div>
	</div>
	<div id="right_navigation">
		<div id="profile">
			<!-- <a href="/profile">Profile</a> -->
		</div>
	</div>
</nav>
<div id="container">
	<div id="sim_screen">
		<div id="sim_window">
			<p>
				sim screen window will contain 4 pokemon 'slots' where pos 1 and 2 of team 1 and 2 will be
				situated
			</p>
		</div>
		<div id="manualareachange_container">
			<button class="manual_area_change"> Set Weather </button>
			<button class="manual_area_change"> Set Terrain </button>
		</div>
	</div>
	<div id="treset">
		<div class="select_team">
			<button id="pop_up" on:click={(teamModal1Open = false)}>Select Team 1</button>
		</div>
		<div class="select_team">
			<button id="pop_up" on:click={teamModal2Open}>Select Team 2</button>
		</div>
		<button>Reset</button>
	</div>
</div>
<!-- Team select in sim modal -->
<Modal open={teamModal1Open}>
	<!-- {#if team != null}
		{#if team == teamBase}
			<div class="selectpokemonLeft">
				<button
					disabled
					class="select_pokemon_from_team"
					on:click={starting_position('team1', team, pokemon, index)}
				></button>
				<button
					disabled
					class="select_pokemon_from_team"
					on:click={starting_position('team1', team, pokemon, index)}
				></button>
				<button
					disabled
					class="select_pokemon_from_team"
					on:click={starting_position('team1', team, pokemon, index)}
				></button>
			</div>
			<div class="selectpokemonRight">
				<button
					disabled
					class="select_pokemon_from_team"
					on:click={starting_position('team1', team, pokemon, index)}
				></button>
				<button
					disabled
					class="select_pokemon_from_team"
					on:click={starting_position('team1', team, pokemon, index)}
				></button>
				<button
					disabled
					class="select_pokemon_from_team"
					on:click={starting_position('team1', team, pokemon, index)}
				></button>
			</div>
		{/if}
	{:else}{/if} -->
</Modal>

<Modal open={teamModal2Open}>
	<!-- <div class="selectpokemonLeft">
		<button disabled class="select_pokemon_from_team" on:click={starting_position(pokemon, index)}
		></button>
		<button disabled class="select_pokemon_from_team" on:click={starting_position(pokemon, index)}
		></button>
		<button disabled class="select_pokemon_from_team" on:click={starting_position(pokemon, index)}
		></button>
	</div>
	<div class="selectpokemonRight">
		<button disabled class="select_pokemon_from_team" on:click={starting_position(pokemon, index)}
		></button>
		<button disabled class="select_pokemon_from_team" on:click={starting_position(pokemon, index)}
		></button>
		<button disabled class="select_pokemon_from_team" on:click={starting_position(pokemon, index)}
		></button>
	</div> -->
</Modal>

<style>
	nav {
		display: flex;
		flex-direction: row;
	}

	#container {
		display: flex;
		flex-direction: column;
	}

	#sim_screen {
		display: flex;
		flex-direction: row;
	}

	#manualareachange_container {
		display: flex;
		flex-direction: column;
	}

	#treset {
		display: flex;
		flex-direction: row;
	}

	.select_team {
		display: flex;
		flex-direction: column;
	}

	.selectpokemonLeft {
		justify-content: space-evenly;
	}

	.selectpokemonRight {
		justify-content: space-evenly;
	}
</style>
