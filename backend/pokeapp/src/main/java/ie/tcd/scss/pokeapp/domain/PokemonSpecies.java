package ie.tcd.scss.pokeapp.domain;

import java.util.List;

public class PokemonSpecies implements PokeApiResource {

    private Integer id;
    private String name;
    private int order;
    private boolean is_legendary;
    private NamedApiResource<Generation> generation;
    private List<FlavorText> flavor_text_entries;
    
    public Integer getId(){
        return id;
    }

    public void setId(Integer id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public int getOrder(){
        return order;
    }

    public void setOrder(int order){
        this.order = order;
    }

    public boolean getIs_legendary(){
        return is_legendary;
    }

    public void setIs_legendary(boolean is_legendary){
        this.is_legendary = is_legendary;
    }

    public NamedApiResource<Generation> getGeneration() {
		return generation;
	}

	public void setGeneration(NamedApiResource<Generation> generation) {
		this.generation = generation;
	}

    public List<FlavorText> getFlavor_text_entries() {
        return flavor_text_entries;
    }

    public void setFlavor_text_entries(List<FlavorText> flavor_text_entries) {
        this.flavor_text_entries = flavor_text_entries;
    }

}
