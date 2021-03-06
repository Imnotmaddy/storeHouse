import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './ttn.reducer';
import { ITTN } from 'app/shared/model/ttn.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITTNProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ITTNState {
  search: string;
}

export class TTN extends React.Component<ITTNProps, ITTNState> {
  state: ITTNState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.setState({ search: '' }, () => {
      this.props.getEntities();
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { tTNList, match } = this.props;
    return (
      <div>
        <h2 id="ttn-heading">
          <Translate contentKey="storeHouseApp.tTN.home.title">TTNS</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="storeHouseApp.tTN.home.createLabel">Create new TTN</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('storeHouseApp.tTN.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.tTN.serialNumber">Serial Number</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.tTN.dateOfCreation">Date Of Creation</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.tTN.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.tTN.productsAmount">Products Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.tTN.numberOfProductEntries">Number Of Product Entries</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.tTN.dateTimeOfRegistration">Date Time Of Registration</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.tTN.isAccepted">Is Accepted</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.tTN.storehouseDispatcher">Storehouse Dispatcher</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.tTN.manager">Manager</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.tTN.sender">Sender</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.tTN.transport">Transport</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.tTN.transporter">Transporter</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.tTN.driver">Driver</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.tTN.recipient">Recipient</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tTNList.map((tTN, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tTN.id}`} color="link" size="sm">
                      {tTN.id}
                    </Button>
                  </td>
                  <td>{tTN.serialNumber}</td>
                  <td>
                    <TextFormat type="date" value={tTN.dateOfCreation} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{tTN.description}</td>
                  <td>{tTN.productsAmount}</td>
                  <td>{tTN.numberOfProductEntries}</td>
                  <td>
                    <TextFormat type="date" value={tTN.dateTimeOfRegistration} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{tTN.isAccepted ? 'true' : 'false'}</td>
                  <td>
                    {tTN.storehouseDispatcherName ? (
                      <Link to={`app-user/${tTN.storehouseDispatcherId}`}>{tTN.storehouseDispatcherName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{tTN.managerName ? <Link to={`app-user/${tTN.managerId}`}>{tTN.managerName}</Link> : ''}</td>
                  <td>{tTN.senderName ? <Link to={`app-user/${tTN.senderId}`}>{tTN.senderName}</Link> : ''}</td>
                  <td>{tTN.transportFacility ? <Link to={`transport/${tTN.transportId}`}>{tTN.transportFacility}</Link> : ''}</td>
                  <td>
                    {tTN.transporterCompanyName ? <Link to={`transporter/${tTN.transporterId}`}>{tTN.transporterCompanyName}</Link> : ''}
                  </td>
                  <td>{tTN.driverName ? <Link to={`driver/${tTN.driverId}`}>{tTN.driverName}</Link> : ''}</td>
                  <td>{tTN.recipientCompanyName ? <Link to={`recipient/${tTN.recipientId}`}>{tTN.recipientCompanyName}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tTN.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tTN.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tTN.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tTN }: IRootState) => ({
  tTNList: tTN.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TTN);
