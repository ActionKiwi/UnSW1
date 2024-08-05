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
	let evsCountValue = null;
	let healthEVUpdate = false;
	let attackEVUpdate = false;
	let defenseEVUpdate = false;
	let s_attackEVUpdate = false;
	let s_defenseEVUpdate = false;
	let speedEVUpdate = false;
	let healthIV = null;
	let attackIV = null;
	let defenseIV = null;
	let s_attackIV = null;
	let s_defenseIV = null;
	let speedIV = null;
	let multiplierEV = null;
	let level = 50;
	let statToAttack_EV = null;
	let statToDefense_EV = null;
	let statToSpeed_EV = null;
	let statToSAttack_EV = null;
	let statToSDefense_EV = null;
	let statToHealth_EV = null;
	let statToAttack_IV = null;
	let statToDefense_IV = null;
	let statToSpeed_IV = null;
	let statToSAttack_IV = null;
	let statToSDefense_IV = null;
	let statToHealth_IV = null;
	let attacknatureValue = 1;
	let defensenatureValue = 1;
	let sattacknatureValue = 1;
	let sdefensenatureValue = 1;
	let speednatureValue = 1;
	let selectNature = null;
	let selectedNature = null;

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
			speedStat = savedPokemon.stats[5].base_stat;
		}
	}

	async function checkNatures() {
		selectedNature = await $pokedex.getNatureByName(selectNature);
		attacknatureValue = 1;
		defensenatureValue = 1;
		sattacknatureValue = 1;
		sdefensenatureValue = 1;
		speednatureValue = 1;
		// console.log(selectedNature);
		if (selectNature != null) {
			if (selectedNature.name == 'lonely') {
				attacknatureValue = 1.1;
				defensenatureValue = 0.9;
				sattacknatureValue = 1;
				sdefensenatureValue = 1;
				speednatureValue = 1;
			}

			if (selectedNature.name == 'adamant') {
				attacknatureValue = 1.1;
				sattacknatureValue = 0.9;
				defensenatureValue = 1;
				sdefensenatureValue = 1;
				speednatureValue = 1;
			}

			if (selectedNature.name == 'naughty') {
				attacknatureValue = 1.1;
				sdefensenatureValue = 0.9;
				defensenatureValue = 1;
				sattacknatureValue = 1;
				speednatureValue = 1;
			}

			if (selectedNature.name == 'brave') {
				attacknatureValue = 1.1;
				speednatureValue = 0.9;
				sattacknatureValue = 1;
				sdefensenatureValue = 1;
				defensenatureValue = 1;
			}

			if (selectedNature.name == 'bold') {
				defensenatureValue = 1.1;
				attacknatureValue = 0.9;
				sattacknatureValue = 1;
				sdefensenatureValue = 1;
				speednatureValue = 1;
			}

			if (selectedNature.name == 'impish') {
				defensenatureValue = 1.1;
				attacknatureValue = 1;
				sattacknatureValue = 0.9;
				sdefensenatureValue = 1;
				speednatureValue = 1;
			}

			if (selectedNature.name == 'lax') {
				defensenatureValue = 1.1;
				attacknatureValue = 1;
				sattacknatureValue = 1;
				sdefensenatureValue = 0.9;
				speednatureValue = 1;
			}

			if (selectedNature.name == 'relaxed') {
				defensenatureValue = 1.1;
				attacknatureValue = 1;
				sattacknatureValue = 1;
				sdefensenatureValue = 1;
				speednatureValue = 0.9;
			}

			if (selectedNature.name == 'modest') {
				defensenatureValue = 1;
				attacknatureValue = 0.9;
				sattacknatureValue = 1.1;
				sdefensenatureValue = 1;
				speednatureValue = 1;
			}

			if (selectedNature.name == 'mild') {
				defensenatureValue = 0.9;
				attacknatureValue = 1;
				sattacknatureValue = 1.1;
				sdefensenatureValue = 1;
				speednatureValue = 1;
			}

			if (selectedNature.name == 'rash') {
				defensenatureValue = 1;
				attacknatureValue = 1;
				sattacknatureValue = 1.1;
				sdefensenatureValue = 0.9;
				speednatureValue = 1;
			}

			if (selectedNature.name == 'quiet') {
				defensenatureValue = 1;
				attacknatureValue = 1;
				sattacknatureValue = 1.1;
				sdefensenatureValue = 1;
				speednatureValue = 0.9;
			}

			if (selectedNature.name == 'calm') {
				defensenatureValue = 1;
				attacknatureValue = 0.9;
				sattacknatureValue = 1;
				sdefensenatureValue = 1.1;
				speednatureValue = 1;
			}

			if (selectedNature.name == 'gentle') {
				defensenatureValue = 0.9;
				attacknatureValue = 1;
				sattacknatureValue = 1;
				sdefensenatureValue = 1.1;
				speednatureValue = 1;
			}

			if (selectedNature.name == 'careful') {
				defensenatureValue = 1;
				attacknatureValue = 1;
				sattacknatureValue = 0.9;
				sdefensenatureValue = 1.1;
				speednatureValue = 1;
			}

			if (selectedNature.name == 'sassy') {
				defensenatureValue = 1;
				attacknatureValue = 1;
				sattacknatureValue = 1;
				sdefensenatureValue = 1.1;
				speednatureValue = 0.9;
			}

			if (selectedNature.name == 'timid') {
				defensenatureValue = 1;
				attacknatureValue = 0.9;
				sattacknatureValue = 1;
				sdefensenatureValue = 1;
				speednatureValue = 1.1;
			}

			if (selectedNature.name == 'hasty') {
				defensenatureValue = 0.9;
				attacknatureValue = 1;
				sattacknatureValue = 1;
				sdefensenatureValue = 1;
				speednatureValue = 1.1;
			}

			if (selectedNature.name == 'jolly') {
				defensenatureValue = 1;
				attacknatureValue = 1;
				sattacknatureValue = 0.9;
				sdefensenatureValue = 1;
				speednatureValue = 1.1;
			}

			if (selectedNature.name == 'naive') {
				defensenatureValue = 1;
				attacknatureValue = 1;
				sattacknatureValue = 1;
				sdefensenatureValue = 0.9;
				speednatureValue = 1.1;
			}

			if (
				selectedNature.name == 'hardy' ||
				selectedNature.name == 'docile' ||
				selectedNature.name == 'serious' ||
				selectedNature.name == 'bashful' ||
				selectedNature.name == 'quirky'
			) {
				attacknatureValue = 1;
				defensenatureValue = 1;
				sattacknatureValue = 1;
				sdefensenatureValue = 1;
				speednatureValue = 1;
			}
		}

		console.log('selectedNature', selectedNature);
		console.log('natureValue for attack', attacknatureValue);
		console.log('natureValue for defense', defensenatureValue);
		console.log('natureValue for special attack', sattacknatureValue);
		console.log('natureValue for special defense', sdefensenatureValue);
		console.log('natureValue for speed', speednatureValue);
	}

	function updateStatByEVIV() {
		if (savedPokemon != null) {
			hpStat = savedPokemon.stats[0].base_stat;
			attackStat = savedPokemon.stats[1].base_stat;
			defenseStat = savedPokemon.stats[2].base_stat;
			s_attackStat = savedPokemon.stats[3].base_stat;
			s_defenseStat = savedPokemon.stats[4].base_stat;
			speedStat = savedPokemon.stats[5].base_stat;
		}

		// console.log(healthEV);

		// code for EV portion of calculation

		if (healthEV > 252) {
			healthEV = 252;
		}

		if (healthEV < 0) {
			healthEV = 0;
		}

		if (attackEV > 252) {
			attackEV = 252;
		}

		if (attackEV < 0) {
			attackEV = 0;
		}

		if (defenseEV > 252) {
			defenseEV = 252;
		}

		if (defenseEV < 0) {
			defenseEV = 0;
		}

		if (s_attackEV > 252) {
			s_attackEV = 252;
		}

		if (s_attackEV < 0) {
			s_attackEV = 0;
		}

		if (s_defenseEV > 252) {
			s_defenseEV = 252;
		}

		if (s_defenseEV < 0) {
			s_defenseEV = 0;
		}

		if (speedEV > 252) {
			speedEV = 252;
		}

		if (speedEV < 0) {
			speedEV = 0;
		}

		evsCountValue = 0;
		evsCountValue += healthEV;
		evsCountValue += attackEV;
		evsCountValue += defenseEV;
		evsCountValue += s_attackEV;
		evsCountValue += s_defenseEV;
		evsCountValue += speedEV;

		availableEVs = 510 - evsCountValue;

		// console.log(healthEV);

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
		if (healthIV > 31) {
			healthIV = 31;
		}

		if (healthIV < 0) {
			healthIV = 0;
		}

		if (attackIV > 31) {
			attackIV = 31;
		}

		if (attackIV < 0) {
			attackIV = 0;
		}

		if (defenseIV > 31) {
			defenseIV = 31;
		}

		if (defenseIV < 0) {
			defenseIV = 0;
		}

		if (s_attackIV > 31) {
			s_attackIV = 31;
		}

		if (s_attackIV < 0) {
			s_attackIV = 0;
		}

		if (s_defenseIV > 31) {
			s_defenseIV = 31;
		}

		if (s_defenseIV < 0) {
			s_defenseIV = 0;
		}

		if (speedIV > 31) {
			speedIV = 31;
		}

		if (speedIV < 0) {
			speedIV = 0;
		}

		// formulas from https://bulbapedia.bulbagarden.net/wiki/Stat
		hpStat = Math.floor(((2 * hpStat + healthEV / 4 + statToHealth_IV) * level) / 100 + level + 10);
		attackStat = Math.floor(
			(((2 * attackStat + attackEV / 4 + statToAttack_IV) * level) / 100 + 5) * attacknatureValue
		);
		defenseStat = Math.floor(
			(((2 * defenseStat + defenseEV / 4 + statToDefense_IV) * level) / 100 + 5) *
				defensenatureValue
		);
		s_attackStat = Math.floor(
			(((2 * s_attackStat + s_attackEV / 4 + statToSAttack_IV) * level) / 100 + 5) *
				sattacknatureValue
		);
		s_defenseStat = Math.floor(
			(((2 * s_defenseStat + s_defenseEV / 4 + statToSDefense_IV) * level) / 100 + 5) *
				sdefensenatureValue
		);
		speedStat = Math.floor(
			(((2 * speedStat + speedEV / 4 + statToSpeed_IV) * level) / 100 + 5) * speednatureValue
		);
	}
	$: getPokemonData(selection);
	$: checkNatures(selectNature);
	$: updateStatByEVIV(
		healthEV ||
			attackEV ||
			defenseEV ||
			s_attackEV ||
			s_defenseEV ||
			speedEV ||
			healthIV ||
			attackIV ||
			defenseIV ||
			s_attackIV ||
			s_defenseIV ||
			speedIV ||
			level ||
			attacknatureValue ||
			defensenatureValue ||
			sattacknatureValue ||
			sdefensenatureValue ||
			speednatureValue
	);
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
						<option selected="selected" disabled="disabled"></option>
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
				<p>Please select a Pokemon</p>
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
		<div id="name">
			<p>Name:</p>
			<p>{savedPokemon.name}</p>
		</div>
		<div id="pokedex_number_of_pokemon">
			<p>Pokedex No.</p>
			<p>{pokedexNo}</p>
		</div>
		<div id="gender">
			<p>Gender</p>
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
	<div id="stat_table">
		<div id="stat_table_left">
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
		</div>
		<div id="stat_table_right">
			<div id="input_effort_values">
				<div class="inputEVs" id="healthEV">
					<p>EVs:</p>
					<input
						type="number"
						min="0"
						max="255"
						bind:value={healthEV}
						on:input={() => {
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
						bind:value={attackEV}
						on:input={() => {
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
						bind:value={defenseEV}
						on:input={() => {
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
						bind:value={s_attackEV}
						on:input={() => {
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
						bind:value={s_defenseEV}
						on:input={() => {
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
						bind:value={speedEV}
						on:input={() => {
							speedEVUpdate = true;
						}}
					/>
				</div>
			</div>
			<div id="input_individual_values">
				<div class="IV">
					<p class="editIVs">IVs:</p>
					<input class="in_IVBox" type="number" min="0" max="31" bind:value={healthIV} />
					<p class="in_IVBox">/31</p>
				</div>
				<div class="IV">
					<p class="editIVs">IVs:</p>
					<input class="in_IVBox" type="number" min="0" max="31" bind:value={attackIV} />
					<p class="in_IVBox">/31</p>
				</div>
				<div class="IV">
					<p class="editIVs">IVs:</p>
					<input class="in_IVBox" type="number" min="0" max="31" bind:value={defenseIV} />
					<p class="in_IVBox">/31</p>
				</div>
				<div class="IV">
					<p class="editIVs">IVs:</p>
					<input class="in_IVBox" type="number" min="0" max="31" bind:value={s_attackIV} />
					<p class="in_IVBox">/31</p>
				</div>
				<div class="IV">
					<p class="editIVs">IVs:</p>
					<input class="in_IVBox" type="number" min="0" max="31" bind:value={s_defenseIV} />
					<p class="in_IVBox">/31</p>
				</div>
				<div class="IV">
					<p class="editIVs">IVs:</p>
					<input class="in_IVBox" type="number" min="0" max="31" bind:value={speedIV} />
					<p class="in_IVBox">/31</p>
				</div>
			</div>
		</div>
	</div>
	<div id="EV_count_and_nature">
		<p>Effort Values available: {availableEVs}</p>
		<select bind:value={selectNature}>
			<option selected="selected"></option>
			{#await $pokedex.getNaturesList() then natureList}
				{#each natureList.results as nature}
					<option value={nature.name}>{nature.name}</option>
				{/each}
			{/await}
		</select>
	</div>
	<!-- For now will just have togglable buttons but potentially could add an input for this instead -->
	<div id="setLevel">
		<button
			disabled={level == 50 ? true : false}
			on:click={() => {
				level = 50;
			}}>Level 50</button
		>
		<button
			disabled={level == 100 ? true : false}
			on:click={() => {
				level = 100;
			}}>Level 100</button
		>
	</div>
</Modal>

<style>
	.titles {
		display: flex;
		flex-direction: row;
	}

	#name {
		display: flex;
		flex-direction: column;
	}

	#pokedex_number_of_pokemon {
		display: flex;
		flex-direction: column;
	}

	#gender {
		display: flex;
		flex-direction: column;
	}

	#stat_table {
		display: flex;
		flex-direction: row;
	}

	#stat_table_left {
		display: flex;
		flex-direction: column;
	}

	#stat_table_right {
		display: flex;
		flex-direction: row;
	}

	#input_effort_values {
		display: flex;
		flex-direction: column;
	}

	#input_individual_values {
		display: flex;
		flex-direction: column;
	}

	.inputEVs {
		display: flex;
		flex-direction: row;
	}

	.IV {
		display: flex;
		flex-direction: row;
	}

	#EV_count_and_nature {
		display: flex;
		flex-direction: row;
	}
</style>
