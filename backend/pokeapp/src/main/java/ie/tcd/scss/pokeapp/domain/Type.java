package ie.tcd.scss.pokeapp.domain;

public class Type implements PokeApiResource {

    private Integer id;
    private String name;

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
    
}
