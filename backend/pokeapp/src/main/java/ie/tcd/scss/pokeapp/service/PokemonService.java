package ie.tcd.scss.pokeapp.service;

import ie.tcd.scss.pokeapp.domain.*;
import ie.tcd.scss.pokeapp.dto.PokemonDTO;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Service
public class PokemonService {

    private final RestTemplate restTemplate;

    // total number of pokemon in pokeAPI
    private final int NR_OF_POKEMON = 1010;

    // base URL to retrieve country information by name
    private static final String API_URL_BASE = "https://pokeapi.co/api/v2/";
    private static final String API_URL_BY_NAME = "https://pokeapi.co/api/v2/pokemon/";

    // base URL to retrieve pokemon information for all 1010 pokemon
    private static final String API_URL_ALL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1010";
    public PokemonService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public Pokemon getPokemonByName(String name) {
        try {
            Pokemon pokemon = restTemplate.getForObject(API_URL_BY_NAME + name, Pokemon.class);
            return pokemon;
        }
        catch (RestClientException e) {
            return null;
        }
    }

    public List<NamedApiResource<Pokemon>> getPokemonBySubstring(String substring){
        @SuppressWarnings("unchecked")
        NamedApiResourceList<Pokemon> pokemons = restTemplate.getForObject(API_URL_ALL, NamedApiResourceList.class);
        if(pokemons != null)
        {
            List<NamedApiResource<Pokemon>> pokemonList = pokemons.getResults();
            if(substring == null) {
                return pokemonList;
            }
            else return pokemonList.stream().filter(p -> p.getName().startsWith(substring)).toList();
        }
        return List.of();
    }

    public Ability getAbilityByPokemon(String name) {
        try {
            Pokemon pokemon = getPokemonByName(name);
            Ability ability = restTemplate.getForObject(pokemon.getAbilities().get(1).getAbility().getUrl(), Ability.class);
            return ability;
        }
        catch (RestClientException e) {
            return null;
        }
    }

    public PokemonSpecies getPokemonSpecies(Object identifier) {
        try {
            PokemonSpecies pokemon = restTemplate.getForObject(API_URL_BASE + "pokemon-species/" + identifier, PokemonSpecies.class);
            if(pokemon != null) {
                List<FlavorText> englishEntry = new ArrayList<>();
                for (int i = 0; i<pokemon.getFlavor_text_entries().size(); i++)
                {
                    if(pokemon.getFlavor_text_entries().get(i).getLanguage().getName().equals("en")) {
                        englishEntry.add(pokemon.getFlavor_text_entries().get(i));
                        break;
                    }
                }
                pokemon.setFlavor_text_entries(englishEntry);
                return pokemon;
            }
            else return null;
        }
        catch (RestClientException e) {
            return null;
        }
    }

    public Pokemon getPokemonById(int id) {
        try {
            return restTemplate.getForObject(API_URL_BY_NAME + id, Pokemon.class);
        }
        catch (RestClientException e) {
            return null;
        }
    }

    public PokemonDTO randomPokemon() {

        Random rand = new Random();
        int randomPokemon = rand.nextInt(NR_OF_POKEMON) + 1;
        Pokemon pokemon = getPokemonById(randomPokemon);
        PokemonDTO pokemonDTO = getPokemonInfo(pokemon);
        return pokemonDTO;
    }

    public PokemonDTO getPokemonInfo(Pokemon pokemon){

        if(pokemon!=null) {
            PokemonDTO pokemonDTO = new PokemonDTO();
            pokemonDTO.setId(pokemon.getId());
            pokemonDTO.setName(pokemon.getName());
            pokemonDTO.setImage("https://raw.githubusercontent.com/PokeAPI/sprites/ca5a7886c10753144e6fae3b69d45a4d42a449b4/sprites/pokemon/other/official-artwork/" + pokemon.getId() + ".png");            
            List<PokemonType> pokemonTypes = pokemon.getTypes();
            List<String> typeList = new ArrayList<>();
            for (int i = 0; i < pokemonTypes.size(); i++) 
            {
                String type = pokemonTypes.get(i).getType().getName();
                typeList.add(type);
            }
            pokemonDTO.setTypes(typeList);
            PokemonSpecies pokemonSpecies = getPokemonSpecies(pokemon.getId());
            if(pokemonSpecies != null){
                pokemonDTO.setPokedexEntry(pokemonSpecies.getFlavor_text_entries().get(0).getFlavor_text());
                return pokemonDTO;
            }
            return null;
        }
        else return null;
    }

    public List<PokemonDTO> getPokemonInfoBySubstring(Set<String> favoriteNames, String substring){
        List<PokemonDTO> pokemonDTOList = new ArrayList<>();
        List<NamedApiResource<Pokemon>> pokemons = getPokemonBySubstring(substring);
        if(pokemons == null) {
            return null;
        }
        for(int i = 0; i<20; i++) {
            if(i>=pokemons.size()) {
                break;      // for implementing showing partial list
            }
            Pokemon pokemon = getPokemonByName(pokemons.get(i).getName());
            PokemonDTO pokemonDTO = getPokemonInfo(pokemon);
            if(favoriteNames.contains(pokemonDTO.getName())) {
                pokemonDTO.setFavorite(true);
            }
            pokemonDTOList.add(pokemonDTO);
        }
        return pokemonDTOList;
    }

}
