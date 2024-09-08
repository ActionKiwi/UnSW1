<script>
	import { pokedex } from '$lib/stores.js';
	import Modal from '$lib/Modal.svelte';
	import { generation1Moves } from '$lib/generationMoves.js';
	import { generation9Moves } from '$lib/generationMoves.js';
	export let stagedChanges = null;
	export let modalOpen3 = null;
	export let move1 = null;
	export let move2 = null;
	export let move3 = null;
	export let move4 = null;
	export let checkvarieties = null;
	export let generations = null;
	// import { generation1Moves } from '$lib/unbreedable.js';
	// import { generation2Moves } from '$lib/unbreedable.js';
	// import { generation3Moves } from '$lib/unbreedable.js';
	// import { generation4Moves } from '$lib/unbreedable.js';
	// import { generation5Moves } from '$lib/unbreedable.js';
	// import { generation6Moves } from '$lib/unbreedable.js';
	// import { generation7Moves } from '$lib/unbreedable.js';
	// import { generation8Moves } from '$lib/unbreedable.js';
	// import { generation9Moves } from '$lib/unbreedable.js';
	let modalScrollable3 = true;
	let errorModalOpen = false;
	let pokemonMovesByGeneration = null;
	let version_groupFromGeneration1 = ['red-blue', 'yellow'];
	let version_groupFromGeneration2 = ['gold-silver', 'crystal'];
	let version_groupFromGeneration3 = ['ruby-sapphire', 'emerald', 'firered-leafgreen'];
	let version_groupFromGeneration4 = ['diamond-pearl', 'platinum', 'heartgold-soulsilver'];
	let version_groupFromGeneration5 = ['black-white', 'black-2-white-2'];
	let version_groupFromGeneration6 = ['x-y', 'omega-ruby-alpha-sapphire'];
	let version_groupFromGeneration7 = ['sun-moon', 'ultra-sun-ultra-moon'];
	let version_groupFromGeneration8 = [
		'sword-shield',
		'the-isle-of-armor',
		'the-crown-tundra',
		'brilliant-diamond-and-shining-pearl'
	];
	let version_groupFromGeneration9 = ['scarlet-violet', 'the-teal-mask', 'the-indigo-disk'];

	function setVersionForMoves() {
		pokemonMovesByGeneration = null;
		if (generations != null) {
			if (generations.name == 'generation-i') {
				pokemonMovesByGeneration = version_groupFromGeneration1;
			}
			if (generations.name == 'generation-ii') {
				pokemonMovesByGeneration = version_groupFromGeneration2;
			}
			if (generations.name == 'generation-iii') {
				pokemonMovesByGeneration = version_groupFromGeneration3;
			}
			if (generations.name == 'generation-iv') {
				pokemonMovesByGeneration = version_groupFromGeneration4;
			}
			if (generations.name == 'generation-v') {
				pokemonMovesByGeneration = version_groupFromGeneration5;
			}
			if (generations.name == 'generation-vi') {
				pokemonMovesByGeneration = version_groupFromGeneration6;
			}
			if (generations.name == 'generation-vii') {
				pokemonMovesByGeneration = version_groupFromGeneration7;
			}
			if (generations.name == 'generation-viii') {
				pokemonMovesByGeneration = version_groupFromGeneration8;
			}
			if (generations.name == 'generation-ix') {
				pokemonMovesByGeneration = version_groupFromGeneration9;
			}
		}
	}

	function moveValid(self) {
		let moveIsValid = false;
		// console.log('total');
		self.flavor_text_entries.forEach((b) => {
			if (
				pokemonMovesByGeneration.includes(b.version_group.name) &&
				b.version_group.name != null &&
				b.version_group.name != undefined
			) {
				if (
					b.language.name == 'en' &&
					b.flavor_text !=
						'This move can’t be used.\nIt’s recommended that this move is forgotten.\nOnce forgotten, this move can’t be remembered.'
				) {
					// console.log(b);
					moveIsValid = true;
				}
			} else if (generations.name == 'generation-i') {
				if (generation1Moves.includes(self.name)) {
					moveIsValid = true;
				}
			} else if (generations.name == 'generation-ix') {
				if (generation9Moves.includes(self.name)) {
					moveIsValid = true;
				}
			}
		});
		if (moveIsValid == true) {
			return true;
		} else {
			return false;
		}
	}

	$: setVersionForMoves(generations);
</script>

<!-- MOVES HAVE BEEN RENAMED TO ACTIONS TO PREVENT CONFUSION WITH API ARRAY "MOVES" -->
<Modal open={modalOpen3} scrollable={modalScrollable3}>
	{#await $pokedex.getMovesList() then movesList}
		{#each movesList.results as actions}
			{#await $pokedex.getMoveByName(actions.name) then action}
				{#await $pokedex.getPokemon(checkvarieties.name) then movePokemon}
					<!-- {#if move.flavor_text_entries.version.includes(version_group.versions.find((i) => i.name)).name} -->
					{#if pokemonMovesByGeneration != null && pokemonMovesByGeneration != undefined}
						<!-- {console.log(
							action.flavor_text_entries.find((self) => self.version_group.name).version_group.name
						)} -->
						<!--  That line goes on line underneath in case this test fails  ->  && movePokemon.moves.filter((self) => self.version_group_details.filter( (vg) => pokemonMovesByGeneration.includes(vg.version_group.name) ).length > 0).length > 0 -->
						{#if action.learned_by_pokemon.find((n) => n.name == movePokemon.name) != undefined && action.flavor_text_entries != undefined}
							<!-- {console.log(
								'first',
								action.flavor_text_entries.some((z) => z.language.name == 'en')
							)}
							{console.log(
								'second',
								pokemonMovesByGeneration.includes(
									action.flavor_text_entries.find((y) => y.version_group && y.version_group.name)
										?.version_group.name
								)
							)} -->
							<!-- {console.log(
								action.flavor_text_entries.forEach((b) => {
									if (pokemonMovesByGeneration.includes(b.version_group.name)) {
										if (
											b.language.name == 'en' &&
											b.flavor_text !=
												'This move can’t be used.\nIt’s recommended that this move is forgotten.\nOnce forgotten, this move can’t be remembered.'
										) {
											return true;
										}
									}
								})
							)} -->

							<!-- {console.log(
									'move_version_group_details',
									movePokemon.moves,
									'move version groups:',
									Welcome to the workshop
									movePokemon.moves.filter((self) =>
										self.version_group_details.filter((vg) =>
											console.log(
												'name of move:',
												movePokemon.moves.filter((self) => self.move.name),
												'version groups:',
												vg.version_group.name,
												'versions in list',
												pokemonMovesByGeneration
											)
										)
									).length > 0

									// 'pokemon:',
									// movePokemon,
									// 'pokemon learnt moves list',
									// pokemonMovesByGeneration
								)} -->
							<p>{moveValid(action)}</p>
							{#if moveValid(action)}
								<button
									class="main-button"
									on:click={() => {
										// console.log('before', stagedChanges);
										stagedChanges = action;
										// console.log('after', stagedChanges);
										if (
											stagedChanges.name == move1.name ||
											stagedChanges.name == move2.name ||
											stagedChanges.name == move3.name ||
											stagedChanges.name == move4.name
										) {
											stagedChanges = null;
											modalOpen3 = false;
											errorModalOpen = true;
										} else {
											modalOpen3 = false;
										}
									}}
								>
									<div class="move-summary">
										<div class="move-title">
											{action.names[7].name}
										</div>
										<div class="move-desc">
											{action.flavor_text_entries.findLast(
												(i) =>
													i.language.name == 'en' &&
													i.flavor_text !=
														'This move can’t be used.\nIt’s recommended that this move is forgotten.\nOnce forgotten, this move can’t be remembered.'
											).flavor_text}
										</div>
									</div>
									<div class="move-stat">
										<div class="move-power">
											{#if action.power == null}
												<p>--</p>
											{:else}
												{action.power}
											{/if}
										</div>
										<div class="move-accuracy">
											{#if action.accuracy == null}
												<p>--</p>
											{:else}
												{action.accuracy}
											{/if}
										</div>
									</div>
									<div class="move-characteristics">
										<div class="move-attack-type">{action.damage_class.name}</div>
										<div class="move-power-points">{action.pp}</div>
									</div>
								</button>
								<!-- {(moveIsValid = false)} -->
							{/if}
						{/if}
					{/if}
				{/await}
			{/await}
		{/each}
	{/await}
</Modal>

<Modal open={errorModalOpen}>
	<p>This move has already been selected. Please select a different move.</p>
	<button
		on:click={() => {
			errorModalOpen = false;
		}}
	>
		Close</button
	>
</Modal>

<style>
</style>
