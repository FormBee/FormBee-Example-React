import { useState } from 'react';
import './App.css';

function App() {
  // include your fields here, you can add as many as you want, just make sure they are unique.
  const [formData, setFormData] = useState({ field1: '', field2: '', field3: '' });
  const apiKey = 'YOUR_API_KEY';

  // handle form data changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // send form data to FormBee
    fetch(`http://localhost:3000/formbee/${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then(response => {
      if (response.ok) {
        alert('Form submitted successfully');
      } else {
        alert('Form submission failed');
      }
    }).catch(err => {
      console.error('Error:', err);
      alert('Form submission failed');
    });
  };

  // render form
  return (
    <div className="App">
      {/* make submit button call handleSubmit */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            // make sure to include the name attribute
            name="field1"
            // set the initial value of the field
            value={formData.field1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="field2"
            value={formData.field2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="field3"
            value={formData.field3}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
