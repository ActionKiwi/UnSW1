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
        <div id="sim_screen">
            <div id="sim_window">
                <p>sim screen window will contain 4 pokemon 'slots' where pos 1 and 2 of team 1 and 2 will be situated</p>
            </div>
            <div id="manualareachange_container">
                <button class="manual_area_change">
                    Set Weather
                </button>
                <button class="manual_area_change">
                    Set Terrain
                </button>
            </div>
        </div>
        <div id="treset">
            <div class="select_team">
                <button id="pop_up" on:click={unhide_modal(team1)}>Select Team 1</button>
                <button class="select_pokemon_from_team hiddenbyDefault" on:click={starting_position(team1, pokemon, index)}></button>
                <button class="select_pokemon_from_team hiddenbyDefault" on:click={starting_position(team1, pokemon, index)}></button>
                <button class="select_pokemon_from_team hiddenbyDefault" on:click={starting_position(team1, pokemon, index)}></button>
                <button class="select_pokemon_from_team hiddenbyDefault" on:click={starting_position(team1, pokemon, index)}></button>
                <button class="select_pokemon_from_team hiddenbyDefault" on:click={starting_position(team1, pokemon, index)}></button>
                <button class="select_pokemon_from_team hiddenbyDefault" on:click={starting_position(team1, pokemon, index)}></button>
            </div>
            <div class="select_team">
                <button id="pop_up" on:click={unhide_modal(team2)}>Select Team 2</button>
                <button class="select_pokemon_from_team hiddenbyDefault" on:click={starting_position(team2, pokemon, index)}></button>
                <button class="select_pokemon_from_team hiddenbyDefault" on:click={starting_position(team2, pokemon, index)}></button>
                <button class="select_pokemon_from_team hiddenbyDefault" on:click={starting_position(team2, pokemon, index)}></button>
                <button class="select_pokemon_from_team hiddenbyDefault" on:click={starting_position(team2, pokemon, index)}></button>
                <button class="select_pokemon_from_team hiddenbyDefault" on:click={starting_position(team2, pokemon, index)}></button>
                <button class="select_pokemon_from_team hiddenbyDefault" on:click={starting_position(team2, pokemon, index)}></button>
            </div>
            <button id="reset_button">Reset</button>
        </div>
    </div>
</body>
