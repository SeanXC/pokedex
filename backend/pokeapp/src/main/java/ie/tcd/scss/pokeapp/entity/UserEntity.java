package ie.tcd.scss.pokeapp.entity;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private int pokemonCount = 0;

    @ElementCollection
    @CollectionTable(name = "FAVORITES", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "pokemon_name")
    private Set<String> favorites = new HashSet<>();

    // Getters and Setters for userEntity
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public int getPokemonCount() {
        return pokemonCount;
    }
    public void setPokemonCount(int pokemonCount) {
        this.pokemonCount = pokemonCount;
    }

    public Set<String> getFavorites() {
        return favorites;
    }
    public void setFavorites(Set<String> favorites) {
        this.favorites = favorites;
    }
}
