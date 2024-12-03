package com.rustik.rustik.service;

import com.rustik.rustik.model.StatsView;
import com.rustik.rustik.repository.StatsViewRepository;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StatsViewService {
    @Autowired
    private EntityManager entityManager;

    @Autowired
    private StatsViewRepository statsViewRepository;

    @Transactional
    public void crearVista() {
        String sql = "CREATE VIEW stats_view AS " +
        "SELECT 'nusu1' AS 'id', 'totalUser' AS 'group', 'Total Usuarios' AS 'description', count(u.id) AS 'val1', 0 AS 'item_id', 0 AS 'val2' " +
        "FROM user u " +
        "UNION " +
        "SELECT 'ncab1' AS 'id', 'totalCabin' AS 'group', 'Total Cabañas' AS 'description', count(c.id) AS 'val1', 0 AS 'item_id', 0 AS 'val2' " +
        "FROM cabin c " +
        "UNION " +
        "(SELECT concat('favr', ROW_NUMBER() OVER (ORDER BY COUNT(fa.id) DESC))  AS 'id', 'favoriteRanking' AS 'group', c.name AS 'description',  ROW_NUMBER() OVER (ORDER BY COUNT(fa.id) DESC) AS 'val1', fa.cabin_id AS 'item_id', COUNT(fa.id) AS 'val2' " +
        "FROM favorite fa INNER JOIN cabin c ON fa.cabin_id = c.id " +
        "GROUP BY fa.cabin_id " +
        "LIMIT 5) " +
        "UNION " +
        "(SELECT concat('ratr', ROW_NUMBER() OVER (ORDER BY AVG(r.score) DESC))  AS 'id', 'ratingRanking' AS 'group', c.name AS 'description',  ROUND(AVG(r.score),2) AS 'val1', r.cabin_id AS 'item_id', 0 AS 'val2' " +
        "FROM ratings r INNER JOIN cabin c ON r.cabin_id = c.id " +
        "GROUP BY r.cabin_id " +
        "LIMIT 5) ";

        Query dropViewQuery = entityManager.createNativeQuery("DROP VIEW IF EXISTS stats_view");
        Query createViewQUery = entityManager.createNativeQuery(sql);
        dropViewQuery.executeUpdate();
        createViewQUery.executeUpdate();
    }

    public List<StatsView> getStats() {
        return statsViewRepository.findAll();
    }



}
