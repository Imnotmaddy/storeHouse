package com.itechart.studlab.app.repository;

import com.itechart.studlab.app.domain.StorageRoom;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StorageRoom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StorageRoomRepository extends JpaRepository<StorageRoom, Long> {

}
