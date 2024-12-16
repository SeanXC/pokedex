package ie.tcd.scss.pokeapp.service;

import ie.tcd.scss.pokeapp.dto.UserDTO;
import ie.tcd.scss.pokeapp.entity.UserEntity;

public interface UserService {
    UserEntity registerUser(UserDTO userDTO);
    boolean validateUser(UserDTO userDTO);
}
