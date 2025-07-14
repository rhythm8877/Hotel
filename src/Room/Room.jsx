"use client";

import { useState } from "react";
import Select from "react-select";
import "./Room.css";

const Room = () => {
  const [isFormView, setIsFormView] = useState(false);
  const [selectedAccommodationType, setSelectedAccommodationType] = useState({ value: "All", label: "All" });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingApplication, setEditingApplication] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    requisitionType: "Room",
    isOfficialGuest: false,
    accommodationType: "",
    requisitionerName: "",
    address: "",
    date: "",
    age: "",
    guestType: "",
    arrivalDate: "",
    arrivalHour: "",
    arrivalMinute: "",
    arrivalSecond: "",
    departureDate: "",
    departureHour: "",
    departureMinute: "",
    departureSecond: "",
    guests: [
      {
        id: 1,
        name: "",
        relationship: "",
        sex: "",
        age: ""
      }
    ]
  });

  // Dummy application data
  const [applicationData, setApplicationData] = useState([
    {
      id: 1,
      requisitionType: "Room",
      accommodationType: "Single Room",
      requisitionerName: "John Doe",
      date: "15-01-2025",
      extensionOfStay: ""
    },
    {
      id: 2,
      requisitionType: "Room",
      accommodationType: "Double Room",
      requisitionerName: "Jane Smith",
      date: "16-01-2025",
      extensionOfStay: ""
    },
    {
      id: 3,
      requisitionType: "Room",
      accommodationType: "Deluxe Suite",
      requisitionerName: "Robert Johnson",
      date: "17-01-2025",
      extensionOfStay: ""
    },
    {
      id: 4,
      requisitionType: "Room",
      accommodationType: "Standard Room",
      requisitionerName: "Emily Davis",
      date: "18-01-2025",
      extensionOfStay: ""
    },
    {
      id: 5,
      requisitionType: "Room",
      accommodationType: "Family Suite",
      requisitionerName: "Michael Wilson",
      date: "19-01-2025",
      extensionOfStay: ""
    }
  ]);

  // Accommodation type options
  const accommodationTypeOptions = [
    { value: "All", label: "All" },
    { value: "Single Room", label: "Single Room" },
    { value: "Double Room", label: "Double Room" },
    { value: "Standard Room", label: "Standard Room" },
    { value: "Deluxe Room", label: "Deluxe Room" },
    { value: "Deluxe Suite", label: "Deluxe Suite" },
    { value: "Family Suite", label: "Family Suite" },
    { value: "Executive Suite", label: "Executive Suite" }
  ];

  // Guest type options
  const guestTypeOptions = [
    { value: "", label: "Select Department" },
    { value: "Faculty", label: "Faculty" },
    { value: "Staff", label: "Staff" },
    { value: "Student", label: "Student" },
    { value: "Visitor", label: "Visitor" },
    { value: "Official", label: "Official" },
    { value: "Guest", label: "Guest" }
  ];

  // Relationship options
  const relationshipOptions = [
    { value: "", label: "Select Relationship" },
    { value: "Self", label: "Self" },
    { value: "Spouse", label: "Spouse" },
    { value: "Child", label: "Child" },
    { value: "Parent", label: "Parent" },
    { value: "Sibling", label: "Sibling" },
    { value: "Friend", label: "Friend" },
    { value: "Colleague", label: "Colleague" },
    { value: "Other", label: "Other" }
  ];

  // Sex options
  const sexOptions = [
    { value: "", label: "Select Sex" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" }
  ];

  // Filter applications based on search term and accommodation type
  const filteredApplications = applicationData.filter(application => {
    const matchesSearch = application.requisitionerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAccommodationType = selectedAccommodationType.value === "All" ||
      application.accommodationType === selectedAccommodationType.value;

    return matchesSearch && matchesAccommodationType;
  });

  // Add new guest row
  const addGuestRow = () => {
    const newGuest = {
      id: Date.now(),
      name: "",
      relationship: "",
      sex: "",
      age: ""
    };
    setFormData(prev => ({
      ...prev,
      guests: [...prev.guests, newGuest]
    }));
  };



  // Update guest data
  const updateGuest = (guestId, field, value) => {
    setFormData(prev => ({
      ...prev,
      guests: prev.guests.map(guest =>
        guest.id === guestId ? { ...guest, [field]: value } : guest
      )
    }));
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };



  // Handle inline edit
  const handleInlineEdit = (application) => {
    setEditingRowId(application.id);
    setEditingApplication({ ...application });
  };

  // Handle save inline edit
  const handleSaveInlineEdit = () => {
    if (!editingApplication.requisitionerName.trim()) {
      alert("Please enter requisitioner name");
      return;
    }
    if (!editingApplication.accommodationType) {
      alert("Please select accommodation type");
      return;
    }
    if (!editingApplication.date) {
      alert("Please select date");
      return;
    }

    setApplicationData(prev => prev.map(app =>
      app.id === editingApplication.id ? editingApplication : app
    ));
    setEditingRowId(null);
    setEditingApplication(null);
    alert("Application updated successfully!");
  };

  // Handle cancel inline edit
  const handleCancelInlineEdit = () => {
    setEditingRowId(null);
    setEditingApplication(null);
  };

  // Handle inline field change
  const handleInlineFieldChange = (field, value) => {
    setEditingApplication(prev => ({ ...prev, [field]: value }));
  };

  // Handle delete application
  const handleDelete = (applicationId) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      setApplicationData(prev => prev.filter(app => app.id !== applicationId));
      alert("Application deleted successfully!");
    }
  };

  // Custom select styles to match theme
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: '200px',
      border: '1px solid var(--room-entry-border-color)',
      borderRadius: '6px',
      fontSize: '14px',
      '&:hover': {
        borderColor: 'var(--room-entry-primary-color)'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'var(--room-entry-primary-color)' : 'white',
      color: state.isSelected ? 'white' : '#333',
      '&:hover': {
        backgroundColor: state.isSelected ? 'var(--room-entry-primary-color)' : 'var(--room-entry-primary-light)'
      }
    })
  };

  // Table select styles for compact dropdowns
  const tableSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '35px',
      height: '35px',
      border: '1px solid var(--room-entry-border-color)',
      borderRadius: '4px',
      fontSize: '13px',
      '&:hover': {
        borderColor: 'var(--room-entry-primary-color)'
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '35px',
      padding: '0 8px'
    }),
    input: (provided) => ({
      ...provided,
      margin: '0px'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '35px'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'var(--room-entry-primary-color)' : 'white',
      color: state.isSelected ? 'white' : '#333',
      fontSize: '13px',
      '&:hover': {
        backgroundColor: state.isSelected ? 'var(--room-entry-primary-color)' : 'var(--room-entry-primary-light)'
      }
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999
    })
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.accommodationType) {
      alert("Please select accommodation type");
      return;
    }
    if (!formData.requisitionerName.trim()) {
      alert("Please enter requisitioner name");
      return;
    }
    if (!formData.address.trim()) {
      alert("Please enter address");
      return;
    }
    if (!formData.date) {
      alert("Please select date");
      return;
    }
    if (!formData.age) {
      alert("Please enter age");
      return;
    }
    if (!formData.guestType) {
      alert("Please select guest type");
      return;
    }

    // Validate guest data - check for partially filled rows
    let hasIncompleteRow = false;
    const validGuests = formData.guests.filter(guest => {
      // A guest row is valid if it's completely empty or completely filled
      const isEmpty = !guest.name.trim() && !guest.relationship && !guest.sex && !guest.age;
      const isComplete = guest.name.trim() && guest.relationship && guest.sex && guest.age;

      if (!isEmpty && !isComplete) {
        hasIncompleteRow = true;
        return false;
      }

      return isComplete; // Only include complete guest entries
    });

    if (hasIncompleteRow) {
      alert("Please complete all guest information. All fields are required for each guest.");
      return;
    }

    if (validGuests.length === 0) {
      alert("Please add at least one complete guest entry");
      return;
    }

    // Create new application
    const newApplication = {
      id: Date.now(),
      requisitionType: formData.requisitionType,
      accommodationType: formData.accommodationType,
      requisitionerName: formData.requisitionerName,
      date: formData.date,
      extensionOfStay: ""
    };

    setApplicationData(prev => [...prev, newApplication]);
    alert("Application submitted successfully!");

    // Reset form
    resetForm();
    setIsFormView(false);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      requisitionType: "Room",
      isOfficialGuest: false,
      accommodationType: "",
      requisitionerName: "",
      address: "",
      date: "",
      age: "",
      guestType: "",
      arrivalDate: "",
      arrivalHour: "",
      arrivalMinute: "",
      arrivalSecond: "",
      departureDate: "",
      departureHour: "",
      departureMinute: "",
      departureSecond: "",
      guests: [
        {
          id: 1,
          name: "",
          relationship: "",
          sex: "",
          age: ""
        }
      ]
    });
  };

  return (
    <div className="room-entry-container">
      <header>
        <div className="room-entry-logo-text">
          {isFormView ? "Application for Room" : "List of Application for Room"}
        </div>
      </header>

      {/* Apply for Room Button - Outside Card */}
      {!isFormView && (
        <div className="room-entry-add-button-container">
          <button
            className="room-entry-add-button"
            onClick={() => {
              resetForm();
              setIsFormView(true);
            }}
          >
            Apply for Room
          </button>
        </div>
      )}

      <div className="room-entry-data-container">
        {!isFormView ? (
          <>
            {/* Search and Filter */}
            <div className="room-entry-control-panel-filters">
              <div className="room-entry-search-container">
                <div className="room-entry-search-input-wrapper">
                  <svg className="room-entry-search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="text"
                    className="room-entry-search-input"
                    placeholder="Search by Name of Requisitioner"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="room-entry-sort-container">
                <Select
                  className="room-entry-react-select"
                  classNamePrefix="room-entry-react-select"
                  value={selectedAccommodationType}
                  onChange={(option) => setSelectedAccommodationType(option)}
                  options={accommodationTypeOptions}
                  isSearchable={false}
                  placeholder="Accommodation Type"
                />
              </div>
            </div>

            {/* Applications Table */}
            <div className="room-entry-table-container">
              <table className="room-entry-table">
                <thead>
                  <tr>
                    <th className="room-entry-sl-no-header">Sl No.</th>
                    <th>Requisition Type</th>
                    <th>Type of Accommodation</th>
                    <th>Name of Requisitioner</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((application, index) => (
                    <tr key={application.id}>
                      <td className="room-entry-sl-no-cell">{index + 1}</td>
                      <td>
                        {editingRowId === application.id ? (
                          <Select
                            value={accommodationTypeOptions.find(option => option.value === editingApplication.requisitionType) || null}
                            onChange={(option) => handleInlineFieldChange('requisitionType', option.value)}
                            options={accommodationTypeOptions.filter(option => option.value !== "All")}
                            styles={tableSelectStyles}
                            menuPortalTarget={document.body}
                            placeholder="Select Type"
                          />
                        ) : (
                          application.requisitionType
                        )}
                      </td>
                      <td>
                        {editingRowId === application.id ? (
                          <Select
                            value={accommodationTypeOptions.find(option => option.value === editingApplication.accommodationType) || null}
                            onChange={(option) => handleInlineFieldChange('accommodationType', option.value)}
                            options={accommodationTypeOptions.filter(option => option.value !== "All")}
                            styles={tableSelectStyles}
                            menuPortalTarget={document.body}
                            placeholder="Select Accommodation"
                          />
                        ) : (
                          application.accommodationType
                        )}
                      </td>
                      <td>
                        {editingRowId === application.id ? (
                          <input
                            type="text"
                            className="room-entry-table-input"
                            value={editingApplication.requisitionerName}
                            onChange={(e) => handleInlineFieldChange('requisitionerName', e.target.value)}
                            placeholder="Enter name"
                          />
                        ) : (
                          application.requisitionerName
                        )}
                      </td>
                      <td>
                        {editingRowId === application.id ? (
                          <input
                            type="date"
                            className="room-entry-table-input"
                            value={editingApplication.date}
                            onChange={(e) => handleInlineFieldChange('date', e.target.value)}
                          />
                        ) : (
                          application.date
                        )}
                      </td>
                      <td>
                        <div className="room-entry-action-buttons">
                          {editingRowId === application.id ? (
                            <>
                              <button
                                className="room-entry-save-button"
                                onClick={handleSaveInlineEdit}
                                title="Save"
                              >
                                Save
                              </button>
                              <button
                                className="room-entry-cancel-button"
                                onClick={handleCancelInlineEdit}
                                title="Cancel"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="room-entry-edit-button"
                                onClick={() => handleInlineEdit(application)}
                                title="Edit"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                              </button>
                              <button
                                className="room-entry-delete-button"
                                onClick={() => handleDelete(application.id)}
                                title="Delete"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M3 6h18"></path>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          /* Application Form */
          <>
            {/* Back Button - Outside Form Card */}
            <div className="room-entry-back-button-container">
              <button
                className="room-entry-back-button"
                onClick={() => {
                  resetForm();
                  setIsFormView(false);
                }}
              >
                Back
              </button>
            </div>

            <div className="room-entry-form-container">

              <form className="room-entry-form" onSubmit={handleSubmit}>
                {/* First Row */}
                <div className="room-entry-form-row">
                  <div className="room-entry-form-group">
                    <label className="room-entry-form-label">Requisition Type:</label>
                    <input
                      type="text"
                      className="room-entry-form-text-input"
                      value={formData.requisitionType}
                      readOnly
                    />
                  </div>
                  <div className="room-entry-form-group">
                    <label className="room-entry-checkbox-container">
                      <input
                        type="checkbox"
                        checked={formData.isOfficialGuest}
                        onChange={(e) => handleInputChange('isOfficialGuest', e.target.checked)}
                        className="room-entry-checkbox-input"
                      />
                      <span className="room-entry-checkbox-text">Is Official Guest?</span>
                    </label>
                  </div>
                </div>

                {/* Second Row */}
                <div className="room-entry-form-row">
                  <div className="room-entry-form-group">
                    <label className="room-entry-form-label">Type of Accommodation:</label>
                    <Select
                      value={accommodationTypeOptions.find(option => option.value === formData.accommodationType) || null}
                      onChange={(option) => handleInputChange('accommodationType', option.value)}
                      options={accommodationTypeOptions.filter(option => option.value !== "All")}
                      styles={customSelectStyles}
                      placeholder="Select Type of Accommodation"
                    />
                  </div>
                  <div className="room-entry-form-group">
                    <label className="room-entry-form-label">Name of Requisitioner:</label>
                    <input
                      type="text"
                      className="room-entry-form-text-input"
                      value={formData.requisitionerName}
                      onChange={(e) => handleInputChange('requisitionerName', e.target.value)}
                      placeholder="Enter Name of Requisitioner"
                    />
                  </div>
                </div>

                {/* Third Row */}
                <div className="room-entry-form-row">
                  <div className="room-entry-form-group">
                    <label className="room-entry-form-label">Address:</label>
                    <textarea
                      className="room-entry-form-textarea"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter Address"
                      rows="3"
                    />
                  </div>
                  <div className="room-entry-form-group">
                    <label className="room-entry-form-label">Date:</label>
                    <input
                      type="date"
                      className="room-entry-form-text-input"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                    />
                  </div>
                </div>

                {/* Fourth Row */}
                <div className="room-entry-form-row">
                  <div className="room-entry-form-group">
                    <label className="room-entry-form-label">Age (in Year):</label>
                    <input
                      type="number"
                      className="room-entry-form-text-input"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="Enter Age"
                    />
                  </div>
                  <div className="room-entry-form-group">
                    <label className="room-entry-form-label">Type of Guest:</label>
                    <Select
                      value={guestTypeOptions.find(option => option.value === formData.guestType) || null}
                      onChange={(option) => handleInputChange('guestType', option.value)}
                      options={guestTypeOptions}
                      styles={customSelectStyles}
                      placeholder="Select Department"
                    />
                  </div>
                </div>

                {/* Fifth Row - Arrival and Departure */}
                <div className="room-entry-form-row">
                  <div className="room-entry-form-group">
                    <label className="room-entry-form-label">From (Arrival Date & Time):</label>
                    <div className="room-entry-datetime-container">
                      <input
                        type="date"
                        className="room-entry-form-text-input"
                        value={formData.arrivalDate}
                        onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
                      />
                      <div className="room-entry-time-inputs">
                        <input
                          type="number"
                          className="room-entry-form-text-input"
                          value={formData.arrivalHour}
                          onChange={(e) => handleInputChange('arrivalHour', e.target.value)}
                          placeholder="HH"
                          min="0"
                          max="23"
                        />
                        <input
                          type="number"
                          className="room-entry-form-text-input"
                          value={formData.arrivalMinute}
                          onChange={(e) => handleInputChange('arrivalMinute', e.target.value)}
                          placeholder="MM"
                          min="0"
                          max="59"
                        />
                        <input
                          type="number"
                          className="room-entry-form-text-input"
                          value={formData.arrivalSecond}
                          onChange={(e) => handleInputChange('arrivalSecond', e.target.value)}
                          placeholder="SS"
                          min="0"
                          max="59"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="room-entry-form-group">
                    <label className="room-entry-form-label">To (Departure Date & Time):</label>
                    <div className="room-entry-datetime-container">
                      <input
                        type="date"
                        className="room-entry-form-text-input"
                        value={formData.departureDate}
                        onChange={(e) => handleInputChange('departureDate', e.target.value)}
                      />
                      <div className="room-entry-time-inputs">
                        <input
                          type="number"
                          className="room-entry-form-text-input"
                          value={formData.departureHour}
                          onChange={(e) => handleInputChange('departureHour', e.target.value)}
                          placeholder="HH"
                          min="0"
                          max="23"
                        />
                        <input
                          type="number"
                          className="room-entry-form-text-input"
                          value={formData.departureMinute}
                          onChange={(e) => handleInputChange('departureMinute', e.target.value)}
                          placeholder="MM"
                          min="0"
                          max="59"
                        />
                        <input
                          type="number"
                          className="room-entry-form-text-input"
                          value={formData.departureSecond}
                          onChange={(e) => handleInputChange('departureSecond', e.target.value)}
                          placeholder="SS"
                          min="0"
                          max="59"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guests Table */}
                <div className="room-entry-form-row">
                  <div className="room-entry-form-group room-entry-form-group-full-width">
                    <div className="room-entry-table-container">
                      <table className="room-entry-table">
                        <thead>
                          <tr>
                            <th className="room-entry-sl-no-header">Sl No.</th>
                            <th>Name of the Guest</th>
                            <th>Relationship</th>
                            <th>Sex</th>
                            <th>Age (in year)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.guests.map((guest, index) => (
                            <tr key={guest.id}>
                              <td className="room-entry-sl-no-cell">{index + 1}</td>
                              <td>
                                <input
                                  type="text"
                                  className="room-entry-table-input"
                                  value={guest.name}
                                  onChange={(e) => updateGuest(guest.id, 'name', e.target.value)}
                                  placeholder="Enter name"
                                />
                              </td>
                              <td>
                                <Select
                                  value={relationshipOptions.find(option => option.value === guest.relationship) || null}
                                  onChange={(option) => updateGuest(guest.id, 'relationship', option.value)}
                                  options={relationshipOptions}
                                  styles={tableSelectStyles}
                                  menuPortalTarget={document.body}
                                  placeholder="Select Relationship"
                                />
                              </td>
                              <td>
                                <Select
                                  value={sexOptions.find(option => option.value === guest.sex) || null}
                                  onChange={(option) => updateGuest(guest.id, 'sex', option.value)}
                                  options={sexOptions}
                                  styles={tableSelectStyles}
                                  menuPortalTarget={document.body}
                                  placeholder="Select Sex"
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  className="room-entry-table-input"
                                  value={guest.age}
                                  onChange={(e) => updateGuest(guest.id, 'age', e.target.value)}
                                  placeholder="Age"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="room-entry-add-more-container">
                      <button
                        type="button"
                        className="room-entry-add-more-button"
                        onClick={addGuestRow}
                      >
                        Add More
                      </button>
                    </div>
                  </div>
                </div>

                {/* Checkbox and Submit */}
                <div className="room-entry-form-row">
                  <div className="room-entry-form-group room-entry-form-group-full-width">
                    <label className="room-entry-checkbox-label">
                      <input type="checkbox" required />
                      {formData.isOfficialGuest
                        ? "It is certified that the above-mentioned guest(s) is/are invited by the University/School/Centre for which TA/DA to the guest is to be paid by CUK"
                        : "The Guest is personally known to me and I am responsible for his/her Conduct. If he/she Fails to make payment of lodging/boarding Charges. The same may be made by me"
                      }
                    </label>
                  </div>
                </div>

                <div className="room-entry-form-row room-entry-form-submit-row">
                  <button type="submit" className="room-entry-form-submit-button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Room;