package c1541tjavareact.library.persistence.entity.enums;

import java.util.ArrayList;
import java.util.List;

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
