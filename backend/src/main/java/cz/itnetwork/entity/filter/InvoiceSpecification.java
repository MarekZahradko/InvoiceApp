package cz.itnetwork.entity.filter;

import cz.itnetwork.entity.InvoiceEntity;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class InvoiceSpecification implements Specification<InvoiceEntity> {

    private final InvoiceFilter filter;

    public InvoiceSpecification(InvoiceFilter filter) {
        this.filter = filter;
    }

    @Override
    public Predicate toPredicate(Root<InvoiceEntity> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if (filter.getBuyerID() != null) {
            predicates.add(criteriaBuilder.equal(root.get("buyer").get("id"), filter.getBuyerID()));
        }

        if (filter.getSellerID() != null) {
            predicates.add(criteriaBuilder.equal(root.get("seller").get("id"), filter.getSellerID()));
        }

        if (filter.getProduct() != null && !filter.getProduct().isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("product"), "%" + filter.getProduct() + "%"));
        }

        if (filter.getMinPrice() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), filter.getMinPrice()));
        }

        if (filter.getMaxPrice() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), filter.getMaxPrice()));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }

}
