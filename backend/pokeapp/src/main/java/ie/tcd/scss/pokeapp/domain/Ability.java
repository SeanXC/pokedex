package ie.tcd.scss.pokeapp.domain;

import java.util.List;

public class Ability implements PokeApiResource{

    private Integer id;
    private String name;
    private List<VerboseEffect> effect_entries;

    public Integer getId(){
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public List<VerboseEffect> getEffect_entries(){
        return effect_entries;
    }

    public void setEffect_entries(List<VerboseEffect> effect_entries){
        this.effect_entries = effect_entries;
    }
    
}
