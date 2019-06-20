import React, { Component } from "react";
import FormikForm from "./form";
import { Card } from "antd";
import * as Yup from "yup";
import { db } from "./firebase";
import styled from "styled-components";

const Input = styled("input")`
  border-radius: 30px;
  padding: 8px 16px;
`;

const centres = [
  {
    name: "title",
    label: "Centre title",
    type: "input"
  },
  {
    name: "headerImage",
    label: "Header Image",
    type: "select",
    component: "select",
    options: [1, 2, 3, 4, 5, 6]
  },
  {
    name: "email",
    label: "Email address",
    type: "input",
    yup: {
      type: "string",
      checks: [
        {
          key: "email",
          val: true,
          err: "is not a valid email"
        }
      ]
    }
  },
  {
    name: "telephone",
    label: "Telephone Number",
    type: "input"
  },
  {
    name: "mobile",
    label: "Mobile Number",
    type: "input"
  },
  {
    name: "about",
    label: "About",
    type: "textarea"
  },
  {
    name: "howItWorks",
    label: "How it works",
    type: "textarea"
  },
  {
    name: "nextSteps",
    label: "Next Steps",
    type: "textarea"
  },
  {
    name: "address",
    label: "Address",
    type: "input"
  },
  {
    name: "openingTimes",
    label: "Opening Times",
    object: [
      {
        name: "address",
        label: "Address",
        component: "input",
        type: "text"
      }
    ],
    buttonLabel: "Add opening time"
  }
];

const userLoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email address")
    .email()
    .required("Please enter a valid email address"),
  password: Yup.string()
    .required("Please enter a valid passowrd")
    .min(6)
});

class App extends Component {
  state = {};

  componentDidMount() {
    db.collection("schema")
      .doc("form")
      .get()
      .then(doc => {
        console.log(doc.data());
        this.setState({ schema: doc.data().schema });
      });
  }
  render() {
    return (
      <div
        style={{
          width: "70%",
          margin: "40px auto",
          display: "flex",
          contentAlign: "center"
        }}
      >
        <div
          style={{
            flex: 2,
            display: "flex",
            justifySelf: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <h1>Tickle Forms</h1>
          {this.state.schema && <FormikForm fields={centres} card={Card} />}
        </div>
        <div style={{ flex: 1 }}>
          <h1>Firebase</h1>
          <pre>{JSON.stringify(this.state.schema, undefined, 2)}</pre>
        </div>
        <div style={{ flex: 1 }}>
          Add schema
          <form
            onSubmit={e => {
              e.preventDefault();
              db.collection("schema")
                .doc("form")
                .set({ schema: centres })
                .then(() => {
                  console.log("hello");
                });
            }}
          >
            <button>Reset Firebase schema</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
