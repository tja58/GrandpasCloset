const email_regex = new RegExp(
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
);
const pass_regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const pnum_regex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

////////////////////////////////////////////////////////////////////////////
// Validate Register Inputs
//
// Inputs
//    Values - {fname, lname, email, pnum, password, confirmPass}
////////////////////////////////////////////////////////////////////////////
export function validateRegister(values) {
  const { email, pnum, password, confirmPass } = values;

  const result = [];

  // Case invalid email
  if (!email_regex.exec(email)) {
    result.push(["email", "Invalid email"]);
  }

  // Case invalid phone number
  if (!pnum_regex.exec(pnum) && !pnum === "") {
    result.push(["pNum", "Invalid phone number"]);
  }

  // Case invalid password
  if (!pass_regex.exec(password)) {
    result.push([
      "password",
      "Password must contain 1 capital letter, 1 number, and 1 special character",
    ]);
  }

  // Case confirm pass matches pass
  if (!(password === confirmPass)) {
    result.push(["confirmPassword", "Passwords do not match"]);
  }

  // If errors
  if (result.length > 0) {
    return [false, result];
  }
  // If no errors
  return [true];
}

////////////////////////////////////////////////////////////////////////////
// Validate Login Inputs
//
// Inputs
//    Values - {email, password}
////////////////////////////////////////////////////////////////////////////
export function validateLogin(values) {
  const { email } = values;

  const result = [];

  // Invalid Email Format
  if (!email_regex.exec(email)) {
    result.push(["email", "Invalid Email"]);
  }

  // If errors return false and errors
  if (result.length > 0) {
    return [false, result];
  }

  // If no errors return true
  return [true];
}

export function renderRegInputs() {
  return regInputValues.map(({ placeholder, Label, name, type, required }) => {
    return (
      <div key={name}>
        <label htmlFor={name}>
          {Label}
          {required ? "*" : ""}
        </label>
        <input
          placeholder={placeholder}
          name={name}
          required={required}
          type={type}
          id={`input-${name}`}
          onChange={() => errorCheck(`input-${name}`, name)}
        />
        <span
          className={
            name === "password" ? "input-error password-error" : "input-error"
          }
          id={name}
        ></span>
      </div>
    );
  });
}

export function renderLoginInputs() {
  // Create inputs
  return loginInputValues.map(
    ({ placeholder, Label, name, type, required }) => {
      return (
        <div key={name}>
          <label htmlFor={name}>{Label}</label>
          <input
            placeholder={placeholder}
            name={name}
            required={required}
            type={type}
            id={`input-${name}`}
            onChange={() => errorCheck(`input-${name}`, name)}
          />
          <span className="input-error" id={name}></span>
        </div>
      );
    }
  );
}

function errorCheck(value, type) {
  const input = document.getElementById(value);
  if (input.classList.contains("invalid-input")) {
    input.classList.remove("invalid-input");
    document.getElementById(type).innerHTML = "";
  }
}

const loginInputValues = [
  {
    placeholder: "Enter email address",
    Label: "Email Address",
    name: "email",
    type: "email",
    required: true,
  },
  {
    placeholder: "Enter password",
    Label: "Password",
    name: "password",
    type: "password",
    required: true,
  },
];

const regInputValues = [
  {
    placeholder: "Enter first name",
    Label: "First Name",
    name: "fname",
    type: "text",
    required: true,
  },
  {
    placeholder: "Enter last name",
    Label: "Last Name",
    name: "lName",
    type: "text",
    required: true,
  },
  {
    placeholder: "Enter email address",
    Label: "Email Address",
    name: "email",
    type: "email",
    required: true,
  },
  {
    placeholder: "Enter phone number",
    Label: "Phone Number",
    name: "pNum",
    type: "tel",
    required: false,
  },
  {
    placeholder: "Create password",
    Label: "Create Password",
    name: "password",
    type: "password",
    required: true,
  },
  {
    placeholder: "Confirm password",
    Label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    required: true,
  },
];
