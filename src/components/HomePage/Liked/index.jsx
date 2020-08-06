import React, { useState } from "react";

import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

export default function Liked() {
  const [isLiked, setIsLiked] = useState(false);

  const likedRecipe = () => {
    isLiked ? setIsLiked(false) : setIsLiked(true);
  };

  return (
    <div>
      <IconButton onClick={likedRecipe}>
        {!isLiked ? (
          <Icon style={{ color: "white" }}>favorite_border</Icon>
        ) : (
          <Icon style={{ color: "red" }}>favorite</Icon>
        )}
      </IconButton>
    </div>
  );
}
