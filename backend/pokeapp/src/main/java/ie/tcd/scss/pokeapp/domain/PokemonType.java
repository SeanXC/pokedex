package ie.tcd.scss.pokeapp.domain;

public class PokemonType {

    private int slot;
    private NamedApiResource<Type> type;

    public int getSlot() {
        return slot;
    }

    public void setSlot(int slot) {
        this.slot = slot;
    }

    public NamedApiResource<Type> getType() {
        return type;
    }

    public void setType(NamedApiResource<Type> type) {
        this.type = type;
    }
    
}
