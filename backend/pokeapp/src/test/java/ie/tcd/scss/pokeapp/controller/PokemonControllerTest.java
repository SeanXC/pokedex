package ie.tcd.scss.pokeapp.controller;

import ie.tcd.scss.pokeapp.dto.PokemonDTO;
import ie.tcd.scss.pokeapp.entity.UserEntity;
import ie.tcd.scss.pokeapp.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PokemonControllerTest {
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
    }

    @Test
    public void testGetPokemonNameById() {
        int id = 12;
        PokemonDTO pokemonDTOExpected = getPokemonDTOExpected();

        ResponseEntity<PokemonDTO> responseEntity = restTemplate.getForEntity("http://localhost:" + port + "/pokemon/" + id, PokemonDTO.class);

        Assertions.assertThat(responseEntity.getStatusCode().is2xxSuccessful()).isTrue();
        PokemonDTO pokemonDTO = responseEntity.getBody();
        Assertions.assertThat(pokemonDTO).isNotNull();
        Assertions.assertThat(pokemonDTO.getId()).isEqualTo(id);
        Assertions.assertThat(pokemonDTO.getName()).isEqualTo(pokemonDTOExpected.getName());
        Assertions.assertThat(pokemonDTO.getTypes()).containsExactly("bug", "flying");
        Assertions.assertThat(pokemonDTO.getImage()).isEqualTo(pokemonDTOExpected.getImage());
    }

    @Test
    public void testGetPokemonNameByName() {
        String name = "butterfree";
        PokemonDTO pokemonDTOExpected = getPokemonDTOExpected();

        ResponseEntity<PokemonDTO> responseEntity = restTemplate.getForEntity("http://localhost:" + port + "/pokemon/" + name, PokemonDTO.class);

        Assertions.assertThat(responseEntity.getStatusCode().is2xxSuccessful()).isTrue();
        PokemonDTO pokemonDTO = responseEntity.getBody();
        Assertions.assertThat(pokemonDTO).isNotNull();
        Assertions.assertThat(pokemonDTO.getId()).isEqualTo(pokemonDTOExpected.getId());
        Assertions.assertThat(pokemonDTO.getName()).isEqualTo(pokemonDTOExpected.getName());
        Assertions.assertThat(pokemonDTO.getTypes()).containsExactly("bug", "flying");
        Assertions.assertThat(pokemonDTO.getImage()).isEqualTo(pokemonDTOExpected.getImage());
    }

    @Test
    public void testGetPokemonNameInvalidInput() {
        String name = "invalidName";

        ResponseEntity<PokemonDTO> responseEntity = restTemplate.getForEntity("http://localhost:" + port + "/pokemon/" + name, PokemonDTO.class);

        Assertions.assertThat(responseEntity.getStatusCode().is4xxClientError()).isTrue();
        PokemonDTO pokemonDTO = responseEntity.getBody();
        Assertions.assertThat(pokemonDTO).isNull();
    }

    @Test
    public void testGetPokemonBySubstring() {
        String substring = "bu";

        ResponseEntity<List> responseEntity = restTemplate.getForEntity("http://localhost:" + port + "/pokemon/user1/substring/" + substring, List.class);

        Assertions.assertThat(responseEntity.getStatusCode().is2xxSuccessful()).isTrue();
        List responseList = responseEntity.getBody();
        Assertions.assertThat(responseList).isNotNull();
        Assertions.assertThat(responseList.size()).isEqualTo(8);
        Assertions.assertThat(((LinkedHashMap) responseList.get(0)).get("name")).isEqualTo("bulbasaur");
    }

    @Test
    public void testGetPokemonBySubstringInvalid() {
        String substring = "invalid";

        ResponseEntity<List> responseEntity = restTemplate.getForEntity("http://localhost:" + port + "/pokemon/user1/substring/" + substring, List.class);

        Assertions.assertThat(responseEntity.getStatusCode().is2xxSuccessful()).isTrue();
        List responseList = responseEntity.getBody();
        Assertions.assertThat(responseList).isNotNull();
        Assertions.assertThat(responseList.size()).isEqualTo(0);
    }

    private PokemonDTO getPokemonDTOExpected() {
        PokemonDTO pokemonDTOExpected = new PokemonDTO();
        pokemonDTOExpected.setId(12);
        pokemonDTOExpected.setName("butterfree");
        List<String> types = new ArrayList<>();
        types.add("bug");
        types.add("flying");
        pokemonDTOExpected.setTypes(types);
        String basicImage = "https://raw.githubusercontent.com/PokeAPI/sprites/ca5a7886c10753144e6fae3b69d45a4d42a449b4/sprites/pokemon/other/official-artwork/";
        pokemonDTOExpected.setImage(basicImage + 12 + ".png");
        pokemonDTOExpected.setPokedexEntry("In battle, it flaps its wings at high speed to release highly toxic dust into the air.");
        pokemonDTOExpected.setFavorite(false);
        return pokemonDTOExpected;
    }
}
