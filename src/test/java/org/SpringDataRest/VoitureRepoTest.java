package org.SpringDataRest;

import static org.assertj.core.api.Assertions.assertThat;
import org.SpringDataRest.modele.Voiture;
import org.SpringDataRest.repository.VoitureRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class VoitureRepoTest {

    @Autowired
    VoitureRepo voitureRepo;

    @Test
    public void ajouterVoiture() {
        Voiture voiture = new Voiture(null, "MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000, null);
        voitureRepo.save(voiture);
        assertThat(voiture.getId()).isGreaterThan(0L);
    }

    @Test
    public void supprimerVoiture() {
        voitureRepo.save(new Voiture(null, "MiolaCar",   "Uber", "Blanche", "M-2020", 2021, 180000, null));
        voitureRepo.save(new Voiture(null, "MiniCooper", "Uber", "Rouge",   "C-2020", 2021, 180000, null));
        voitureRepo.deleteAll();
        assertThat(voitureRepo.findAll()).isEmpty();
    }
}
