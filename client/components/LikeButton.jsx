import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Label, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LIKE_POST_MUTATION } from "@/utils/queries";
const LikeButton = ({ post: { id, likeCount, likes } }, user) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });
  //   const likePost = () => {
  //     console.log("likePost");
  //   };

  const likeButton = user ? (
    liked ? (
      <Button basic color="teal" compact>
        <Icon name="heart" />
      </Button>
    ) : (
      <Button basic color="teal" compact>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} href="/login" basic color="teal" compact>
      <Icon name="heart" />
    </Button>
  );
  return (
    <div>
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </div>
  );
};

export default LikeButton;
