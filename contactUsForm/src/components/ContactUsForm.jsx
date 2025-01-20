import { useState, useEffect } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    country: '',
    state: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries');
        const data = await response.json();
        setCountries(data.data.map(country => country.country));
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
      setLoading(false);
    };

    fetchCountries();
  }, []);

  const fetchStates = async (country) => {
    setStateLoading(true);
    try {
      const response = await fetch(`https://countriesnow.space/api/v0.1/countries/states`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country })
      });
      const data = await response.json();

      if (data.error || !data.data || !data.data.states) {
        console.error('Error fetching states:', data.error);
        setStates([]);
      } else {
        setStates(data.data.states.map(state => state.name));
      }
    } catch (error) {
      console.error('Error fetching states:', error);
      setStates([]);
    }
    setStateLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    if (name === 'country' && value) {
      fetchStates(value);
      setFormData(prev => ({
        ...prev,
        state: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3 || formData.name.length > 20) {
      newErrors.name = 'Name must be between 3 and 20 characters';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length < 4 || formData.address.length > 200) {
      newErrors.address = 'Address must be between 4 and 200 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedData(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Contact Form</h2>

        {/* Name Input */}
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <ErrorMessage message={errors.name} />}
        </div>

        {/* Address Input */}
        <div>
          <label className="block mb-2">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            rows="3"
          />
          {errors.address && <ErrorMessage message={errors.address} />}
        </div>

        {/* Phone Input */}
        <div>
          <label className="block mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phone && <ErrorMessage message={errors.phone} />}
        </div>

        {/* Country Dropdown */}
        <div>
          <label className="block mb-2">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
            disabled={loading}
          >
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {loading && <LoadingMessage text="Loading countries..." />}
          {errors.country && <ErrorMessage message={errors.country} />}
        </div>

        {/* State Dropdown */}
        <div>
          <label className="block mb-2">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
            disabled={!formData.country || stateLoading}
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {stateLoading && <LoadingMessage text="Loading states..." />}
          {errors.state && <ErrorMessage message={errors.state} />}
        </div>

        {/* Email Input */}
        <div>
          <label className="block mb-2">Email (Optional)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded border-gray-300"
          />
          {errors.email && <ErrorMessage message={errors.email} />}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
          Submit
        </button>
      </form>
      {/* Display Submitted Data */}
       {submittedData && (
         <div className="mt-8 p-6 bg-gray-50 rounded-lg">
           <h3 className="text-xl font-bold mb-4">Submitted Information</h3>
           <div className="space-y-2">
             <p><strong>Name:</strong> {submittedData.name}</p>
             <p><strong>Address:</strong> {submittedData.address}</p>
             <p><strong>Phone:</strong> {submittedData.phone}</p>
             <p><strong>Country:</strong> {submittedData.country}</p>
             <p><strong>State:</strong> {submittedData.state}</p>
             {submittedData.email && <p><strong>Email:</strong> {submittedData.email}</p>}
           </div>
         </div>
       )}
    </div>
  );
};

const ErrorMessage = ({ message }) => (
  <p className="text-red-500 text-sm mt-1 flex items-center">
    <AlertCircle className="w-4 h-4 mr-1" />
    {message}
  </p>
);

const LoadingMessage = ({ text }) => (
  <div className="flex items-center mt-2">
    <Loader2 className="w-4 h-4 animate-spin mr-2" />
    {text}
  </div>
);

export default ContactUsForm;
