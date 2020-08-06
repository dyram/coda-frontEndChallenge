import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Icon from "@material-ui/core/Icon";

import Avatar from "@material-ui/core/Avatar";

import Axios from "axios";

import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  gridDiv: {
    padding: "2% 4%",
    display: "grid",
    gridTemplateColumns: "50% 50%",
  },
  avatarGrid: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  avatarTexts: {
    padding: "6%",
    textAlign: "center",
    color: "white",
    background: "black",
  },
}));

function Details(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [chosen, setChosen] = useState({});

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    Axios.get("http://starlord.hackerearth.com/recipe").then((res) => {
      if (res.status === 200) {
        let recId = parseInt(props.history.location.pathname[1]);
        setChosen(res.data[recId]);
      }
    });
  };

  const goBack = (e) => {
    window.location.href = "/";
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search your recipe…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.gridDiv}>
        <div>
          <span
            onClick={(e) => {
              goBack(e);
            }}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Icon>keyboard_backspace</Icon>&nbsp;&nbsp;
            <Typography variant="overline">GO BACK</Typography>
          </span>

          <div
            style={{
              verticalAlign: "middle",
              textAlign: "center",
            }}
          >
            <img
              style={{ width: "27%" }}
              src={chosen.image}
              alt={chosen.name}
            />
          </div>
          <br />
          <Typography variant="h6">Ingredients :</Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            lacinia aliquet interdum. Suspendisse potenti. Nullam malesuada
            risus enim, in dapibus orci dignissim condimentum. Nunc facilisis et
            nunc in laoreet. Nunc aliquam, nunc eu bibendum gravida, turpis
            lorem ultrices velit, vel scelerisque neque urna vel erat. Nullam
            feugiat ante et nisi semper consequat. Pellentesque magna dui,
            euismod sed efficitur ut, rhoncus vel massa. Ut pharetra, magna
            vitae elementum egestas, libero ligula ultricies ex, ac maximus est
            dolor a orci. Integer euismod rhoncus ligula, eget commodo purus.
          </Typography>
          <br />
          <Typography variant="h6">How to prepare :</Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            lacinia aliquet interdum. Suspendisse potenti. Nullam malesuada
            risus enim, in dapibus orci dignissim condimentum.
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            lacinia aliquet interdum. Suspendisse potenti. Nullam malesuada
            risus enim, in dapibus orci dignissim condimentum.
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            lacinia aliquet interdum. Suspendisse potenti. Nullam malesuada
            risus enim, in dapibus orci dignissim condimentum.
          </Typography>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ textAlign: "right", padding: "2%" }}>
            <Typography variant="overline">RECIPE</Typography>
            <Typography variant="h6" className={classes.title}>
              {chosen.name}
            </Typography>

            <span
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <mark
                style={{
                  background: "black",
                  color: "white",
                  padding: "0% 2%",
                  marginLeft: "auto",
                }}
              >
                4 / 5
              </mark>
              <Icon>grade</Icon>
              <Icon>grade</Icon>
              <Icon>grade</Icon>
              <Icon>grade</Icon>
            </span>

            <Typography variant="overline">DESCRIPTION</Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              lacinia aliquet interdum. Suspendisse potenti. Nullam malesuada
              risus enim, in dapibus orci dignissim condimentum.Nullam malesuada
              risus enim, in dapibus orci dignissim condimentum.
            </Typography>
            <br />

            <span className={classes.avatarGrid}>
              <Avatar
                style={{ marginLeft: "30%" }}
                className={classes.avatarTexts}
              >
                <span>
                  8<br />
                  Ingredients
                </span>
              </Avatar>
              <Avatar className={classes.avatarTexts}>
                <span>
                  220
                  <br />
                  Pounds
                </span>
              </Avatar>
              <Avatar className={classes.avatarTexts}>
                <span>
                  25
                  <br />
                  Minutes
                </span>
              </Avatar>
            </span>
            <br />

            <span style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ marginLeft: "auto" }} variant="button">
                Favorite this recipe
              </Typography>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Icon style={{ color: "red" }}>favorite</Icon>
            </span>
            <hr />

            <div style={{ textAlign: "left" }}>
              <Typography variant="overline">ADD COMMENTS</Typography>
              <br />
              <TextField
                style={{ minWidth: "100%" }}
                id="outlined-multiline-static"
                label="Say something here..."
                multiline
                rows={4}
                variant="outlined"
              />
              <br />
              <br />

              <Button
                style={{
                  minWidth: "100%",
                  background: "black",
                  color: "white",
                }}
                variant="contained"
              >
                Add Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Details);
