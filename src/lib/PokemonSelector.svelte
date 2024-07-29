<script>
	import { pokedex } from '$lib/stores.js';
	import Modal from '$lib/Modal.svelte';
	import { unbreedable } from '$lib/unbreedable.js';
	import { maleOnly } from '$lib/unbreedable.js';
	import { femaleOnly } from '$lib/unbreedable.js';
	import { onMount } from 'svelte';
	let modalOpen1 = false;
	let modalOpen2 = false;
	let savedPokemon = null;
	// export let value = null;
	let selection = null;
	let formSelection = null;
	let pokedexNo = null;
	// savedPokemonInfo acts as my 'cosmetic' information such as name and pokedex id for the creation of the pokemon (front-end)
	// This is because savedPokemon is the back-end charactaristics such as stats and forms. By using $pokedex.getPSBY() (see below)
	// instead of $pokedex.getP() I remove the other forms such as wheezing-galar - the only instance is wheezing.
	let savedPokemonInfo = null;
	let preview = null;
	let varieties = null;
	let hpStat = null;
	let attackStat = null;
	let defenseStat = null;
	let s_attackStat = null;
	let s_defenseStat = null;
	let speedStat = null;
	let availableEVs = null;
	let healthEV = null;
	let attackEV = null;
	let defenseEV = null;
	let s_attackEV = null;
	let s_defenseEV = null;
	let speedEV = null;
	let evsCountValue = 0;
	let disableEVInput = false;
	let healthEVUpdate = false;
	let attackEVUpdate = false;
	let defenseEVUpdate = false;
	let s_attackEVUpdate = false;
	let s_defenseEVUpdate = false;
	let speedEVUpdate = false;

	async function getPokemonData() {
		if (selection) {
			formSelection = selection;
			savedPokemonInfo = await $pokedex.getPokemonSpeciesByName(selection.name);
			savedPokemon = await $pokedex.getPokemon(selection.name);
			let nationalDex = savedPokemonInfo.pokedex_numbers[0];
			pokedexNo = nationalDex.entry_number;
			preview = savedPokemon.sprites.front_default;
			varieties = savedPokemonInfo.varieties;
			hpStat = savedPokemon.stats[0].base_stat;
			attackStat = savedPokemon.stats[1].base_stat;
			defenseStat = savedPokemon.stats[2].base_stat;
			s_attackStat = savedPokemon.stats[3].base_stat;
			s_defenseStat = savedPokemon.stats[4].base_stat;
			speedStat = savedPokemon.stats[4].base_stat;
		}
	}

	function updateStatByEVIV() {
		if (healthEV > 255) {
			healthEV = 255;
		}

		if (attackEV > 255) {
			attackEV = 255;
		}

		if (defenseEV > 255) {
			defenseEV = 255;
		}

		if (s_attackEV > 255) {
			s_attackEV = 255;
		}

		if (s_defenseEV > 255) {
			s_defenseEV = 255;
		}

		if (speedEV > 255) {
			speedEV = 255;
		}

		disableEVInput = false;
		evsCountValue = 0;
		evsCountValue += healthEV;
		evsCountValue += attackEV;
		evsCountValue += defenseEV;
		evsCountValue += s_attackEV;
		evsCountValue += s_defenseEV;
		evsCountValue += speedEV;

		availableEVs = 510 - evsCountValue;
		console.log(availableEVs);

		if (evsCountValue > 510) {
			evsCountValue = 510;
		}
		if (availableEVs <= 0) {
			availableEVs = 0;
			if (healthEVUpdate == true) {
				healthEV = 510 - attackEV - defenseEV - s_attackEV - s_defenseEV - speedEV;
				healthEVUpdate = false;
			}
			if (attackEVUpdate == true) {
				attackEV = 510 - healthEV - defenseEV - s_attackEV - s_defenseEV - speedEV;
				attackEVUpdate = false;
			}
			if (defenseEVUpdate == true) {
				defenseEV = 510 - healthEV - attackEV - s_attackEV - s_defenseEV - speedEV;
				defenseEVUpdate = false;
			}
			if (s_attackEVUpdate == true) {
				s_attackEV = 510 - healthEV - attackEV - defenseEV - s_defenseEV - speedEV;
				s_attackEVUpdate = false;
			}
			if (s_defenseEVUpdate == true) {
				s_defenseEV = 510 - healthEV - attackEV - defenseEV - s_attackEV - speedEV;
				s_defenseEVUpdate = false;
			}
			if (speedEVUpdate == true) {
				speedEV = 510 - healthEV - attackEV - defenseEV - s_attackEV - s_defenseEV;
				speedEVUpdate = false;
			}
			evsCountValue = healthEV + attackEV + defenseEV + s_attackEV + s_defenseEV + speedEV;
			availableEVs = 510 - evsCountValue;
		}

		healthEVUpdate = false;
		attackEVUpdate = false;
		defenseEVUpdate = false;
		s_attackEVUpdate = false;
		s_defenseEVUpdate = false;
		speedEVUpdate = false;

		// code for IV portion of calculation
	}
	$: getPokemonData(selection);
	$: updateStatByEVIV(healthEV || attackEV || defenseEV || s_attackEV || s_defenseEV || speedEV);
	// $pokedex.getPokemonsList().then((r) => console.log(r));
</script>

<button class="add_to_team" on:click={() => (modalOpen1 = true)}></button>

<Modal open={modalOpen1}>
	<!-- Stuff on flow charts (list of pokemon) -->
	<div id="rowdivforselect">
		<div id="coldivforoptions">
			<div id="selectPokemon">
				<select bind:value={selection}>
					{#await $pokedex.getPokemonSpeciesList() then pokemonList}
						{#each pokemonList.results as pokemon}
							<option value={pokemon}>{pokemon.name}</option>
						{/each}
					{/await}
				</select>
			</div>
			<div id="changeForm">
				{#if varieties != null}
					{#if savedPokemonInfo.varieties.length > 1}
						{#each varieties as variety}
							<button
								on:click={async () => {
									savedPokemon = await $pokedex.getPokemon(variety.pokemon.name);
									preview = savedPokemon.sprites.front_default;
									hpStat = savedPokemon.stats[0].base_stat;
									attackStat = savedPokemon.stats[1].base_stat;
									defenseStat = savedPokemon.stats[2].base_stat;
									s_attackStat = savedPokemon.stats[3].base_stat;
									s_defenseStat = savedPokemon.stats[4].base_stat;
									speedStat = savedPokemon.stats[4].base_stat;
								}}>{variety.pokemon.name}</button
							>
						{/each}
					{/if}
				{/if}
			</div>
		</div>
		<div id="pokemonPreview">
			{#if preview == null}
				<img
					src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'}
					alt="bulbasaur preview"
				/>
			{:else}
				<img src={preview} alt="{savedPokemonInfo.name} preview" />
			{/if}
		</div>
	</div>
	<div id="bottomRow">
		<button
			class="closeModal"
			on:click={() => {
				modalOpen1 = false;
			}}
		>
		</button>
		<button
			class="confirmSelection"
			on:click={() => {
				modalOpen1 = false;
				modalOpen2 = true;
			}}
		>
		</button>
	</div>
</Modal>

<Modal open={modalOpen2}>
	<div class="titles">
		<p>Name:</p>
		<p>Pokedex No.</p>
		<p>Gender</p>
		<div class="description">
			<p id="pokemonName">{savedPokemon.name}</p>
			<p id="pokemonNumber">{pokedexNo}</p>
			<select id="changegender">
				<option
					selected={unbreedable.includes(savedPokemon.name)}
					disabled={!unbreedable.includes(savedPokemon.name)}
				>
				</option>
				<option
					selected={maleOnly.includes(savedPokemon.name)}
					disabled={unbreedable.includes(savedPokemon.name) ||
						femaleOnly.includes(savedPokemon.name)}>♂</option
				>
				<option
					selected={femaleOnly.includes(savedPokemon.name)}
					disabled={unbreedable.includes(savedPokemon.name) || maleOnly.includes(savedPokemon.name)}
					>♀</option
				>
			</select>
		</div>
	</div>
	<div class="stat_table_left">
		<div id="hp">
			<p>HP:{hpStat}</p>
		</div>
		<div id="attack"></div>
		<p>Attack:{attackStat}</p>
		<div id="defense">
			<p>Defense:{defenseStat}</p>
		</div>
		<div id="s-attack">
			<p>Special Attack:{s_attackStat}</p>
		</div>
		<div id="s-defense">
			<p>Special Defense:{s_defenseStat}</p>
		</div>
		<div id="speed">
			<p>Speed:{speedStat}</p>
		</div>
		<div id="available_effort_values">
			<p>Effort Values available: {availableEVs}</p>
		</div>
	</div>
	<div id="stat_table_right">
		<div class="inputEVs" id="healthEV">
			<p>EVs:</p>
			<input
				type="number"
				min="0"
				max="255"
				disabled={disableEVInput == true}
				bind:value={healthEV}
				on:input={() => {
					console.log('health Update');
					healthEVUpdate = true;
				}}
			/>
		</div>
		<div class="inputEVs" id="attackEV">
			<p>EVs:</p>
			<input
				type="number"
				min="0"
				max="255"
				disabled={disableEVInput == true}
				bind:value={attackEV}
				on:input={() => {
					console.log('attack Update');
					attackEVUpdate = true;
				}}
			/>
		</div>
		<div class="inputEVs" id="defenseEV">
			<p>EVs:</p>
			<input
				type="number"
				min="0"
				max="255"
				disabled={disableEVInput == true}
				bind:value={defenseEV}
				on:input={() => {
					console.log('defense Update');
					defenseEVUpdate = true;
				}}
			/>
		</div>
		<div class="inputEVs" id="s_attackEV">
			<p>EVs:</p>
			<input
				type="number"
				min="0"
				max="255"
				disabled={disableEVInput == true}
				bind:value={s_attackEV}
				on:input={() => {
					console.log('special attack Update');
					s_attackEVUpdate = true;
				}}
			/>
		</div>
		<div class="inputEVs" id="s_defenseEV">
			<p>EVs:</p>
			<input
				type="number"
				min="0"
				max="255"
				disabled={disableEVInput == true}
				bind:value={s_defenseEV}
				on:input={() => {
					console.log('special defense Update');
					s_defenseEVUpdate = true;
				}}
			/>
		</div>
		<div class="inputEVs" id="speedEV">
			<p>EVs:</p>
			<input
				type="number"
				min="0"
				max="255"
				disabled={disableEVInput == true}
				bind:value={speedEV}
				on:input={() => {
					console.log('speed Update');
					speedEVUpdate = true;
				}}
			/>
		</div>
		<div id="input_individual_values"></div>
		<p class="editIVs">IVs:</p>
	</div></Modal
>

<!-- 
Sample for predecessor to function updateEV in case it fails miserably
 on:input={() => {
					speedEV > 255 ? (speedEV = 255) : speedEV;
					// speedEV > evsCount ? (speedEV = 510 - evsCount) : speedEV;
				}}
-->

<style>
</style>
