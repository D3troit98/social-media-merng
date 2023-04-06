import { gql, useMutation } from "@apollo/client";
import { useState, useContext, useEffect } from "react";
import { Form, Checkbox, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { REGISTER_USER } from "@/utils/queries";
import { useForm } from "@/utils/hooks";
import { useStateContext } from "@/context/auth";
const Register = () => {
  const [errors, setErrors] = useState({});
  const { user, login } = useStateContext();
  const router = useRouter();
  const { handleSubmit, onChange, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      if (result.errors) setErrors(result.errors[0].extensions.errors);

      if (result.data.register) {
        login(result.data.register);
        router.push("/");
      }
    },
    variables: values,
    errorPolicy: "all",
  });

  function registerUser() {
    addUser();
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
        <h1>Register</h1>
        <Form.Field>
          <label>Email</label>
          <Form.Input
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            placeholder="Email"
            error={errors.email ? true : false}
          />
        </Form.Field>
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
        <Form.Field>
          <label>Confirm Password</label>
          <Form.Input
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password..."
            error={errors.confirmPsssword ? true : false}
          />
        </Form.Field>

        <Button type="submit" color="teal">
          Register
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

export default Register;
