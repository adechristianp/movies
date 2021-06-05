import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Container,
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Card,
  Row,
  Col,
  Image,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getMovies, resetMovies, loadMore } from "../_actions/movies";

function App({ listMovies }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [preview, setPreview] = useState([]);
  const [movies, setMovies] = useState([]);
  const [max, setMax] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("Batman");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const observer = useRef();
  const lastBookElementRef = useCallback((node) => {
    if (loading) return;
    if (max) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoading(true);
        console.log("max", max);
        console.log("load more");
        handleLoadMore();
      }
    });
    if (node) observer.current.observe(node);
  });

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setPreview(data);
    setShow(true);
  };

  //CEK INI
  //   useEffect(() => {
  //     setPage(1);
  //     dispatch(
  //       getMovies(
  //         history.location.state != undefined
  //           ? history.location.state.search
  //           : "Batman",
  //         page,
  //         1
  //       )
  //     );
  //     return () => dispatch(resetMovies());
  //   }, []);
  // DAN INI
  useEffect(() => {
    console.log("listmovies", listMovies);
    setPage(1);
    setMax(false);
    dispatch(
      getMovies(
        history.location.state != undefined
          ? history.location.state.search
          : "Batman",
        1,
        1
      )
    );
  }, [history.location.state]);

  useEffect(() => {
    setMovies(listMovies.data.Search);
  }, [listMovies]);

  const handleLoadMore = () => {
    setPage(page + 1);
    dispatch(
      getMovies(
        history.location.state != undefined
          ? history.location.state.search
          : "Batman",
        page + 1,
        0
      )
    ).then((res) => {
      console.log("res", res);
      const newObj = res.Search;
      res.Response == "True"
        ? setMovies((old) => [...old, ...newObj])
        : setMax(true);
      setLoading(false);
    });
  };
  const handleScroll = (e) => {
    const target = e.target;
    console.log(target.scrollHeight);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>{preview.Title}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Image src={preview.Poster} />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      <Container>
        {movies
          ? movies.map((res, index) => {
              if (movies.length === index + 1) {
                return (
                  <div key={res.imdbID} ref={lastBookElementRef}>
                    <Card style={{ marginBottom: "5px" }}>
                      <Card.Body style={{ padding: "0", minHeight: "50px" }}>
                        <Card.Text>
                          <Image
                            style={{ height: "50px", maxWidth: "35px" }}
                            src={res.Poster}
                            fluid
                            onClick={() => handleShow(res)}
                          />
                          <span
                            onClick={() =>
                              history.push({
                                pathname: "/single",
                                state: { ID: res.imdbID },
                              })
                            }
                          >
                            {" " + res.Title} ({res.Year})
                          </span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              } else {
                return (
                  <div key={res.imdbID}>
                    <Card style={{ marginBottom: "5px" }}>
                      <Card.Body style={{ padding: "0", minHeight: "50px" }}>
                        <Card.Text>
                          <Image
                            style={{ height: "50px", maxWidth: "35px" }}
                            src={res.Poster}
                            fluid
                            onClick={() => handleShow(res)}
                          />
                          <span
                            onClick={() =>
                              history.push({
                                pathname: "/single",
                                state: { ID: res.imdbID },
                              })
                            }
                          >
                            {" " + res.Title} ({res.Year})
                          </span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              }
            })
          : "No data found"}
        {loading && "Loading ..."}
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    listMovies: state.movies,
  };
};

export default connect(mapStateToProps)(App);
