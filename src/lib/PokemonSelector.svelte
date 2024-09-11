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
	let searchForPokemon = '';

	async function getPokemonData() {
		if (selection) {
			savedPokemonInfo = await $pokedex.getPokemonSpeciesByName(selection.name);
			savedPokemon = await $pokedex.getPokemon(selection.name);
			// this if statement accounts for if there is an option there shouldn't be or if the pokemon information in the api is
			// incomplete
			if (selection.name != undefined) {
				// gets the pokedex number in the national dex
				nationalDex = savedPokemonInfo.pokedex_numbers[0];
				pokedexNo = nationalDex.entry_number;
				preview = savedPokemon.sprites.front_default;
				varieties = savedPokemonInfo.varieties;
				// gets the base stat for each stat (base stat is the default number ceteris parabis)
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
		// prevents .getNatureByName returning an error as it would run before stores.js causing crashes
		if (selectNature != null || selectNature != undefined) {
			// what you select in the natures drop down select would then be pulled from the api (makes formatting the select easier)
			selectedNature = await $pokedex.getNatureByName(selectNature);
			// sets the base stat multiplier to default (*1)
			attacknatureValue = 1;
			defensenatureValue = 1;
			sattacknatureValue = 1;
			sdefensenatureValue = 1;
			speednatureValue = 1;
			// brute forced solution to change the multiplier. previous idea was to use 'increased stat:' and 'decreased stat:' but
			// this doesn't work for each nature
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
		// makes the stat gotten in getPokemonData() editable
		if (savedPokemon != null) {
			hpStat = savedPokemon.stats[0].base_stat;
			attackStat = savedPokemon.stats[1].base_stat;
			defenseStat = savedPokemon.stats[2].base_stat;
			s_attackStat = savedPokemon.stats[3].base_stat;
			s_defenseStat = savedPokemon.stats[4].base_stat;
			speedStat = savedPokemon.stats[5].base_stat;
		}
		// code for EV portion of calculation

		// in the games, a pokemon can have a maximum of 255 effort values (EVs) in each stat. At level 100, every 4 evs give a stat
		// point, meaning that would total to 256, which is not allowed with the total of 510 EVs overall. This sets it to the
		// maximum viable and minimum viable number if it exceeds 252 or is lower than 0 respectively.
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

		// Totals the user inputs for each stat, and subtracts that from 510 to determine how many can still be allocated.
		evsCountValue = 0;
		evsCountValue += healthEV;
		evsCountValue += attackEV;
		evsCountValue += defenseEV;
		evsCountValue += s_attackEV;
		evsCountValue += s_defenseEV;
		evsCountValue += speedEV;

		availableEVs = 510 - evsCountValue;

		// evsCountValue will exceed 510 as it does not get reset while the modal is open, so if the number exceeds 510 it is reset so that
		// availableEVs is not inaccurate once an input of higher than 252 is typed in the input
		// (e.g if extra 0 is entered for 100:
		// 1000 healthEV means 1000 evsCountValue, availableEVs is -490 and input is disabled, even though the visual number reads 100)
		if (evsCountValue > 510) {
			evsCountValue = 510;
		}

		// if availableEVs is below 0 i.e negative, instead of using the CountValue method it is reverse engineered directly from
		// the inputs. This is done only when it is 0 or below as for the split second where input = 1000 (using previous example)
		// it would alter every ev and break.
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

		// In the games, a pokemon can have 0-31 IVs from worst to best in a stat. At Level 100, an IV increases the corresponding
		// stat by 1. Same logic used for resetting the EVs if they exceed the required input, but without the count value as
		// a pokemon can have 31 IVs in every stat independent of other inputs and so does not need to be derived from a total of 186
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

		// takes every variable involved in determining final stat and returns the final amount in a variable.
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

	// changeMove() will respond to where the selected move from MoveSelector.svelte will be replacing the previous text in the button
	// for selecting a move
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

	// resets all variables to default/no input
	// **in future may add a clearPokemonMinor, Middle, Maximum for the different stages of clearing with Minor being to go back to pokemon select, Middle going back to generation select and Major going back to default values.**
	function clearPokemon() {
		selection = null;
		savedPokemon = null;
		savedPokemonInfo = null;
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
		// creates an object 'pokemon' and clones the pokemon information from the entire component as properties.
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
		// The api doesn't have capitalised letters for each form, so this adds the prefix/suffix/both to the name.
		// Some of these forms are unobtainable without a held item. When they are added the held item will be saved as an
		// attribute as well, and will be the default item if an illegal form is chosen (i.e Megas/Primal Reversions)
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
			// some pokemon don't have different forms (yet), so will use the default english name.
			pokemon.displayName = pokemon.info.names.find((i) => i.language.name == 'en').name;
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
		// clearPokemon means that once each property has been successfully cloned the button will return users to the default
		// 'select generation' modal. Referring back to possible minor middle major clearing, this would be a complete clear.
		// depending on feedback may change this so that the original values remain unchanged so that people can make quick edits
		// if they (unlikely) click the confirm button too early
		clearPokemon();
	}

	// the following filters pokemon able to be chosen in the pokemon select modal by the generation selected in the previous modal
	async function crossReferenceGeneration() {
		if (generations != null || generations != undefined) {
			availablePokemon = [];
			if (generations != 'All' && generations.version_groups != undefined) {
				generations.version_groups.forEach(async (self) => {
					version_group = await $pokedex.getVersionGroupByName(self.name);
					// As each generation has 2 or more games, searching via the version_group endpoint would result in duplicates
					// so this uses the pokedex endpoint and then cross checks it with the version_group in the pokedex entry.
					// if the pokemon from the first version is already present, the pokemon from the second will not be (they are identical)
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

					// some games have been remade to feature pokemon from later games, such as johto. original-johto refers to
					// the games 'Gold', 'Silver' and 'Crystal', while updated-johto refers to 'HeartGold' and 'SoulSilver'
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

					// Unova (Black and White) received remakes that expanded on the pokedex in the same generation (Generation V)
					// which where Black 2 and White 2. This means that it will just go through the updated version instead of both,
					// as the updated version only adds. This is also true for Sun and Moon (alola)
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

					// Kalos (Generation VI (6)) doesn't have one pokedex so all have to be looked through when Generation VI is selected
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
					// DLCs (Isle of Armor, Crown Tundra, Teal Mask (kitakami), Indigo Disk (blueberry)) all have their own pokedexes so they
					// are also added separately.
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
	}

	// runs the respective function whenever the variable in the brackets updates
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

<!-- Opens the generation modal -->
<button class="add_to_team" on:click={() => (generationOpen = true)}>
	{#if pokemon.saved == null || pokemon.saved == undefined}
		<p>Position {teamPosition}</p>
	{:else}
		<!-- if a pokemon has been selected previously, its name and front sprite will be displayed instead of the Position number -->
		<p>{pokemon.displayName}</p>
		<img src={pokemon.preview} alt="{pokemon.displayName} preview" />
	{/if}</button
>

<Modal open={generationOpen}>
	<div>
		<!-- select generation -->
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
			<!-- closes the modal -->
			<button
				on:click={() => {
					generationOpen = false;
				}}>Close</button
			>
			<!-- closes the modal and opens the next one. If no valid generation is selected or a generation has not been selected the user is unable to move on -->
			<button
				disabled={generations == null || generations == undefined}
				on:click={() => {
					generationOpen = false;
					modalOpen1 = true;
				}}>Confirm</button
			>
		</div>
	</div>
</Modal>

<!-- Select a pokemon -->
<Modal open={modalOpen1} scrollable={modalScrollable1}>
	<!-- Stuff on flow charts (list of pokemon) -->
	<div id="rowdivforselect">
		<div id="coldivforoptions">
			<div id="selectPokemon">
				<ul class="searchable_select">
					<!-- Gets list of every pokemon -->
					{#await $pokedex.getPokemonSpeciesList() then pokemonList}
						<!-- input for filtering pokemon by name -->
						<!-- <select> can't be easily used for this purpose without another library -->
						<li>
							<input bind:value={searchForPokemon} type="text" placeholder="Search" />
						</li>
						{#each pokemonList.results as pokemon_results}
							<!-- Gets the species of each pokemon to filter using the pokedex function and display proper name -->
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
									{/if}
								{/if}
							{/await}
						{/each}
					{/await}
				</ul>
			</div>
		</div>
		<!-- Adds the front sprite of the pokemon so users can see what it looks like in case they are looking for a different pokemon -->
		<div id="right_side_of_select">
			<div id="pokemonPreview">
				{#if preview == null}
					<p>Please select a Pokemon</p>
				{:else}
					<img id="pokeImg" src={preview} alt="{savedPokemonInfo.name} preview" />
				{/if}
			</div>
			<!-- if there is more than one form this will alter the savedPokemon variable to reflect the form change, while the species
			will stay the same as that is unchanged regardless of form -->
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
								<!-- same thing as pokedex modal -->
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
				<!-- button that both closes the modal and clears the savedPokemon and savedPokemonInfo variables if the user has made a selection -->
				<button
					class="closeModal"
					on:click={() => {
						modalOpen1 = false;
						clearPokemon();
					}}
					>Close
				</button>
				<!-- button that will alter savedPokemon if another form is selected -->
				<button
					class="confirmSelection"
					disabled={selection == null || selection == undefined}
					on:click={() => {
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
			<!-- Pokemon name -->
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
		<!-- National Pokedex number -->
		<div id="pokedex_number_of_pokemon">
			<p>Pokedex No.</p>
			<p>{pokedexNo}</p>
		</div>
		<!-- change gender of pokemon. Some pokemon don't have a gender (such as legendary pokemon) or can only be male or female
		(such as Nidoran ♂, Nidoran ♀, Nidorino, Nidorina, Nidoking, Nidoqueen) and so invalid options are unselectable -->
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
	<!-- displays stat value -->
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
		<!-- inputs for effort and individual values to be used in the updateStatByEVIV() function -->
		<div id="stat_table_right">
			<div id="input_effort_values">
				<div class="inputEVs" id="healthEV">
					<p>EVs:</p>
					<!-- input can only be a valid number -->
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

	<!-- displays EVs left for the user -->
	<div id="EV_count_and_nature">
		<p>Effort Values available: {availableEVs}</p>
		<!-- drop down for natures in the checkNatures() function -->
		<select bind:value={selectNature}>
			<option selected="selected"></option>
			{#await $pokedex.getNaturesList() then natureList}
				{#each natureList.results as nature}
					<option value={nature.name}>{nature.name}</option>
				{/each}
			{/await}
		</select>
	</div>
	<!-- Select pokemon level -->
	<!-- For now will just have togglable buttons but potentially could add an input for this instead depending on feedback -->
	<div id="setLevel">
		<!-- buttons are disabled if they are already selected. this is due to there being no visual indicator other than the stat
		values updating which level the user selects, so being able to see the greyed out/indented button would be useful for indentification -->
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
			<!-- these four buttons recreate the button from MoveSelector.svelte in the edit pokemon modal for selecting moves. 
			as in the games two identical moves cannot be learnt by a pokemon the same is true here.-->
			<button
				on:click={() => {
					// Opens the move selection modal and sets the updating button to 1-4.
					modalOpen3 = true;
					moveSlot = 1;
				}}
			>
				<!-- if a move has already been selected -->
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
					<!-- If no move has already been selected -->
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
		<!-- button that closes the modal and clears the value. In future this could be a middle clear -->
		<button
			class="close"
			on:click={() => {
				(modalOpen2 = false), (modalOpen1 = true);
				clearPokemon();
			}}>Cancel</button
		>
		<!-- confirm pokemon creation -->
		<button
			class="confirm"
			on:click={() => {
				modalOpen2 = false;
				// if there is no nature selected or the pokemon knows no moves, an error message will appear prompting the user
				// to check if they have selected a nature and/or at least one move
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

<!-- move selector variables that are created in MoveSelector.svelte used in PokemonSelector.svelte and/or its parents -->
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

<!-- Error message text -->
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
