package ie.tcd.scss.pokeapp.domain;

public class PokemonAbility {

    private boolean is_Hidden;
    private int slot;
    private NamedApiResource<Ability> ability;

    public boolean getIs_hidden(){
        return is_Hidden;
    }

    public void setIs_hidden(boolean isHidden){
        this.is_Hidden = isHidden;
    }

    public int getSlot(){
        return slot;
    }

    public void setSlot(int slot){
        this.slot = slot;
    }

    public NamedApiResource<Ability> getAbility(){
        return ability;
    }

    public void setAbility(NamedApiResource<Ability> ability){
        this.ability = ability;
    }

}
