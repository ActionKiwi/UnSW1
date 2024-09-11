<script>
	import Teambuilder from '$lib/Teambuilder.svelte';
	import PokemonSelector from '$lib/PokemonSelector.svelte';
	import { teams } from '$lib/stores.js';

	// let iterableTeams = null;
	function logMeStuff() {
		console.log($teams);
	}

	$: logMeStuff($teams);
</script>

<body>
	<nav>
		<div id="left_navigation">
			<div class="navigation">
				<a href="/sim">Simulation</a>
			</div>
			<div class="navigation">
				<a href="/team">Teams</a>
			</div>
		</div>
		<!-- <div id="right_navigation">
            <div id="profile">
                <a href="/profile">Profile</a>
            </div>
        </div> -->
	</nav>
	<ul class="teams">
		{#each $teams as team}
			<li class="team">
				<input type="text" placeholder="Enter Team Name Here" bind:value={team.name} />
				<Teambuilder bind:member={team.members}></Teambuilder>
			</li>
		{/each}
	</ul>
	<button id="new_team" on:click={() => ($teams = [...$teams, { name: '', members: {} }])}
		>+ Create a new team</button
	>
</body>
