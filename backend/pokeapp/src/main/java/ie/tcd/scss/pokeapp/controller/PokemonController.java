package ie.tcd.scss.pokeapp.controller;

import ie.tcd.scss.pokeapp.domain.Pokemon;
import ie.tcd.scss.pokeapp.dto.PokemonDTO;
import ie.tcd.scss.pokeapp.entity.UserEntity;
import ie.tcd.scss.pokeapp.repository.UserRepository;
import ie.tcd.scss.pokeapp.service.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/pokemon")
public class PokemonController {

    @Autowired
    private PokemonService pokemonService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{identifier}")
    public ResponseEntity<PokemonDTO> getPokemonName(@PathVariable Object identifier) {
        Pokemon pokemon = null;
        if (identifier instanceof Integer) {
            pokemon = (pokemonService.getPokemonById(Integer.getInteger(identifier.toString())));
        }
        if (identifier instanceof String) {
            if (identifier.equals("giratina")) {
                pokemon = pokemonService.getPokemonById(487);
            } else {
                pokemon = (pokemonService.getPokemonByName(identifier.toString()));
            }
        }
        if (pokemon != null) {
            PokemonDTO pokemonDTO = pokemonService.getPokemonInfo(pokemon);
            return ResponseEntity.ok(pokemonDTO);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{username}/substring/{substring}")
    public ResponseEntity<List<PokemonDTO>> getPokemonBySubstring(@PathVariable String username, @PathVariable String substring) {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User " + username + " not found.");
        }
        Set<String> favoriteNames = user.getFavorites();
        List<PokemonDTO> pokemonList = pokemonService.getPokemonInfoBySubstring(favoriteNames, substring);
        if (pokemonList == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(pokemonList);
    }

    @GetMapping("/{username}/substring")
    public ResponseEntity<List<PokemonDTO>> getAllPokemon(@PathVariable String username) {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User " + username + " not found.");
        }
        Set<String> favoriteNames = user.getFavorites();
        List<PokemonDTO> pokemonList = pokemonService.getPokemonInfoBySubstring(favoriteNames, null);
        if (pokemonList == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(pokemonList);
    }

    @GetMapping("/random")
    public ResponseEntity<PokemonDTO> getPokemonRandom() {
        try {
            PokemonDTO pokemonDTO = pokemonService.randomPokemon();
            return ResponseEntity.ok(pokemonDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
