package ie.tcd.scss.pokeapp.service;

import ie.tcd.scss.pokeapp.dto.UserDTO;
import ie.tcd.scss.pokeapp.entity.UserEntity;
import ie.tcd.scss.pokeapp.exception.UserAlreadyExistsException;
import ie.tcd.scss.pokeapp.exception.UserInvalidException;
import ie.tcd.scss.pokeapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Creates a new UserEntity and adds it to the database
     *
     * @param userDTO The login parameters entered by the user.
     * @return the user that was created and added using the input data.
     */
    public UserEntity registerUser(UserDTO userDTO) throws UserAlreadyExistsException {
        String invalidUserMessage = validDTO(userDTO);
        if (invalidUserMessage != null) {
            throw new UserInvalidException(invalidUserMessage);
        }
        if (userRepository.findByUsername(userDTO.getUsername()) != null) {
            throw new UserAlreadyExistsException("A user with the username " + userDTO.getUsername() + " already exists.");
        }

        UserEntity user = new UserEntity();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setPokemonCount(0);
        Set<String> emptyFavourites = new HashSet<>();
        user.setFavorites(emptyFavourites);

        return userRepository.save(user);
    }

    public UserDTO getUserInfo(String username) {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User " + username + " not found.");
        }
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(user.getUsername());
        userDTO.setPokemonCount(user.getPokemonCount());
        return userDTO;
    }   

    /**
     * Checks if a user with the given credentials is valid
     *
     * @param userDTO The login parameters entered by the user.
     * @return true if the user exists and the login data was valid.
     */
    public boolean validateUser(UserDTO userDTO) {
        if (userDTO.getUsername() != null && userDTO.getPassword() != null) {
            UserEntity user = userRepository.findByUsername(userDTO.getUsername());
            return user != null && passwordEncoder.matches(userDTO.getPassword(), user.getPassword());
        }
        return false;
    }

    public int incrementAndGetPokemonCount(String username) {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User " + username + " not found.");
        }
        user.setPokemonCount(user.getPokemonCount() + 1);
        userRepository.save(user);
        return user.getPokemonCount();
    }
    
    public int getPokemonCount(String username) {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User " + username + " not found.");
        }
        return user.getPokemonCount();
    }    
    

    private String validDTO(UserDTO userDTO) {
        if (userDTO.getUsername() == null || userDTO.getUsername().isEmpty()) {
            return "Please enter a username.";
        }
        if (userDTO.getPassword() == null || userDTO.getPassword().isEmpty()) {
            return "Please enter a password.";
        }
        if (userDTO.getConfirmPassword() == null || userDTO.getConfirmPassword().isEmpty()) {
            return "Please confirm password.";
        }
        if (!userDTO.getConfirmPassword().equals(userDTO.getPassword())) {
            return "The two passwords do not match.";
        }
        return null;
    }
}
