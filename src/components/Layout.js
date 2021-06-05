import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Container,
  //   Button,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getMovies, resetMovies, autoComplete } from "../_actions/movies";

function Layout(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [search, setSearch] = useState("");
  const [listAutoComplete, setListAutoComplete] = useState([]);
  const handleAutoComplete = (value) => {
    console.log("autocompletevalue", value);
    dispatch(autoComplete(value)).then(
      (res) => res.Search && setListAutoComplete(res.Search)
    );

    // dispatch(updateBasicDisc(values, ID)).then((res) => {
    //         res.error === true ? alert(res.message) : history.push("/program");
    //       })
  };
  const handleSubmit = (e, values) => {
    console.log("YG DI CARI : ", search);
    dispatch(resetMovies());
    history.push({ pathname: "/", state: { search: search } });
  };

  const handleChange = (e) => {
    console.log("e change", e.target.name);
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" style={{ marginBottom: "10px" }}>
        <Navbar.Brand>Movie</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link
            onClick={() => {
              dispatch(resetMovies());
              history.push({
                pathname: "/",
                state: { search: "Batman" },
              });
            }}
          >
            Home
          </Nav.Link>
        </Nav>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          {/* <FormControl
            required
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
          {/* <div style={{ width: 300 }}> */}
          <Autocomplete
            freeSolo
            disableClearable
            options={listAutoComplete.map((option) => option.Title)}
            onChange={(e, values) => setSearch(values)}
            renderInput={(params) => (
              <div>
                <TextField
                  {...params}
                  style={{ width: "200px", margin: "0", marginRight: "2px" }}
                  size="small"
                  margin="normal"
                  variant="outlined"
                  placeholder="pencarian..."
                  InputProps={{ ...params.InputProps, type: "search" }}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    handleAutoComplete(e.target.value);
                  }}
                />
                {/* <Button
                    variant="outline-success"
                    type="submit"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   handleSubmit();
                    // }}
                  >
                    Search
                  </Button> */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  //   className={classes.submit}
                >
                  Cari
                </Button>
              </div>
            )}
          />

          {/* <Button
            type="submit"
            variant="contained"
            color="primary"
            //   className={classes.submit}
          >
            Submit
          </Button> */}
          {/* </div> */}
        </form>
      </Navbar>
      {props.children}
    </div>
  );
}

export default Layout;