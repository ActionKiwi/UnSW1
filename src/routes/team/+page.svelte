<script>
	import Teambuilder from '$lib/Teambuilder.svelte';
	export let teams = [];
</script>

<body>
	<nav>
		<div id="left_navigation">
			<div class="navigation">
				<a data-sveltekit-reload href="/sim">Simulation</a>
			</div>
			<div class="navigation">
				<a data-sveltekit-reload href="/team">Teams</a>
			</div>
		</div>
		<!-- <div id="right_navigation">
            <div id="profile">
                <a href="/profile">Profile</a>
            </div>
        </div> -->
	</nav>
	<ul class="teams">
		{#each teams as team}
			<li class="team">
				<input type="text" placeholder="Team Name" bind:value={team.name} />
				<Teambuilder></Teambuilder>
			</li>
		{/each}
	</ul>
	<button
		id="new_team"
		on:click={() => (teams = [...teams, { name: 'Untitled Team', members: [] }])}
		>+ Create a new team</button
	>
</body>
