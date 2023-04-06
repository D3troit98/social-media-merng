import { useMutation } from "@apollo/client";
import { useState, useContext, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { LOGIN_USER } from "@/utils/queries";
import { useForm } from "@/utils/hooks";
import { useStateContext } from "@/context/auth";
const Login = () => {
  const { user, login } = useStateContext();
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { handleSubmit, onChange, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      console.log(result);
      if (result.errors) setErrors(result.errors[0].extensions.errors);

      if (result.data.login) {
        login(result.data.login);
        router.push("/");
      }
    },
    variables: values,
    errorPolicy: "all",
  });

  function loginUserCallback() {
    loginUser();
  }

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="form-container">
      <Form
        onSubmit={handleSubmit}
        noValidate
        style={{ marginTop: "15px" }}
        className={loading ? "loading" : ""}
      >
        <h1>Login</h1>

        <Form.Field>
          <label>Username</label>
          <Form.Input
            type="text"
            name="username"
            value={values.username}
            onChange={onChange}
            placeholder="Username"
            error={errors.username ? true : false}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Form.Input
            type="password"
            name="password"
            value={values.password}
            onChange={onChange}
            placeholder="Password..."
            error={errors.password ? true : false}
          />
        </Form.Field>

        <Button type="submit" color="teal">
          Login
        </Button>
      </Form>
      {Object?.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
