package shop.clothesshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.clothesshop.entities.AccountShipContact;
@Repository
public interface AccountShipContactRepo extends JpaRepository<AccountShipContact,Integer> {
}
