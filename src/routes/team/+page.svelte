<body>
    <nav>
        <div id="left_navigation">
            <button class="navigation">
                Simulation
            </button>
            <button class="navigation">
                Teams
            </button>
        </div>
        <div id="right_navigation">
            <button id="profile">
                Profile
            </button>
        </div>
    </nav>
    <div id="container">
        <div class="team">
            <p>Team name goes here</p>
            <button class="add_pokemon_to_team hidebyDefault" on:click={unhidemodal(createTeam)}></button>
            <button class="add_pokemon_to_team hidebyDefault" on:click={unhidemodal(createTeam)}></button>
            <button class="add_pokemon_to_team hidebyDefault" on:click={unhidemodal(createTeam)}></button>
            <button class="add_pokemon_to_team hidebyDefault" on:click={unhidemodal(createTeam)}></button>
            <button class="add_pokemon_to_team hidebyDefault" on:click={unhidemodal(createTeam)}></button>
            <button class="add_pokemon_to_team hidebyDefault" on:click={unhidemodal(createTeam)}></button>
        </div>
        <button id="new_team">+ Create a new team</button>
    </div>
</body>