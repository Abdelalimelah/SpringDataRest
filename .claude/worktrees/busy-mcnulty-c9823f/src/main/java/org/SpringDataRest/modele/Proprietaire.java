package org.SpringDataRest.modele;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Proprietaire {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    @NonNull
    private String nom;
    @NonNull
    private String prenom;

    @OneToMany(cascade = CascadeType.ALL, mappedBy=
            "proprietaire")
    private List<Voiture> voitures;
}
