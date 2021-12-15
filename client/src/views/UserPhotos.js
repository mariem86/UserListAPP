import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { addPhoto, deletePhoto } from "../js/actions/PhotoActions";
import AddPhotoModal from "../components/Modals/AddPhotoModal";
import PhotoCard from "../components/PhotosCard";
import search from "../assets/icons/search.svg";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Image,
  Spinner
} from "react-bootstrap";

class UserPhotos extends Component {
  state = {
    searchFilter: ""
  };

  // handle Search
  handleSearch = e => this.setState({ searchFilter: e.target.value });
  // filter Photo by Title
  filterPhoto = arrayOfPhotos =>
    arrayOfPhotos.filter(({ title }) => {
      const photoInfo = title;
      return photoInfo
        .toLowerCase()
        .includes(this.state.searchFilter.toLowerCase().trim());
    });

  //handleLoading
  comoponentIsLoading = component =>
    this.props.photos.isLoading ? (
      <Row className="d-flex justify-content-center mt-5">
        <Spinner animation="grow" />
      </Row>
    ) : (
      component
    );

  render() {
    const user = this.props.match.params.id;
    const userName = this.props.match.params.userName;
    return (
      <Container fluid>
        <Row className="pt-5 pb-4 ">
          <Col className="col-7">
            <h1>{`${userName} Gallery`}</h1>
          </Col>
          <Col className="col-2 align-self-center">
            <InputGroup>
              <InputGroup.Prepend>
                <Image src={search} className="mr-2" />
              </InputGroup.Prepend>
              <FormControl
                type="text"
                placeholder="Search..."
                onChange={this.handleSearch}
              />
            </InputGroup>
          </Col>
          <Col className="col-1 d-flex  align-self-center">
            <AddPhotoModal user={user} addPhoto={this.props.addPhoto} />
          </Col>
          <Col><Link to="/" >Back to Users List  </Link></Col>

        </Row>
        {this.comoponentIsLoading(
          <Row className="d-flex justify-content-center flex-wrap mt-3">
            {this.filterPhoto(this.props.photos.photos)
              .filter(e => e.user === user)
              .map(photo => (
                <PhotoCard
                  key={photo._id}
                  photo={photo}
                  deletePhoto={this.props.deletePhoto}
                />
              ))}
          </Row>
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  photos: state.photos,
  users: state.users.users
});

export default connect(mapStateToProps, { addPhoto, deletePhoto })(UserPhotos);
/*import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addPhoto, deletePhoto } from "../js/actions/PhotoActions";
import AddPhotoModal from "../components/Modals/AddPhotoModal";
import PhotoCard from "../components/PhotosCard";
import search from "../assets/icons/search.svg";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Image,
  Spinner
} from "react-bootstrap";

const UserPhotos = ({props}) => {
  const  photos = useSelector(state => state. photos);
  const users = useSelector(state => state.users);

  const dispatch = useDispatch();

  // const aaddUser = newUser => dispatch(addUser(newUser));
  // const eeditUser = (id, editedUser) => dispatch(editUser(id, editedUser));
  // const ddeleteUser = id => dispatch(deleteUser(id));

  const [searchFilter, setSearch] = useState("");

   //Add a User
   const handleAdd = newPhoto => dispatch(addPhoto(newPhoto));

  // handle Search
  const handleSearch = e => setSearch(e.target.value);
  //handle Delete
  const handleDelete = id => dispatch(deletePhoto(id));

  // filter users
  const filterPhoto = arrayOfUsers =>
    arrayOfUsers.filter(({ title }) => {
      const userInfo = `${title} `;
      return userInfo.toLowerCase().includes(searchFilter.toLowerCase().trim());
    });

 
  //handleLoading
  const comoponentIsLoading = component =>
  photos.isLoading ? (
      <Row className="d-flex justify-content-center mt-5">
        <Spinner animation="grow" />
      </Row>
    ) : (
      component
    );
    const user =props.match.params.id;
    const userName = props.match.params.userName;
    return (
        <Container fluid>
          <Row className="pt-5 pb-4 ">
            <Col className="col-7">
              <h1>{`${userName} Gallery`}</h1>
            </Col>
            <Col className="col-2 align-self-center">
              <InputGroup>
                <InputGroup.Prepend>
                  <Image src={search} className="mr-2" />
                </InputGroup.Prepend>
                <FormControl
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearch}
                />
              </InputGroup>
            </Col>
            <Col className="col-1 d-flex  align-self-center">
              <AddPhotoModal user={user} handleAdd={handleAdd} />
            </Col>
            <Col><Link to="/" >Back to Users List  </Link></Col>
  
          </Row>
          {comoponentIsLoading (
            <Row className="d-flex justify-content-center flex-wrap mt-3">
              {filterPhoto(photos.photos)
                .filter(e => e.user === user)
                .map(photo => (
                  <PhotoCard
                    key={photo._id}
                    photo={photo}
                    handleDelete={handleDelete}
                  />
                ))}
            </Row>
          )}
        </Container>
      );
    }

export default UserPhotos;*/
