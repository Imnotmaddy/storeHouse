import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProductState {
  search: string;
}

export class Product extends React.Component<IProductProps, IProductState> {
  state: IProductState = {
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
    const { productList, match } = this.props;
    return (
      <div>
        <h2 id="product-heading">
          <Translate contentKey="storeHouseApp.product.home.title">Products</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="storeHouseApp.product.home.createLabel">Create new Product</Translate>
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
                    placeholder={translate('storeHouseApp.product.home.search')}
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
                  <Translate contentKey="storeHouseApp.product.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.product.quantity">Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.product.state">State</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.product.daysInStorage">Days In Storage</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.product.cost">Cost</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.product.requiredFacility">Required Facility</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.product.weight">Weight</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.product.act">Act</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.product.storageRoom">Storage Room</Translate>
                </th>
                <th>
                  <Translate contentKey="storeHouseApp.product.tTN">T TN</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {productList.map((product, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${product.id}`} color="link" size="sm">
                      {product.id}
                    </Button>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <Translate contentKey={`storeHouseApp.ProductState.${product.state}`} />
                  </td>
                  <td>{product.daysInStorage}</td>
                  <td>{product.cost}</td>
                  <td>
                    <Translate contentKey={`storeHouseApp.Facility.${product.requiredFacility}`} />
                  </td>
                  <td>{product.weight}</td>
                  <td>{product.actId ? <Link to={`act/${product.actId}`}>{product.actId}</Link> : ''}</td>
                  <td>
                    {product.storageRoomId ? <Link to={`storage-room/${product.storageRoomId}`}>{product.storageRoomRoomNumber}</Link> : ''}
                  </td>
                  <td>{product.tTNId ? <Link to={`ttn/${product.tTNId}`}>{product.tTNSerialNumber}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${product.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${product.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${product.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ product }: IRootState) => ({
  productList: product.entities
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
)(Product);
