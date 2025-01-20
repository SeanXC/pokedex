package ie.tcd.scss.pokeapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 *  Data Transfer Object (DTO) representing a filter when searching for a Pokémon.
 */
@Setter
@Getter
public class PokemonDTO {
    private int id;
    private String name;
    private List<String> types;
    private String image;
    private boolean isFavorite;
    private String pokedexEntry;
}
