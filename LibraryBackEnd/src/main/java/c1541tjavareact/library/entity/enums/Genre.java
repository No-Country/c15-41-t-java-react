package c1541tjavareact.library.entity.enums;

public enum Genre {
    THRILLER("Thriller"),
    FANTASY("Fantasy"),
    ADVENTURE("Adventure"),
    ACTION("Action");

    private final String value;
    Genre(String value) {
        this.value = value;
    }
    public String getValue() {
        return value;
    }
}
