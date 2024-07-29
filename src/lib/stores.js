import { readable } from 'svelte/store';
import { Pokedex } from 'pokeapi-js-wrapper';
import { browser } from '$app/environment';

// export const pokedex = writable(new Pokedex()); 
export const pokedex = readable({}, (set) => {
    function setDefault() {
        set(new Pokedex());
    };

    if(browser) {
        setDefault();
    };
});

