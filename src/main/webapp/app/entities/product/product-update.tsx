import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITTN } from 'app/shared/model/ttn.model';
import { getEntities as getTTns } from 'app/entities/ttn/ttn.reducer';
import { getEntity, updateEntity, createEntity, reset } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProductUpdateState {
  isNew: boolean;
  tTNId: string;
}

export class ProductUpdate extends React.Component<IProductUpdateProps, IProductUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      tTNId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTTns();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { productEntity } = this.props;
      const entity = {
        ...productEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/product');
  };

  render() {
    const { productEntity, tTNS, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="storeHouseApp.product.home.createOrEditLabel">
              <Translate contentKey="storeHouseApp.product.home.createOrEditLabel">Create or edit a Product</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : productEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="product-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="stateLabel">
                    <Translate contentKey="storeHouseApp.product.state">State</Translate>
                  </Label>
                  <AvInput
                    id="product-state"
                    type="select"
                    className="form-control"
                    name="state"
                    value={(!isNew && productEntity.state) || 'REGISTRATED'}
                  >
                    <option value="REGISTRATED">
                      <Translate contentKey="storeHouseApp.ProductState.REGISTRATED" />
                    </option>
                    <option value="APPROVED">
                      <Translate contentKey="storeHouseApp.ProductState.APPROVED" />
                    </option>
                    <option value="STORED">
                      <Translate contentKey="storeHouseApp.ProductState.STORED" />
                    </option>
                    <option value="LOST_BY_TRANSPORTER">
                      <Translate contentKey="storeHouseApp.ProductState.LOST_BY_TRANSPORTER" />
                    </option>
                    <option value="GONE_FROM_STORAGE">
                      <Translate contentKey="storeHouseApp.ProductState.GONE_FROM_STORAGE" />
                    </option>
                    <option value="STOLEN_FROM_STORAGE">
                      <Translate contentKey="storeHouseApp.ProductState.STOLEN_FROM_STORAGE" />
                    </option>
                    <option value="TRANSPORTER_SHORTAGE">
                      <Translate contentKey="storeHouseApp.ProductState.TRANSPORTER_SHORTAGE" />
                    </option>
                    <option value="CONFISCATED">
                      <Translate contentKey="storeHouseApp.ProductState.CONFISCATED" />
                    </option>
                    <option value="RECYCLED">
                      <Translate contentKey="storeHouseApp.ProductState.RECYCLED" />
                    </option>
                    <option value="UNSTORED">
                      <Translate contentKey="storeHouseApp.ProductState.UNSTORED" />
                    </option>
                    <option value="READY_TO_LEAVE">
                      <Translate contentKey="storeHouseApp.ProductState.READY_TO_LEAVE" />
                    </option>
                    <option value="REMOVED_FROM_STORAGE">
                      <Translate contentKey="storeHouseApp.ProductState.REMOVED_FROM_STORAGE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="daysInStorageLabel" for="daysInStorage">
                    <Translate contentKey="storeHouseApp.product.daysInStorage">Days In Storage</Translate>
                  </Label>
                  <AvField id="product-daysInStorage" type="string" className="form-control" name="daysInStorage" />
                </AvGroup>
                <AvGroup>
                  <Label id="costLabel" for="cost">
                    <Translate contentKey="storeHouseApp.product.cost">Cost</Translate>
                  </Label>
                  <AvField id="product-cost" type="string" className="form-control" name="cost" />
                </AvGroup>
                <AvGroup>
                  <Label id="requiredFacilityLabel">
                    <Translate contentKey="storeHouseApp.product.requiredFacility">Required Facility</Translate>
                  </Label>
                  <AvInput
                    id="product-requiredFacility"
                    type="select"
                    className="form-control"
                    name="requiredFacility"
                    value={(!isNew && productEntity.requiredFacility) || 'REFRIGERATOR'}
                  >
                    <option value="REFRIGERATOR">
                      <Translate contentKey="storeHouseApp.Facility.REFRIGERATOR" />
                    </option>
                    <option value="OPEN_SPACE">
                      <Translate contentKey="storeHouseApp.Facility.OPEN_SPACE" />
                    </option>
                    <option value="HEATED_SPACE">
                      <Translate contentKey="storeHouseApp.Facility.HEATED_SPACE" />
                    </option>
                    <option value="ORDINARY_ROOM">
                      <Translate contentKey="storeHouseApp.Facility.ORDINARY_ROOM" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="weightLabel" for="weight">
                    <Translate contentKey="storeHouseApp.product.weight">Weight</Translate>
                  </Label>
                  <AvField id="product-weight" type="string" className="form-control" name="weight" />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="storeHouseApp.product.name">Name</Translate>
                  </Label>
                  <AvField id="product-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label for="tTN.id">
                    <Translate contentKey="storeHouseApp.product.tTN">T TN</Translate>
                  </Label>
                  <AvInput id="product-tTN" type="select" className="form-control" name="tTNId">
                    <option value="" key="0" />
                    {tTNS
                      ? tTNS.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/product" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  tTNS: storeState.tTN.entities,
  productEntity: storeState.product.entity,
  loading: storeState.product.loading,
  updating: storeState.product.updating,
  updateSuccess: storeState.product.updateSuccess
});

const mapDispatchToProps = {
  getTTns,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductUpdate);
