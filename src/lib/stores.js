import { readable } from 'svelte/store';
import { writable } from 'svelte/store';
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

export const teams = writable([{name: [], members: []}]);

// do you know if ive broken the pokedex store by doing the teams one? because the error with it not being a function shouldnt be
// there. ive checked the github to make sure the name was right in case I'd bumped a key 