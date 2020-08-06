import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Icon from "@material-ui/core/Icon";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";

import Axios from "axios";

import { withRouter } from "react-router-dom";

import Liked from "./Liked";

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
    backgroundColor: fade(theme.palette.common.white, 0.55),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.75),
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
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    width: 750,
    height: 450,
  },
  icon: {
    color: "white",
  },
}));

function HomePage() {
  const classes = useStyles();

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    Axios.get("http://starlord.hackerearth.com/recipe").then((res) => {
      if (res.status === 200) {
        setRecipes([...res.data]);
        localStorage.setItem("recipe", JSON.stringify(res.data));
      }
    });
  };

  const chooseRecipe = (id) => {
    console.log("id", id);
    window.location.href = `/${id}`;
  };

  const searchRec = (e) => {
    let val = e.target.value;
    let json = JSON.parse(localStorage.getItem("recipe"));

    setRecipes(
      ...[
        json.filter(function (object) {
          return object.name.match(new RegExp(val, "gi"));
        }),
      ]
    );
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
              onInput={(e) => {
                searchRec(e);
              }}
            />
          </div>
        </Toolbar>
      </AppBar>

      <div style={{ textAlign: "right", padding: "2%", marginRight: "23%" }}>
        <Typography variant="overline">CATEGORY</Typography>
        <Typography variant="h6" className={classes.title}>
          Pizza {"&"} Noodles
        </Typography>
      </div>

      <div className={classes.gridDiv}>
        <GridList cellHeight={240} cols={4} className={classes.gridList}>
          {recipes.map((tile) => (
            <GridListTile key={tile.image}>
              <img
                onClick={(e) => {
                  chooseRecipe(tile.id);
                }}
                src={tile.image}
                alt={tile.name}
              />
              <GridListTileBar
                style={{ height: "13vh" }}
                title={
                  <React.Fragment>
                    {tile.name}
                    <br />
                    <span
                      style={{
                        display: "flex",
                        fontSize: "80%",
                        alignItems: "center",
                      }}
                    >
                      <Icon>schedule</Icon>&nbsp;&nbsp;24mins
                    </span>
                  </React.Fragment>
                }
                subtitle={
                  <React.Fragment>
                    <br />
                    <Typography variant="subtitle">
                      {tile.description}
                    </Typography>
                  </React.Fragment>
                }
                actionIcon={<Liked />}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}

export default withRouter(HomePage);
