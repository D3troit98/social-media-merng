import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import Link from "next/link";
import moment from "moment";

const PostCard = ({ post }) => {
  const {
    id,
    body,
    createdAt,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  } = post;

  const likePost = () => {
    console.log("likePost");
  };

  const commentOnPost = () => {
    console.log("comment on post");
  };
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} href={`posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        <div style={{ width: "auto" }}>
          <Button as="div" labelPosition="right" onClick={likePost}>
            <Button basic color="teal" compact>
              <Icon name="heart" />
            </Button>
            <Label basic color="teal" pointing="left">
              {likeCount}
            </Label>
          </Button>
          <Button as="div" labelPosition="right" onClick={commentOnPost}>
            <Button basic color="blue" compact>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
