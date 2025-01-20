package ie.tcd.scss.pokeapp.repository;

import ie.tcd.scss.pokeapp.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);
}
