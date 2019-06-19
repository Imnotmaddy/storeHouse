package com.itechart.studlab.app.service;

import com.itechart.studlab.app.domain.Product;
import com.itechart.studlab.app.domain.TTN;
import com.itechart.studlab.app.domain.enumeration.ProductState;
import com.itechart.studlab.app.repository.ProductRepository;
import com.itechart.studlab.app.repository.TTNRepository;
import com.itechart.studlab.app.repository.search.ProductSearchRepository;
import com.itechart.studlab.app.service.dto.ProductDTO;
import com.itechart.studlab.app.service.mapper.ProductMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

/**
 * Service Implementation for managing Product.
 */
@Service
@Transactional
public class ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductService.class);

    private final TTNRepository ttnRepository;

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    private final ProductSearchRepository productSearchRepository;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper,
                          ProductSearchRepository productSearchRepository, TTNRepository ttnRepository) {
        this.productRepository = productRepository;
        this.ttnRepository = ttnRepository;
        this.productMapper = productMapper;
        this.productSearchRepository = productSearchRepository;
    }

    /**
     * Save a product.
     *
     * @param productDTO the entity to save
     * @return the persisted entity
     */
    public ProductDTO save(ProductDTO productDTO) {
        log.debug("Request to save Product : {}", productDTO);
        Product product = productMapper.toEntity(productDTO);
        product = productRepository.save(product);
        ProductDTO result = productMapper.toDto(product);
        productSearchRepository.save(product);
        return result;
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> findAllByStorehouseId(Long id){
        log.debug("Request to get all Products by storehouseID");
        return productRepository.findAllByStorageRoom_Storehouse_IdAndQuantityGreaterThan(id, 0).stream()
            .filter(product -> product.getState() == ProductState.STORED)
            .map(productMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the products.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ProductDTO> findAll() {
        log.debug("Request to get all Products");
        return productRepository.findAll().stream()
            .map(productMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> findAllForTtn(Long id) {
        TTN ttn = ttnRepository.getOne(id);
        if (ttn.getDispatcher()==null){
            return productRepository.getAllByArrivalTTNId(ttn.getId()).stream()
                .map(productMapper::toDto).collect(Collectors.toList());
        }
        return productRepository.getAllByTTNIs(ttn).stream()
            .map(productMapper::toDto).collect(Collectors.toList());
}

    public List<ProductDTO> saveAllForTTN(List<ProductDTO> dtos, Long ttnId){
        log.debug("Request to save products for ttn id: {}, {}", ttnId, dtos);
        dtos.forEach(product -> product.settTNId(ttnId));
        log.debug("Update dto list: {}", dtos);
        List<Product> products = productMapper.toEntity(dtos);
        products = productRepository.saveAll(products);
        List<ProductDTO> result = productMapper.toDto(products);
        productSearchRepository.saveAll(products);
        return result;
    }


    /**
     * Get one product by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ProductDTO> findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        return productRepository.findById(id)
            .map(productMapper::toDto);
    }

    /**
     * Delete the product by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        productRepository.deleteById(id);
        productSearchRepository.deleteById(id);
    }

    /**
     * Search for the product corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ProductDTO> search(String query) {
        log.debug("Request to search Products for query {}", query);
        return StreamSupport
            .stream(productSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(productMapper::toDto)
            .collect(Collectors.toList());
    }
}
