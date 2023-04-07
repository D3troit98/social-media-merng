import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import Link from "next/link";
import moment from "moment";
import { useStateContext } from "@/context/auth";
import LikeButton from "./LikeButton";
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
  console.log(post);
  const { user } = useStateContext();

  const commentOnPost = () => {
    console.log("comment on post");
  };
  return (
    <Card
      fluid
      style={{
        width: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <Card.Content>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            alignItems: "center",
            alignSelf: "start",
            marginBottom: "10px",
          }}
        >
          <Image
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
          <Card.Header>{username}</Card.Header>
        </div>
        <Card.Meta as={Link} href={`posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>

      <Card.Content>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <Button
            as={Link}
            href={`/posts/${id}`}
            labelPosition="right"
            onClick={commentOnPost}
          >
            <Button basic color="blue" compact>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
          {user && user.username === username && (
            <Button
              as="div"
              color="red"
              floated="left"
              onClick={() => console.log("Delete post")}
            >
              <Icon name="trash" style={{ margin: 0 }} />
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
