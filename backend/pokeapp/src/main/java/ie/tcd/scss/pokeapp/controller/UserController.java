package ie.tcd.scss.pokeapp.controller;

import ie.tcd.scss.pokeapp.dto.UserDTO;
import ie.tcd.scss.pokeapp.entity.UserEntity;
import ie.tcd.scss.pokeapp.exception.UserAlreadyExistsException;
import ie.tcd.scss.pokeapp.exception.UserInvalidException;
import ie.tcd.scss.pokeapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDTO userDTO) {
        try {
            UserEntity addedUser = userService.registerUser(userDTO);
            return ResponseEntity.ok("User " + addedUser.getUsername() + " added successfully");
        } catch (UserAlreadyExistsException | UserInvalidException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO) {
        boolean validUser = userService.validateUser(userDTO);
        if (validUser) {
            return ResponseEntity.ok("User " + userDTO.getUsername() + " successfully logged in");
        }
        return ResponseEntity.badRequest().body("Invalid username or password");
    }


    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUserInfo(@PathVariable String username) {
        try {
            UserDTO userDTO = userService.getUserInfo(username);
            return ResponseEntity.ok(userDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }    

    @PutMapping("/{username}/updatePokemonCount")
    public ResponseEntity<String> incrementAndGetPokemonCount(@PathVariable String username) {
        try {
            int updatedCount = userService.incrementAndGetPokemonCount(username);
            return ResponseEntity.ok("Pokemon count incremented by 1. Updated count: " + updatedCount);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("/{username}/add/{pokemonName}")
    public ResponseEntity<String> addPokemonToFavorites(@PathVariable String username, @PathVariable String pokemonName) {
        try {
            userService.addPokemonToFavorites(username, pokemonName);
            return ResponseEntity.ok("Pokemon " + pokemonName + " added to favorites for user " + username);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{username}/delete/{pokemonName}")
    public ResponseEntity<String> deletePokemonFromFavorites(@PathVariable String username, @PathVariable String pokemonName) {
        try {
            userService.deletePokemonFromFavorites(username, pokemonName);
            return ResponseEntity.ok("Pokemon " + pokemonName + " removed from favorites for user " + username);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
