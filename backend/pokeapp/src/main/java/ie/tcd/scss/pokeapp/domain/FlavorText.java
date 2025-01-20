package ie.tcd.scss.pokeapp.domain;

public class FlavorText {

    private String flavor_text;
    private NamedApiResource<Language> language;

    public String getFlavor_text(){
        return flavor_text;
    }

    public void setFlavor_text(String flavor_text) {
        this.flavor_text = flavor_text;
    }

    public NamedApiResource<Language> getLanguage() {
        return language;
    }

    public void setLanguage(NamedApiResource<Language> language) {
        this.language = language;
    }
    
}
