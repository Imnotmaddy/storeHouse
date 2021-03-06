import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './transport.reducer';
import { ITransport } from 'app/shared/model/transport.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITransportUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITransportUpdateState {
  isNew: boolean;
}

export class TransportUpdate extends React.Component<ITransportUpdateProps, ITransportUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { transportEntity } = this.props;
      const entity = {
        ...transportEntity,
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
    this.props.history.push('/entity/transport');
  };

  render() {
    const { transportEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="storeHouseApp.transport.home.createOrEditLabel">
              <Translate contentKey="storeHouseApp.transport.home.createOrEditLabel">Create or edit a Transport</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : transportEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="transport-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="vehicleNumberLabel" for="vehicleNumber">
                    <Translate contentKey="storeHouseApp.transport.vehicleNumber">Vehicle Number</Translate>
                  </Label>
                  <AvField id="transport-vehicleNumber" type="text" name="vehicleNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="wagonsNumberLabel" for="wagonsNumber">
                    <Translate contentKey="storeHouseApp.transport.wagonsNumber">Wagons Number</Translate>
                  </Label>
                  <AvField id="transport-wagonsNumber" type="text" name="wagonsNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="deliveryTypeLabel">
                    <Translate contentKey="storeHouseApp.transport.deliveryType">Delivery Type</Translate>
                  </Label>
                  <AvInput
                    id="transport-deliveryType"
                    type="select"
                    className="form-control"
                    name="deliveryType"
                    value={(!isNew && transportEntity.deliveryType) || 'Auto'}
                  >
                    <option value="Auto">
                      <Translate contentKey="storeHouseApp.DeliveryType.Auto" />
                    </option>
                    <option value="Train">
                      <Translate contentKey="storeHouseApp.DeliveryType.Train" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="facilityLabel">
                    <Translate contentKey="storeHouseApp.transport.facility">Facility</Translate>
                  </Label>
                  <AvInput
                    id="transport-facility"
                    type="select"
                    className="form-control"
                    name="facility"
                    value={(!isNew && transportEntity.facility) || 'REFRIGERATOR'}
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
                <Button tag={Link} id="cancel-save" to="/entity/transport" replace color="info">
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
  transportEntity: storeState.transport.entity,
  loading: storeState.transport.loading,
  updating: storeState.transport.updating,
  updateSuccess: storeState.transport.updateSuccess
});

const mapDispatchToProps = {
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
)(TransportUpdate);
