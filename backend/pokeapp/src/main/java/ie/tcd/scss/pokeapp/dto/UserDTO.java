package ie.tcd.scss.pokeapp.dto;
import java.util.List;

public class UserDTO {
    private String username;
    private String password;
    private String confirmPassword;
    private int pokemonCount;

    // Getters and Setters for userDTO
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

    public String getConfirmPassword() {
        return confirmPassword;
    }
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public int getPokemonCount() {
        return pokemonCount;
    }
    public void setPokemonCount(int pokemonCount) {
        this.pokemonCount = pokemonCount;
    }
}
