// import React, { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api")
//       .then((response) => response.json())
//       .then((data) => setItems(data))
//       .catch((error) => console.error("Error fetching the API:", error));
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <ul>
//           {items.map((item, index) => (
//             <li key={index}>{item.name}</li>
//           ))}
//         </ul>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching the API:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", email: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setUsers([...users, data]);
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Registration</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
        <h2>Registered Users</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
