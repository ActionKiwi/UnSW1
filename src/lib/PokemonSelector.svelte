<script>
	import { pokedex } from '$lib/stores.js';
	import Modal from '$lib/Modal.svelte';
	import { unbreedable } from '$lib/unbreedable.js';
	import { maleOnly } from '$lib/unbreedable.js';
	import { femaleOnly } from '$lib/unbreedable.js';
	import { onMount } from 'svelte';
	import MoveSelector from '$lib/MoveSelector.svelte';

	export let pokemon = [];
	export let teamPosition = null;

	let modalOpen1 = false;
	let modalOpen2 = false;
	let modalOpen3 = {};
	let modalScrollable1 = false;
	let modalScrollable2 = false;
	let savedPokemon = null;
	let selection = null;
	let stagedChanges = {};
	let checkvarieties = {};
	// export let value = null;
	let formSelection = null;
	let pokedexNo = null;
	// savedPokemonInfo acts as my 'cosmetic' information such as name and pokedex id for the creation of the pokemon (front-end)
	// This is because savedPokemon is the back-end charactaristics such as stats and forms. By using $pokedex.getPSBY() (see below)
	// instead of $pokedex.getP() I remove the other forms such as wheezing-galar - the only instance is wheezing.
	let savedPokemonInfo = null;
	let nationalDex = null;
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
	let level = 50;
	let attacknatureValue = 1;
	let defensenatureValue = 1;
	let sattacknatureValue = 1;
	let sdefensenatureValue = 1;
	let speednatureValue = 1;
	let selectNature = null;
	let selectedNature = null;
	let moveSlot = null;
	let moveChanging = null;
	let move1 = {};
	let move2 = {};
	let move3 = {};
	let move4 = {};
	let errorMessage = false;
	let generationOpen = false;
	let generations = {};
	let version_group = {};
	let availablePokemon = [];
	let pokedexKanto = null;
	let pokedexJohto = null;
	let pokedexHoenn = null;
	let pokedexSinnoh = null;
	let pokedexBD_SP = null;
	let pokedexHisui = null;
	let pokedexUnova = null;
	let pokedexKalos_central = null;
	let pokedexKalos_coastal = null;
	let pokedexKalos_mountain = null;
	let pokedexAlola = null;
	let pokedexGalar = null;
	let pokedexIsleOfArmor = null;
	let pokedexCrownTundra = null;
	let pokedexPaldea = null;
	let pokedexKitakami = null;
	let pokedexBlueberry = null;
	let hideListItem = false;
	let searchForPokemon = '';
	// add list of pokemon in dlcs available

	async function getPokemonData() {
		if (selection) {
			formSelection = selection;
			savedPokemonInfo = await $pokedex.getPokemonSpeciesByName(selection.name);
			savedPokemon = await $pokedex.getPokemon(selection.name);
			if (selection.name != undefined) {
				nationalDex = savedPokemonInfo.pokedex_numbers[0];
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
	}

	async function checkNatures() {
		if (selectNature != null || selectNature != undefined) {
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

			// console.log('selectedNature', selectedNature);
			// console.log('natureValue for attack', attacknatureValue);
			// console.log('natureValue for defense', defensenatureValue);
			// console.log('natureValue for special attack', sattacknatureValue);
			// console.log('natureValue for special defense', sdefensenatureValue);
			// console.log('natureValue for speed', speednatureValue);
		}
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
		hpStat = Math.floor(((2 * hpStat + healthEV / 4 + healthIV) * level) / 100 + level + 10);
		attackStat = Math.floor(
			(((2 * attackStat + attackEV / 4 + attackIV) * level) / 100 + 5) * attacknatureValue
		);
		defenseStat = Math.floor(
			(((2 * defenseStat + defenseEV / 4 + defenseIV) * level) / 100 + 5) * defensenatureValue
		);
		s_attackStat = Math.floor(
			(((2 * s_attackStat + s_attackEV / 4 + s_attackIV) * level) / 100 + 5) * sattacknatureValue
		);
		s_defenseStat = Math.floor(
			(((2 * s_defenseStat + s_defenseEV / 4 + s_defenseIV) * level) / 100 + 5) *
				sdefensenatureValue
		);
		speedStat = Math.floor(
			(((2 * speedStat + speedEV / 4 + speedIV) * level) / 100 + 5) * speednatureValue
		);
	}

	function changeMove() {
		if (stagedChanges != null) {
			if (moveSlot == 1) {
				move1 = stagedChanges;
			} else if (moveSlot == 2) {
				move2 = stagedChanges;
			} else if (moveSlot == 3) {
				move3 = stagedChanges;
			} else if (moveSlot == 4) {
				move4 = stagedChanges;
			}

			moveSlot = 0;
		}
	}

	function clearPokemon() {
		selection = null;
		savedPokemon = null;
		savedPokemonInfo = null;
		formSelection = null;
		nationalDex = null;
		pokedexNo = null;
		preview = null;
		varieties = null;
		hpStat = null;
		attackStat = null;
		defenseStat = null;
		s_attackStat = null;
		s_defenseStat = null;
		speedStat = null;
		selectedNature = null;
		selectNature = null;
		move1 = {};
		move2 = {};
		move3 = {};
		move4 = {};
	}

	function savePokemon() {
		pokemon.saved = structuredClone(savedPokemon);
		pokemon.info = structuredClone(savedPokemonInfo);
		pokemon.nationalDex = savedPokemonInfo.pokedex_numbers[0];
		pokemon.pokedexNo = nationalDex.entry_number;
		pokemon.preview = savedPokemon.sprites.front_default;
		pokemon.varieties = varieties;
		pokemon.hpStat = hpStat;
		pokemon.attackStat = attackStat;
		pokemon.defenseStat = defenseStat;
		pokemon.s_attackStat = s_attackStat;
		pokemon.s_defenseStat = s_defenseStat;
		pokemon.speedStat = speedStat;
		pokemon.displayName = pokemon.info.names.find((i) => i.language.name == 'en').name;
		if (pokemon.saved.name.includes('mega')) {
			pokemon.displayName = 'Mega ' + pokemon.displayName;
			if (pokemon.saved.name.includes('-x')) {
				pokemon.displayName = 'Mega ' + pokemon.displayName + ' X';
			}
			if (pokemon.saved.name.includes('-y')) {
				pokemon.displayName = 'Mega ' + pokemon.displayName + ' Y';
			} else if (
				pokemon.saved.name.includes('origin') &&
				pokemon.saved.name.includes('kyogre' || 'groudon')
			)
				pokemon.displayName = 'Origin Form ' + pokemon.displayName;
		} else if (pokemon.saved.name.includes('shaymin-sky')) {
			pokemon.displayName = pokemon.displayName + ' (Sky)';
		} else if (pokemon.saved.name.includes('primal')) {
			pokemon.displayName = 'Primal ' + pokemon.displayName;
		} else if (pokemon.saved.name.includes('50')) {
			pokemon.displayName = pokemon.displayName + ' (50%)';
		} else if (pokemon.saved.name.includes('10')) {
			pokemon.displayName = pokemon.displayName + ' (10%)';
		} else if (pokemon.saved.name.includes('kyurem-black')) {
			pokemon.displayName = pokemon.displayName + ' (Black)';
		} else if (pokemon.saved.name.includes('kyurem-white')) {
			pokemon.displayName = pokemon.displayName + ' (White)';
		} else if (pokemon.saved.name.includes('alola')) {
			pokemon.displayName = 'Alolan ' + pokemon.displayName;
		} else if (pokemon.saved.name.includes('galar')) {
			pokemon.displayName = 'Galarian ' + pokemon.displayName;
		} else if (pokemon.saved.name.includes('hisui')) {
			pokemon.displayName = 'Hisuian ' + pokemon.displayName;
		} else if (pokemon.saved.name.includes('paldea')) {
			pokemon.displayName = 'Paldean ' + pokemon.displayName;
			if (pokemon.saved.name.includes('paldea-combat')) {
				pokemon.displayName = 'Paldean ' + pokemon.displayName + ' (Combat)';
			} else if (pokemon.saved.name.includes('paldea-blaze')) {
				pokemon.displayName = 'Paldean ' + pokemon.displayName + ' (Blaze)';
			} else if (pokemon.saved.name.includes('paldea-aqua')) {
				pokemon.displayName = 'Paldean ' + pokemon.displayName + ' (Aqua)';
			}
		} else {
			pokemon.displayName = pokemon.displayName = pokemon.info.names.find(
				(i) => i.language.name == 'en'
			).name;
		}

		pokemon.nature = selectedNature;
		pokemon.defensenatureValue = defensenatureValue;
		pokemon.attacknatureValue = attacknatureValue;
		pokemon.sdefensenatureValue = sdefensenatureValue;
		pokemon.sattacknatureValue = sattacknatureValue;
		pokemon.speednatureValue = speednatureValue;
		pokemon.move1 = move1;
		pokemon.move2 = move2;
		pokemon.move3 = move3;
		pokemon.move4 = move4;
		clearPokemon();
	}

	async function crossReferenceGeneration() {
		if (generations != null || generations != undefined) {
			availablePokemon = [];
			if (generations != 'All' && generations.version_groups != undefined) {
				generations.version_groups.forEach(async (self) => {
					version_group = await $pokedex.getVersionGroupByName(self.name);
					if (version_group.pokedexes.find((i) => i.name == 'kanto')) {
						pokedexKanto = await $pokedex.getPokedexByName('kanto');
						pokedexKanto.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'original-johto')) {
						pokedexJohto = await $pokedex.getPokedexByName('original-johto');
						pokedexJohto.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'updated-johto')) {
						pokedexJohto = await $pokedex.getPokedexByName('updated-johto');
						pokedexJohto.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'hoenn')) {
						pokedexHoenn = await $pokedex.getPokedexByName('hoenn');
						pokedexHoenn.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'updated-hoenn')) {
						pokedexHoenn = await $pokedex.getPokedexByName('updated-hoenn');
						pokedexHoenn.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'extended-sinnoh')) {
						pokedexSinnoh = await $pokedex.getPokedexByName('extended-sinnoh');
						pokedexSinnoh.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'updated-unova')) {
						pokedexUnova = await $pokedex.getPokedexByName('updated-unova');
						pokedexUnova.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'kalos-mountain')) {
						pokedexKalos_mountain = await $pokedex.getPokedexByName('kalos-mountain');
						pokedexKalos_mountain.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'kalos-central')) {
						pokedexKalos_central = await $pokedex.getPokedexByName('kalos-central');
						pokedexKalos_central.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'kalos-coastal')) {
						pokedexKalos_coastal = await $pokedex.getPokedexByName('kalos-coastal');
						pokedexKalos_coastal.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'letsgo-kanto')) {
						pokedexKanto = await $pokedex.getPokedexByName('letsgo-kanto');
						pokedexKanto.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'updated-alola')) {
						pokedexAlola = await $pokedex.getPokedexByName('updated-alola');
						pokedexAlola.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'galar')) {
						pokedexGalar = await $pokedex.getPokedexByName('galar');
						pokedexGalar.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'isle-of-armor')) {
						pokedexIsleOfArmor = await $pokedex.getPokedexByName('isle-of-armor');
						pokedexIsleOfArmor.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'crown-tundra')) {
						pokedexCrownTundra = await $pokedex.getPokedexByName('crown-tundra');
						pokedexCrownTundra.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'hisui')) {
						pokedexHisui = await $pokedex.getPokedexByName('hisui');
						pokedexHisui.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (
						version_group.pokedexes.find((i) => i.name == 'brilliant-diamond-and-shining-pearl')
					) {
						pokedexBD_SP = await $pokedex.getPokedexByName('brilliant-diamond-and-shining-pearl');
						pokedexBD_SP.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'paldea')) {
						pokedexPaldea = await $pokedex.getPokedexByName('paldea');
						pokedexPaldea.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'kitakami')) {
						pokedexKitakami = await $pokedex.getPokedexByName('kitakami');
						pokedexKitakami.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
					if (version_group.pokedexes.find((i) => i.name == 'blueberry')) {
						pokedexBlueberry = await $pokedex.getPokedexByName('blueberry');
						pokedexBlueberry.pokemon_entries.forEach((self) => {
							if (!availablePokemon.includes(self.pokemon_species.name)) {
								availablePokemon = [...availablePokemon, self.pokemon_species.name];
							} else {
								availablePokemon = availablePokemon;
							}
						});
					}
				});
			}
		}

		// console.log('actually doing something', generations);

		// if (generations != null || generations != undefined) {
		// 	console.log('stop it you stupid piece of code', generations.version_groups);
		// 	if (generations.version_groups != undefined || generations.version_groups != null) {
		// 		versionList = [];
		// 		console.log(generations.version_groups.version);
		// 		console.log('should be empty', versionList);
		// 		generations.version_groups.forEach(async () => {
		// 			version_group = await $pokedex.getVersionGroupByName(
		// 				generations.version_groups.find((i) => i.name)
		// 			);
		// 			version = await $pokedex.getVersionByName(version_group.versions.name);
		// 			console.log('dont mind me', version);
		// 			versionList.push(version);
		// 		});
		// 		console.log('should be the same thing as dont mind me', versionList);
		// 	}
		// }
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
	$: changeMove(stagedChanges);
	$: crossReferenceGeneration(generations);

	// $pokedex.getPokemonsList().then((r) => console.log(r));
</script>

<button class="add_to_team" on:click={() => (generationOpen = true)}>
	{#if pokemon.saved == null || pokemon.saved == undefined}
		<p>Position {teamPosition}</p>
	{:else}
		<p>{pokemon.displayName}</p>
		<img src={pokemon.preview} alt="{pokemon.displayName} preview" />
	{/if}</button
>

<Modal open={generationOpen}>
	<div>
		<select bind:value={generations} id="selectGen">
			{#await $pokedex.getGenerationsList() then generationList}
				<option selected="selected"></option>
				{#each generationList.results as findgeneration}
					{#await $pokedex.getGenerationByName(findgeneration.name) then generation}
						<option value={generation}
							>{generation.names.find((i) => i.language.name == 'en').name}</option
						>
					{/await}
				{/each}
				<option value="All">All</option>
			{/await}
		</select>
		<div id="closeConfirm">
			<button
				on:click={() => {
					generationOpen = false;
				}}>Close</button
			>
			<button
				disabled={generations == null || generations == undefined}
				on:click={() => {
					generationOpen = false;
					modalOpen1 = true;
					// console.log(generations);
				}}>Confirm</button
			>
		</div>
	</div>
</Modal>

<Modal open={modalOpen1} scrollable={modalScrollable1}>
	<!-- Stuff on flow charts (list of pokemon) -->
	<div id="rowdivforselect">
		<div id="coldivforoptions">
			<div id="selectPokemon">
				<ul class="searchable_select">
					{#await $pokedex.getPokemonSpeciesList() then pokemonList}
						<li>
							<input bind:value={searchForPokemon} type="text" placeholder="Search" />
						</li>
						{#each pokemonList.results as pokemon_results}
							{#await $pokedex.getPokemonSpeciesByName(pokemon_results.name) then pokemonData}
								<!-- Doing same thing as in moves to get proper names etc. -->
								{#if pokemonData != null || pokemonData != undefined}
									{#if availablePokemon.includes(pokemonData.name) || generations == 'All'}
										{#if pokemonData.name.includes(searchForPokemon)}
											<li>
												<button
													on:click={() => {
														selection = pokemon_results;
													}}>{pokemonData.names.find((i) => i.language.name == 'en').name}</button
												>
											</li>
										{/if}
										<!-- <option value={pokemon_results}
											>{pokemonData.names.find((i) => i.language.name == 'en').name}</option  <--- This is previous code to make sure I haven't completely
											mucked this up.
										> -->
									{/if}
								{/if}
							{/await}
						{/each}
					{/await}
				</ul>
			</div>
		</div>
		<div id="right_side_of_select">
			<div id="pokemonPreview">
				{#if preview == null}
					<p>Please select a Pokemon</p>
				{:else}
					<img id="pokeImg" src={preview} alt="{savedPokemonInfo.name} preview" />
				{/if}
			</div>
			<div id="changeForm">
				{#if varieties != null}
					{#if savedPokemonInfo.varieties.length > 1}
						{#each varieties as variety}
							<button
								on:click={async () => {
									savedPokemon = await $pokedex.getPokemon(variety.pokemon.name);
									checkvarieties = savedPokemon;
									preview = savedPokemon.sprites.front_default;
									hpStat = savedPokemon.stats[0].base_stat;
									attackStat = savedPokemon.stats[1].base_stat;
									defenseStat = savedPokemon.stats[2].base_stat;
									s_attackStat = savedPokemon.stats[3].base_stat;
									s_defenseStat = savedPokemon.stats[4].base_stat;
									speedStat = savedPokemon.stats[4].base_stat;
								}}
							>
								{#if variety.pokemon.name.includes('mega')}
									Mega {savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
									{#if variety.pokemon.name.includes('-x')}
										X
									{/if}
									{#if variety.pokemon.name.includes('-y')}
										Y
									{/if}
								{:else if variety.pokemon.name.includes('origin')}
									Origin Form {savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
								{:else if variety.pokemon.name.includes('shaymin-sky')}
									{savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (Sky)
								{:else if variety.pokemon.name.includes('primal')}
									Primal {savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
								{:else if variety.pokemon.name.includes('50')}
									{savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (50%)
								{:else if variety.pokemon.name.includes('10')}
									{savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (10%)
								{:else if variety.pokemon.name.includes('kyurem-black')}
									{savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (Black)
								{:else if variety.pokemon.name.includes('kyurem-white')}
									{savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (White)
								{:else if variety.pokemon.name.includes('alola')}
									Alolan {savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
								{:else if variety.pokemon.name.includes('galar')}
									Galarian {savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
								{:else if variety.pokemon.name.includes('hisui')}
									Hisuian {savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
								{:else if variety.pokemon.name.includes('paldea')}
									{#if variety.pokemon.name.includes('paldea-combat')}
										Paldean {savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (Combat)
									{:else if variety.pokemon.name.includes('paldea-blaze')}
										Paldean {savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (Blaze)
									{:else if variety.pokemon.name.includes('paldea-aqua')}
										Paldean {savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (Aqua)
									{:else}
										Paldean {savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
									{/if}
								{:else}
									{savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
								{/if}
							</button>
						{/each}
					{/if}
				{/if}
			</div>

			<div id="bottomRow">
				<button
					class="closeModal"
					on:click={() => {
						modalOpen1 = false;
						clearPokemon();
					}}
					>Close
				</button>
				<button
					class="confirmSelection"
					disabled={selection == null || selection == undefined}
					on:click={() => {
						// console.log(checkvarieties, savedPokemon, checkvarieties == {});
						if (!checkvarieties?.name) {
							checkvarieties = savedPokemon;
						}
						modalOpen1 = false;
						modalOpen2 = true;
					}}
					>Select
				</button>
			</div>
		</div>
	</div>
</Modal>

<Modal open={modalOpen2} scrollable={modalScrollable2}>
	<div class="titles">
		<div id="name">
			<p>Name:</p>
			<p>
				{#if savedPokemon.name.includes('mega')}
					Mega {savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
					{#if savedPokemon.name.includes('-x')}
						X
					{/if}
					{#if savedPokemon.name.includes('-y')}
						Y
					{/if}
				{:else if savedPokemon.name.includes('origin')}
					Origin Form {savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
				{:else if savedPokemon.name.includes('shaymin-sky')}
					{savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (Sky)
				{:else if savedPokemon.name.includes('primal')}
					Primal {savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
				{:else if savedPokemon.name.includes('50')}
					{savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (50%)
				{:else if savedPokemon.name.includes('10')}
					{savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (10%)
				{:else if savedPokemon.name.includes('kyurem-black')}
					{savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (Black)
				{:else if savedPokemon.name.includes('kyurem-white')}
					{savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (White)
				{:else if savedPokemon.name.includes('alola')}
					Alolan {savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
				{:else if savedPokemon.name.includes('galar')}
					Galarian {savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
				{:else if savedPokemon.name.includes('hisui')}
					Hisuian {savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
				{:else if savedPokemon.name.includes('paldea')}
					{#if savedPokemon.name.includes('paldea-combat')}
						Paldean {savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (Combat)
					{:else if savedPokemon.name.includes('paldea-blaze')}
						Paldean {savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (Blaze)
					{:else if savedPokemon.name.includes('paldea-aqua')}
						Paldean {savedPokemonInfo.names.find((i) => i.language.name == 'en').name} (Aqua)
					{:else}
						Paldean {savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
					{/if}
				{:else}
					{savedPokemonInfo.names.find((i) => i.language.name == 'en').name}
				{/if}
			</p>
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
	<div id="moves">
		<div class="selectMove">
			<button
				on:click={() => {
					modalOpen3 = true;
					moveSlot = 1;
				}}
			>
				{#if move1.names != undefined}
					<div class="move-summary">
						<div class="move-title">
							{move1.names[7].name}
						</div>
						<div class="move-desc">
							{move1.flavor_text_entries.findLast(
								(i) =>
									i.language.name == 'en' &&
									i.flavor_text !=
										'This move can’t be used.\nIt’s recommended that this move is forgotten.\nOnce forgotten, this move can’t be remembered.'
							).flavor_text}
						</div>
					</div>
					<div class="move-stat">
						<div class="move-power">
							{#if move1.power == null}
								<p>--</p>
							{:else}
								{move1.power}
							{/if}
						</div>
						<div class="move-accuracy">
							{#if move1.accuracy == null}
								<p>--</p>
							{:else}
								{move1.accuracy}
							{/if}
						</div>
					</div>
					<div class="move-characteristics">
						<div class="move-attack-type">{move1.damage_class.name}</div>
						<div class="move-power-points">{move1.pp}</div>
					</div>
				{:else}
					<p>Please select a move</p>
				{/if}
			</button>
		</div>
		<div class="selectMove">
			<button
				on:click={() => {
					modalOpen3 = true;
					moveSlot = 2;
				}}
				>{#if move2.names != undefined}
					<div class="move-summary">
						<div class="move-title">
							{move2.names[7].name}
						</div>
						<div class="move-desc">
							{move2.flavor_text_entries.findLast(
								(i) =>
									i.language.name == 'en' &&
									i.flavor_text !=
										'This move can’t be used.\nIt’s recommended that this move is forgotten.\nOnce forgotten, this move can’t be remembered.'
							).flavor_text}
						</div>
					</div>
					<div class="move-stat">
						<div class="move-power">
							{#if move2.power == null}
								<p>--</p>
							{:else}
								{move2.power}
							{/if}
						</div>
						<div class="move-accuracy">
							{#if move2.accuracy == null}
								<p>--</p>
							{:else}
								{move2.accuracy}
							{/if}
						</div>
					</div>
					<div class="move-characteristics">
						<div class="move-attack-type">{move2.damage_class.name}</div>
						<div class="move-power-points">{move2.pp}</div>
					</div>
				{:else}
					<p>Please select a move</p>
				{/if}</button
			>
		</div>
		<div class="selectMove">
			<button
				on:click={() => {
					modalOpen3 = true;
					moveSlot = 3;
				}}
				>{#if move3.names != undefined}
					<div class="move-summary">
						<div class="move-title">
							{move3.names[7].name}
						</div>
						<div class="move-desc">
							{move3.flavor_text_entries.findLast(
								(i) =>
									i.language.name == 'en' &&
									i.flavor_text !=
										'This move can’t be used.\nIt’s recommended that this move is forgotten.\nOnce forgotten, this move can’t be remembered.'
							).flavor_text}
						</div>
					</div>
					<div class="move-stat">
						<div class="move-power">
							{#if move3.power == null}
								<p>--</p>
							{:else}
								{move3.power}
							{/if}
						</div>
						<div class="move-accuracy">
							{#if move3.accuracy == null}
								<p>--</p>
							{:else}
								{move3.accuracy}
							{/if}
						</div>
					</div>
					<div class="move-characteristics">
						<div class="move-attack-type">{move3.damage_class.name}</div>
						<div class="move-power-points">{move3.pp}</div>
					</div>
				{:else}
					<p>Please select a move</p>
				{/if}</button
			>
		</div>
		<div class="selectMove">
			<button
				on:click={() => {
					modalOpen3 = true;
					moveSlot = 4;
				}}
				>{#if move4.names != undefined}
					<div class="move-summary">
						<div class="move-title">
							{move4.names[7].name}
						</div>
						<div class="move-desc">
							{move4.flavor_text_entries.findLast(
								(i) =>
									i.language.name == 'en' &&
									i.flavor_text !=
										'This move can’t be used.\nIt’s recommended that this move is forgotten.\nOnce forgotten, this move can’t be remembered.'
							).flavor_text}
						</div>
					</div>
					<div class="move-stat">
						<div class="move-power">
							{#if move4.power == null}
								<p>--</p>
							{:else}
								{move4.power}
							{/if}
						</div>
						<div class="move-accuracy">
							{#if move4.accuracy == null}
								<p>--</p>
							{:else}
								{move4.accuracy}
							{/if}
						</div>
					</div>
					<div class="move-characteristics">
						<div class="move-attack-type">{move4.damage_class.name}</div>
						<div class="move-power-points">{move4.pp}</div>
					</div>
				{:else}
					<p>Please select a move</p>
				{/if}</button
			>
		</div>
	</div>
	<div id="confirm/close">
		<button
			class="close"
			on:click={() => {
				(modalOpen2 = false), (modalOpen1 = true);
				clearPokemon();
			}}>Cancel</button
		>
		<button
			class="confirm"
			on:click={() => {
				modalOpen2 = false;
				if (
					selectedNature == undefined ||
					(move1 == {} && move2 == {} && move3 == {} && move4 == {})
				) {
					errorMessage = true;
				} else {
					savePokemon();
				}
			}}>Confirm</button
		>
	</div>
</Modal>

<MoveSelector
	bind:stagedChanges
	bind:modalOpen3
	bind:move1
	bind:move2
	bind:move3
	bind:move4
	bind:checkvarieties
	bind:generations
></MoveSelector>

<Modal open={errorMessage}>
	<p>
		! This action cannot be completed as there are some missing fields. Check to see if you have:<br
		/>- At least one move<br />- A nature selected
	</p>
	<button
		on:click={() => {
			errorMessage = false;
			modalOpen2 = true;
		}}>Close</button
	>
</Modal>

<style>
	.searchable_select {
		display: flex;
		flex-direction: column;
		list-style-type: none;
		overflow-y: auto;
		height: 70vh;
	}

	#rowdivforselect {
		display: flex;
		flex-direction: row;
		width: 80vw;
	}

	#coldivforoptions {
		display: flex;
		flex-direction: column;
	}

	#right_side_of_select {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	#pokemonPreview {
		display: flex;
		justify-content: center;
	}

	#pokeImg {
		display: flex;
		width: 50%;
	}

	#changeForm {
		display: flex;
		justify-content: center;
	}

	#bottomRow {
		display: flex;
		justify-content: right;
	}

	.confirmSelection {
		margin-left: 1em;
	}

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
