package ie.tcd.scss.pokeapp.domain;

import java.util.List;

public class Pokemon implements PokeApiResource {
    
    private Integer id;
    private String name;
    private int height;  // The height of this Pokémon in decimetres.
    private int weight;  // The weight of this Pokémon in hectograms.
    private List<PokemonAbility> abilities;
    private List<PokemonType> types;

    @Override
    public Integer getId(){
        return id;
    }

    public void setId(Integer id){
        this.id = id;
    }

    @Override
    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public int getHeight(){
        return height;
    }

    public void setHeight(int height){
        this.height = height;
    }

    public int getWeight(){
        return weight;
    }

    public void setWeight(int weight){
        this.weight = weight;
    }

    public List<PokemonAbility> getAbilities(){
        return abilities;
    }

    public void setAbilities(List<PokemonAbility> abilities){
        this.abilities = abilities;
    }

    public List<PokemonType> getTypes(){
        return types;
    }

    public void setTypes(List<PokemonType> types){
        this.types = types;
    }

}
