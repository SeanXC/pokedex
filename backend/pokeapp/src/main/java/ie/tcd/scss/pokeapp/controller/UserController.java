package ie.tcd.scss.pokeapp.controller;

import ie.tcd.scss.pokeapp.dto.UserDTO;
import ie.tcd.scss.pokeapp.entity.UserEntity;
import ie.tcd.scss.pokeapp.exception.UserAlreadyExistsException;
import ie.tcd.scss.pokeapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDTO userDTO) {
        try {
            UserEntity addedUser = userService.registerUser(userDTO);
            return ResponseEntity.ok("User " + addedUser.getUsername() + " added successfully");
        } catch (UserAlreadyExistsException e) {
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
}
