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
        <div id="right_navigation">
            <div id="profile">
                <a href="/profile">Profile</a>
            </div>
        </div>
    </nav>
    <div id="container">
        <div class="team">
            <p>Team name goes here</p>
            <button disabled class="add_pokemon_to_team hidebyDefault" on:click={unhidemodal(openPokemon)}></button>
            <button disabled class="add_pokemon_to_team hidebyDefault" on:click={unhidemodal(openPokemon)}></button>
            <button disabled class="add_pokemon_to_team hidebyDefault" on:click={unhidemodal(openPokemon)}></button>
            <button disabled class="add_pokemon_to_team hidebyDefault" on:click={unhidemodal(openPokemon)}></button>
            <button disabled class="add_pokemon_to_team hidebyDefault" on:click={unhidemodal(openPokemon)}></button>
            <button disabled class="add_pokemon_to_team hidebyDefault" on:click={unhidemodal(openPokemon)}></button>
        </div>
        <button id="new_team">+ Create a new team</button>
    </div>
</body>