package com.itechart.studlab.app.service;

import com.itechart.studlab.app.domain.TTN;
import com.itechart.studlab.app.repository.TTNRepository;
import com.itechart.studlab.app.repository.search.TTNSearchRepository;
import com.itechart.studlab.app.service.dto.TTNDTO;
import com.itechart.studlab.app.service.mapper.TTNMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TTN.
 */
@Service
@Transactional
public class TTNService {

    private final Logger log = LoggerFactory.getLogger(TTNService.class);

    private final TTNRepository tTNRepository;

    private final TTNMapper tTNMapper;

    private final TTNSearchRepository tTNSearchRepository;

    public TTNService(TTNRepository tTNRepository, TTNMapper tTNMapper, TTNSearchRepository tTNSearchRepository) {
        this.tTNRepository = tTNRepository;
        this.tTNMapper = tTNMapper;
        this.tTNSearchRepository = tTNSearchRepository;
    }

    /**
     * Save a tTN.
     *
     * @param tTNDTO the entity to save
     * @return the persisted entity
     */
    public TTNDTO save(TTNDTO tTNDTO) {
        log.debug("Request to save TTN : {}", tTNDTO);
        TTN tTN = tTNMapper.toEntity(tTNDTO);
        tTN = tTNRepository.save(tTN);
        TTNDTO result = tTNMapper.toDto(tTN);
        tTNSearchRepository.save(tTN);
        return result;
    }

    /**
     * Get all the tTNS.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TTNDTO> findAll() {
        log.debug("Request to get all TTNS");
        return tTNRepository.findAll().stream()
            .map(tTNMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one tTN by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<TTNDTO> findOne(Long id) {
        log.debug("Request to get TTN : {}", id);
        return tTNRepository.findById(id)
            .map(tTNMapper::toDto);
    }

    /**
     * Delete the tTN by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TTN : {}", id);
        tTNRepository.deleteById(id);
        tTNSearchRepository.deleteById(id);
    }

    /**
     * Search for the tTN corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TTNDTO> search(String query) {
        log.debug("Request to search TTNS for query {}", query);
        return StreamSupport
            .stream(tTNSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(tTNMapper::toDto)
            .collect(Collectors.toList());
    }
}
