package ie.tcd.scss.pokeapp.controller;

import ie.tcd.scss.pokeapp.dto.PokemonDTO;
import ie.tcd.scss.pokeapp.dto.UserDTO;
import ie.tcd.scss.pokeapp.entity.UserEntity;
import ie.tcd.scss.pokeapp.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    protected TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp() {
        userRepository.deleteAll();
        UserEntity user1 = new UserEntity();
        user1.setUsername("user1");
        user1.setPassword(passwordEncoder.encode("password1"));
        Set<String> favorites = new HashSet<>();
        favorites.add("wormadam-plant");
        user1.setFavorites(favorites);
        userRepository.save(user1);

        UserEntity user2 = new UserEntity();
        user2.setUsername("user2");
        user2.setPassword(passwordEncoder.encode("password2"));

        userRepository.save(user2);
        UserEntity user3 = new UserEntity();
        user3.setUsername("user3");
        user3.setPassword(passwordEncoder.encode("password3"));
        userRepository.save(user3);
    }

    @Test
    public void testRegisterUser() {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("user4");
        userDTO.setPassword("password4");
        userDTO.setConfirmPassword("password4");

        ResponseEntity<String> responseEntity = restTemplate.postForEntity("http://localhost:" + port + "/user/register", userDTO, String.class);

        Assertions.assertThat(responseEntity.getStatusCode().is2xxSuccessful()).isTrue();
        String responseBody = responseEntity.getBody();
        Assertions.assertThat(responseBody).isNotNull();
        Assertions.assertThat(responseBody).isEqualTo("User user4 added successfully");
    }

    @Test
    public void testRegisterUserAlreadyExists() {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("user3");
        userDTO.setPassword("password3");
        userDTO.setConfirmPassword("password3");

        ResponseEntity<String> responseEntity = restTemplate.postForEntity("http://localhost:" + port + "/user/register", userDTO, String.class);

        Assertions.assertThat(responseEntity.getStatusCode().is4xxClientError()).isTrue();
        String responseBody = responseEntity.getBody();
        Assertions.assertThat(responseBody).isNotNull();
        Assertions.assertThat(responseBody).isEqualTo("A user with the username user3 already exists.");
    }

    @Test
    public void testRegisterUserPasswordsDontMatch() {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("user5");
        userDTO.setPassword("password5");
        userDTO.setConfirmPassword("notMatchingPassword");

        ResponseEntity<String> responseEntity = restTemplate.postForEntity("http://localhost:" + port + "/user/register", userDTO, String.class);

        Assertions.assertThat(responseEntity.getStatusCode().is4xxClientError()).isTrue();
        String responseBody = responseEntity.getBody();
        Assertions.assertThat(responseBody).isNotNull();
        Assertions.assertThat(responseBody).isEqualTo("The two passwords do not match.");
    }

    @Test
    public void testLoginUser() {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("user1");
        userDTO.setPassword("password1");

        ResponseEntity<String> responseEntity = restTemplate.postForEntity("http://localhost:" + port + "/user/login", userDTO, String.class);

        Assertions.assertThat(responseEntity.getStatusCode().is2xxSuccessful()).isTrue();
        String responseBody = responseEntity.getBody();
        Assertions.assertThat(responseBody).isNotNull();
        Assertions.assertThat(responseBody).isEqualTo("User user1 successfully logged in");
    }

    @Test
    public void testLoginUserInvalidUserName() {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("userDoesntExist");
        userDTO.setPassword("password1");

        ResponseEntity<String> responseEntity = restTemplate.postForEntity("http://localhost:" + port + "/user/login", userDTO, String.class);

        Assertions.assertThat(responseEntity.getStatusCode().is4xxClientError()).isTrue();
        String responseBody = responseEntity.getBody();
        Assertions.assertThat(responseBody).isNotNull();
        Assertions.assertThat(responseBody).isEqualTo("Invalid username or password");
    }

    @Test
    public void testLoginUserInvalidPassword() {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("user1");
        userDTO.setPassword("wrongPassword");


        ResponseEntity<String> responseEntity = restTemplate.postForEntity("http://localhost:" + port + "/user/login", userDTO, String.class);

        Assertions.assertThat(responseEntity.getStatusCode().is4xxClientError()).isTrue();
        String responseBody = responseEntity.getBody();
        Assertions.assertThat(responseBody).isNotNull();
        Assertions.assertThat(responseBody).isEqualTo("Invalid username or password");
    }

    @Test
    public void testRegisterUserEmptyInput() {
        UserDTO userDTO = new UserDTO();

        ResponseEntity<String> responseEntity = restTemplate.postForEntity("http://localhost:" + port + "/user/register", userDTO, String.class);

        Assertions.assertThat(responseEntity.getStatusCode().is4xxClientError()).isTrue();
        String responseBody = responseEntity.getBody();
        Assertions.assertThat(responseBody).isNotNull();
        Assertions.assertThat(responseBody).isEqualTo("Please enter a username.");
    }

    @Test
    public void restGetUserInfo() {
        String username = "user1";
        UserDTO userDTOExpected = new UserDTO();
        userDTOExpected.setUsername(username);
        userDTOExpected.setPokemonCount(0);
        List<PokemonDTO> favorites = new ArrayList<>();
        PokemonDTO pokemonDTO = new PokemonDTO();
        pokemonDTO.setName("wormadam-plant");
        favorites.add(pokemonDTO);
        userDTOExpected.setFavorites(favorites);

        ResponseEntity<UserDTO> responseEntity = restTemplate.getForEntity("http://localhost:" + port + "/user/" + username, UserDTO.class);

        Assertions.assertThat(responseEntity.getStatusCode().is2xxSuccessful()).isTrue();
        UserDTO responseBody = responseEntity.getBody();
        Assertions.assertThat(responseBody).isNotNull();
        Assertions.assertThat(responseBody.getUsername()).isEqualTo(userDTOExpected.getUsername());
        Assertions.assertThat(responseBody.getPokemonCount()).isEqualTo(userDTOExpected.getPokemonCount());
        Assertions.assertThat(responseBody.getFavorites().size()).isEqualTo(userDTOExpected.getFavorites().size());
    }

    @Test
    public void restGetUserInfoInvalidUsername() {
        String username = "invalidUsername";

        ResponseEntity<UserDTO> responseEntity = restTemplate.getForEntity("http://localhost:" + port + "/user/" + username, UserDTO.class);

        Assertions.assertThat(responseEntity.getStatusCode().is4xxClientError()).isTrue();
        UserDTO responseBody = responseEntity.getBody();
        Assertions.assertThat(responseBody).isNull();
    }

    @Test
    public void testIncrementAndGetPokemonCount() {
        String username = "user1";
        ResponseEntity<UserDTO> responseEntityBeforeIncrement = restTemplate.getForEntity("http://localhost:" + port + "/user/" + username, UserDTO.class);

        restTemplate.put("http://localhost:" + port + "/user/user1/updatePokemonCount", String.class);
        ResponseEntity<UserDTO> responseEntityAfterIncrement = restTemplate.getForEntity("http://localhost:" + port + "/user/" + username, UserDTO.class);

        Assertions.assertThat(responseEntityBeforeIncrement.getStatusCode().is2xxSuccessful()).isTrue();
        UserDTO responseBody = responseEntityBeforeIncrement.getBody();
        Assertions.assertThat(responseBody).isNotNull();
        Assertions.assertThat(responseBody.getPokemonCount()).isEqualTo(0);

        Assertions.assertThat(responseEntityAfterIncrement.getStatusCode().is2xxSuccessful()).isTrue();
        UserDTO responseBodyAfterIncrement = responseEntityAfterIncrement.getBody();
        Assertions.assertThat(responseBodyAfterIncrement).isNotNull();
        Assertions.assertThat(responseBodyAfterIncrement.getPokemonCount()).isEqualTo(1);
    }



    @Test
    public void testAddPokemonToFavorites() {
        String username = "user1";
        String pokemonname = "ditto";

        restTemplate.put("http://localhost:" + port + "/user/" + username + "/add/" + pokemonname, String.class);
        ResponseEntity<UserDTO> responseEntity = restTemplate.getForEntity("http://localhost:" + port + "/user/" + username, UserDTO.class);

        Assertions.assertThat(responseEntity.getStatusCode().is2xxSuccessful()).isTrue();
        UserDTO responseBody = responseEntity.getBody();
        Assertions.assertThat(responseBody).isNotNull();
        Assertions.assertThat(responseBody.getFavorites()).hasSize(2);
    }

    @Test
    public void testAddPokemonToFavoritesInvalidInput() {
        String username = "user1";
        String pokemonname = "invalidPokemon";

        restTemplate.put("http://localhost:" + port + "/user/" + username + "/add/" + pokemonname, String.class);
        ResponseEntity<UserDTO> responseEntity = restTemplate.getForEntity("http://localhost:" + port + "/user/" + username, UserDTO.class);

        Assertions.assertThat(responseEntity.getStatusCode().is2xxSuccessful()).isTrue();
        UserDTO responseBody = responseEntity.getBody();
        Assertions.assertThat(responseBody).isNotNull();
        Assertions.assertThat(responseBody.getFavorites()).hasSize(1);

    }

    @Test
    public void testDeletePokemonFromFavorites() {
        String username = "user1";
        String pokemonname = "wormadam-plant";

        ResponseEntity<String> responseDelete = restTemplate.exchange(
                String.format("http://localhost:%d/user/%s/delete/%s", port, username, pokemonname),
                HttpMethod.PUT,null,String.class
        );
        Assertions.assertThat(responseDelete.getStatusCode().is2xxSuccessful()).isTrue();
        String responseBody = responseDelete.getBody();
        Assertions.assertThat(responseBody).isNotNull();
        Assertions.assertThat(responseBody).isEqualTo("Pokemon " + pokemonname + " removed from favorites for user " + username);

        ResponseEntity<UserDTO> responseEntity = restTemplate.getForEntity("http://localhost:" + port + "/user/" + username, UserDTO.class);

        Assertions.assertThat(responseEntity.getStatusCode().is2xxSuccessful()).isTrue();
        UserDTO responseBody2 = responseEntity.getBody();
        Assertions.assertThat(responseBody2).isNotNull();
        Assertions.assertThat(responseBody2.getFavorites()).hasSize(0);
    }
}
