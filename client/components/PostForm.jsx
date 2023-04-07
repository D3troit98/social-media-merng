import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useForm } from "@/utils/hooks";
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from "@/utils/queries";
const PostForm = () => {
  const { values, onChange, handleSubmit } = useForm(createPostCallBack, {
    body: "",
  });
  const [errors, setErrors] = useState(null);
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    errorPolicy: "all",
    update(proxy, result) {
      if (result.errors) setErrors(result.errors[0].message);

      if (result.data) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        data.getPosts = [result.data.createPosts, ...data.getPosts];
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
        values.body = "";
      }
      console.log(result);
    },
  });

  function createPostCallBack() {
    createPost();
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi Wordl!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button
            type="submit"
            color="teal"
            style={{ justifyContent: "start", display: "flex" }}
          >
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            {/* <li>{error.graphQLErrors[0].message}</li> */}
            <li>{errors}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostForm;
