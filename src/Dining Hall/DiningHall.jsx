"use client";

import { useState } from "react";
import Select from "react-select";
import "./DiningHall.css";

const DiningHall = () => {
  const [isFormView, setIsFormView] = useState(false);
  const [selectedAccommodationType, setSelectedAccommodationType] = useState({ value: "All", label: "All" });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingApplication, setEditingApplication] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    requisitionType: "Dining Hall",
    applicantName: "",
    contactNo: "",
    purposeOfProgramme: "",
    date: "",
    guestType: "",
    guestDetails: [
      {
        id: 1,
        name: "",
        male: 0,
        female: 0,
        other: 0,
        total: 0
      }
    ],
    responsiblePersonName: "",
    advancePaymentAmount: "",
    foodArrangements: [
      {
        id: 1,
        fromDate: "",
        breakfastHour: "",
        breakfastMinute: "",
        breakfastSecond: "",
        lunchHour: "",
        lunchMinute: "",
        lunchSecond: "",
        highTeaHour: "",
        highTeaMinute: "",
        highTeaSecond: "",
        dinnerHour: "",
        dinnerMinute: "",
        dinnerSecond: ""
      }
    ],
    agreeToTerms: false
  });

  // Dummy application data
  const [applicationData, setApplicationData] = useState([
    {
      id: 1,
      requisitionType: "Dining Hall",
      accommodationType: "Main Dining Hall",
      requisitionerName: "John Doe",
      date: "15-01-2025",
      extensionOfStay: ""
    },
    {
      id: 2,
      requisitionType: "Dining Hall",
      accommodationType: "Banquet Hall",
      requisitionerName: "Jane Smith",
      date: "16-01-2025",
      extensionOfStay: ""
    },
    {
      id: 3,
      requisitionType: "Dining Hall",
      accommodationType: "Private Dining Room",
      requisitionerName: "Robert Johnson",
      date: "17-01-2025",
      extensionOfStay: ""
    },
    {
      id: 4,
      requisitionType: "Dining Hall",
      accommodationType: "Conference Hall",
      requisitionerName: "Emily Davis",
      date: "18-01-2025",
      extensionOfStay: ""
    },
    {
      id: 5,
      requisitionType: "Dining Hall",
      accommodationType: "VIP Dining Area",
      requisitionerName: "Michael Wilson",
      date: "19-01-2025",
      extensionOfStay: ""
    }
  ]);

  // Accommodation type options for dining hall
  const accommodationTypeOptions = [
    { value: "All", label: "All" },
    { value: "Main Dining Hall", label: "Main Dining Hall" },
    { value: "Banquet Hall", label: "Banquet Hall" },
    { value: "Conference Hall", label: "Conference Hall" },
    { value: "Private Dining Room", label: "Private Dining Room" },
    { value: "VIP Dining Area", label: "VIP Dining Area" },
    { value: "Outdoor Dining Area", label: "Outdoor Dining Area" },
    { value: "Cafeteria", label: "Cafeteria" }
  ];

  // Guest type options
  const guestTypeOptions = [
    { value: "Official Guest", label: "Official Guest" },
    { value: "Personal Guest", label: "Personal Guest" }
  ];

  // Department options for applicant
  const departmentOptions = [
    { value: "Computer Science Department", label: "Computer Science Department" },
    { value: "Electrical Engineering Department", label: "Electrical Engineering Department" },
    { value: "Mechanical Engineering Department", label: "Mechanical Engineering Department" },
    { value: "Civil Engineering Department", label: "Civil Engineering Department" },
    { value: "Mathematics Department", label: "Mathematics Department" },
    { value: "Physics Department", label: "Physics Department" },
    { value: "Chemistry Department", label: "Chemistry Department" },
    { value: "Administration Office", label: "Administration Office" },
    { value: "Finance Office", label: "Finance Office" },
    { value: "Academic Office", label: "Academic Office" },
    { value: "Student Affairs Office", label: "Student Affairs Office" },
    { value: "Research Centre", label: "Research Centre" },
    { value: "Training Centre", label: "Training Centre" },
    { value: "Guest House", label: "Guest House" }
  ];

  // Filter applications based on search term and accommodation type
  const filteredApplications = applicationData.filter(application => {
    const matchesSearch = application.requisitionerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAccommodationType = selectedAccommodationType.value === "All" ||
      application.accommodationType === selectedAccommodationType.value;

    return matchesSearch && matchesAccommodationType;
  });



  // Update guest details
  const updateGuestDetail = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      guestDetails: prev.guestDetails.map(guest => {
        if (guest.id === id) {
          const updatedGuest = { ...guest, [field]: value };
          // Auto-calculate total when male, female, or other changes
          if (field === 'male' || field === 'female' || field === 'other') {
            const male = field === 'male' ? parseInt(value) || 0 : parseInt(updatedGuest.male) || 0;
            const female = field === 'female' ? parseInt(value) || 0 : parseInt(updatedGuest.female) || 0;
            const other = field === 'other' ? parseInt(value) || 0 : parseInt(updatedGuest.other) || 0;
            updatedGuest.total = male + female + other;
          }
          return updatedGuest;
        }
        return guest;
      })
    }));
  };

  // Add new food arrangement row
  const addFoodArrangementRow = () => {
    const newArrangement = {
      id: Date.now(),
      fromDate: "",
      breakfastHour: "",
      breakfastMinute: "",
      breakfastSecond: "",
      lunchHour: "",
      lunchMinute: "",
      lunchSecond: "",
      highTeaHour: "",
      highTeaMinute: "",
      highTeaSecond: "",
      dinnerHour: "",
      dinnerMinute: "",
      dinnerSecond: ""
    };
    setFormData(prev => ({
      ...prev,
      foodArrangements: [...prev.foodArrangements, newArrangement]
    }));
  };

  // Update food arrangement
  const updateFoodArrangement = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      foodArrangements: prev.foodArrangements.map(arrangement =>
        arrangement.id === id ? { ...arrangement, [field]: value } : arrangement
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
    if (!formData.applicantName) {
      alert("Please select applicant name/department");
      return;
    }
    if (!formData.contactNo || formData.contactNo.length !== 10) {
      alert("Please enter a valid 10-digit contact number");
      return;
    }
    if (!formData.date) {
      alert("Please select date");
      return;
    }
    if (!formData.purposeOfProgramme.trim()) {
      alert("Please enter purpose of programme");
      return;
    }
    if (!formData.guestType) {
      alert("Please select guest type");
      return;
    }
    if (!formData.responsiblePersonName.trim()) {
      alert("Please enter name of person responsible for payment");
      return;
    }
    if (!formData.advancePaymentAmount) {
      alert("Please enter advance payment amount");
      return;
    }

    // Validate guest details - check for at least one complete guest
    const validGuests = formData.guestDetails.filter(guest => guest.name.trim());
    if (validGuests.length === 0) {
      alert("Please add at least one guest detail");
      return;
    }

    // Validate food arrangements - check for at least one arrangement
    const validArrangements = formData.foodArrangements.filter(arrangement => arrangement.fromDate);
    if (validArrangements.length === 0) {
      alert("Please add at least one food arrangement");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    // Create new application
    const newApplication = {
      id: Date.now(),
      requisitionType: formData.requisitionType,
      accommodationType: "Dining Hall", // Default for dining hall applications
      requisitionerName: formData.applicantName,
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
      requisitionType: "Dining Hall",
      applicantName: "",
      contactNo: "",
      purposeOfProgramme: "",
      date: "",
      guestType: "",
      guestDetails: [
        {
          id: 1,
          name: "",
          male: 0,
          female: 0,
          other: 0,
          total: 0
        }
      ],
      responsiblePersonName: "",
      advancePaymentAmount: "",
      foodArrangements: [
        {
          id: 1,
          fromDate: "",
          breakfastHour: "",
          breakfastMinute: "",
          breakfastSecond: "",
          lunchHour: "",
          lunchMinute: "",
          lunchSecond: "",
          highTeaHour: "",
          highTeaMinute: "",
          highTeaSecond: "",
          dinnerHour: "",
          dinnerMinute: "",
          dinnerSecond: ""
        }
      ],
      agreeToTerms: false
    });
  };

  return (
    <div className="room-entry-container">
      <header>
        <div className="room-entry-logo-text">
          {isFormView ? "Application for Dining Hall" : "List of Application for Dining Hall"}
        </div>
      </header>

      {/* Apply for Dining Hall Button - Outside Card */}
      {!isFormView && (
        <div className="room-entry-add-button-container">
          <button
            className="room-entry-add-button"
            onClick={() => {
              resetForm();
              setIsFormView(true);
            }}
          >
            Apply for Dining Hall
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
                    <label className="room-entry-form-label">Name of Applicant/Dept./Office/Centre:</label>
                    <Select
                      value={departmentOptions.find(option => option.value === formData.applicantName) || null}
                      onChange={(option) => handleInputChange('applicantName', option.value)}
                      options={departmentOptions}
                      styles={customSelectStyles}
                      placeholder="Select Department/Office/Centre"
                    />
                  </div>
                </div>

                {/* Second Row */}
                <div className="room-entry-form-row">
                  <div className="room-entry-form-group">
                    <label className="room-entry-form-label">Contact No:</label>
                    <input
                      type="text"
                      className="room-entry-form-text-input"
                      value={formData.contactNo}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        if (value.length <= 10) {
                          handleInputChange('contactNo', value);
                        }
                      }}
                      placeholder="Enter 10-digits Contact No."
                      maxLength="10"
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

                {/* Third Row */}
                <div className="room-entry-form-row">
                  <div className="room-entry-form-group">
                    <label className="room-entry-form-label">Purpose of Programme:</label>
                    <textarea
                      className="room-entry-form-textarea"
                      value={formData.purposeOfProgramme}
                      onChange={(e) => handleInputChange('purposeOfProgramme', e.target.value)}
                      placeholder="Enter Purpose of Programme"
                      rows="3"
                      style={{ minHeight: '80px', maxHeight: '120px' }}
                    />
                  </div>
                  <div className="room-entry-form-group">
                    <label className="room-entry-form-label">Type of Guest:</label>
                    <Select
                      value={guestTypeOptions.find(option => option.value === formData.guestType) || null}
                      onChange={(option) => handleInputChange('guestType', option.value)}
                      options={guestTypeOptions}
                      styles={customSelectStyles}
                      placeholder="Select Guest Type"
                    />
                  </div>
                </div>

                {/* Guest Details Table */}
                <div className="room-entry-form-row">
                  <div className="room-entry-form-group full-width">
                    <label className="room-entry-form-label">Guest Details:</label>
                    <div className="room-entry-table-container">
                      <table className="guest-details-table">
                        <thead>
                          <tr>
                            <th>Guest Name</th>
                            <th>Male</th>
                            <th>Female</th>
                            <th>Other</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.guestDetails.map((guest) => (
                            <tr key={guest.id}>
                              <td>
                                <input
                                  type="text"
                                  className="room-entry-form-text-input"
                                  value={guest.name}
                                  onChange={(e) => updateGuestDetail(guest.id, 'name', e.target.value)}
                                  placeholder="Enter Guest Name"
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  className="room-entry-form-text-input"
                                  value={guest.male}
                                  onChange={(e) => updateGuestDetail(guest.id, 'male', e.target.value)}
                                  min="0"
                                  placeholder="0"
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  className="room-entry-form-text-input"
                                  value={guest.female}
                                  onChange={(e) => updateGuestDetail(guest.id, 'female', e.target.value)}
                                  min="0"
                                  placeholder="0"
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  className="room-entry-form-text-input"
                                  value={guest.other}
                                  onChange={(e) => updateGuestDetail(guest.id, 'other', e.target.value)}
                                  min="0"
                                  placeholder="0"
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  className="room-entry-form-text-input"
                                  value={guest.total}
                                  readOnly
                                  style={{ backgroundColor: '#f5f5f5' }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Payment Details Row */}
                <div className="room-entry-form-row">
                  <div className="room-entry-form-group">
                    <label className="room-entry-form-label">Name of the Person responsible for the Payment:</label>
                    <input
                      type="text"
                      className="room-entry-form-text-input"
                      value={formData.responsiblePersonName}
                      onChange={(e) => handleInputChange('responsiblePersonName', e.target.value)}
                      placeholder="Enter Name of Person responsible for Payment"
                    />
                  </div>
                  <div className="room-entry-form-group">
                    <label className="room-entry-form-label">Amount of the Advance Payment (Rs.):</label>
                    <input
                      type="text"
                      className="room-entry-form-text-input"
                      value={formData.advancePaymentAmount}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow only numbers and one decimal point
                        if (/^\d*\.?\d*$/.test(value)) {
                          handleInputChange('advancePaymentAmount', value);
                        }
                      }}
                      placeholder="Enter Amount (Rs.)"
                    />
                  </div>
                </div>

                {/* Food Arrangement Table */}
                <div className="room-entry-form-row">
                  <div className="room-entry-form-group full-width">
                    <label className="room-entry-form-label">Food Arrangement:</label>
                    <div className="room-entry-table-container">
                      <table className="food-arrangement-table">
                        <thead>
                          <tr>
                            <th>Sl No.</th>
                            <th>Food Arrangement For</th>
                            <th>Breakfast</th>
                            <th>Lunch</th>
                            <th>High Tea</th>
                            <th>Dinner</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.foodArrangements.map((arrangement, index) => (
                            <tr key={arrangement.id}>
                              <td>{index + 1}</td>
                              <td>
                                <input
                                  type="date"
                                  className="room-entry-form-text-input"
                                  value={arrangement.fromDate}
                                  onChange={(e) => updateFoodArrangement(arrangement.id, 'fromDate', e.target.value)}
                                />
                              </td>
                              <td>
                                <div className="room-entry-time-inputs">
                                  <input
                                    type="number"
                                    className="room-entry-form-text-input"
                                    value={arrangement.breakfastHour}
                                    onChange={(e) => updateFoodArrangement(arrangement.id, 'breakfastHour', e.target.value)}
                                    placeholder="HH"
                                    min="0"
                                    max="23"
                                  />
                                  <input
                                    type="number"
                                    className="room-entry-form-text-input"
                                    value={arrangement.breakfastMinute}
                                    onChange={(e) => updateFoodArrangement(arrangement.id, 'breakfastMinute', e.target.value)}
                                    placeholder="MM"
                                    min="0"
                                    max="59"
                                  />
                                  <input
                                    type="number"
                                    className="room-entry-form-text-input"
                                    value={arrangement.breakfastSecond}
                                    onChange={(e) => updateFoodArrangement(arrangement.id, 'breakfastSecond', e.target.value)}
                                    placeholder="SS"
                                    min="0"
                                    max="59"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="room-entry-time-inputs">
                                  <input
                                    type="number"
                                    className="room-entry-form-text-input"
                                    value={arrangement.lunchHour}
                                    onChange={(e) => updateFoodArrangement(arrangement.id, 'lunchHour', e.target.value)}
                                    placeholder="HH"
                                    min="0"
                                    max="23"
                                  />
                                  <input
                                    type="number"
                                    className="room-entry-form-text-input"
                                    value={arrangement.lunchMinute}
                                    onChange={(e) => updateFoodArrangement(arrangement.id, 'lunchMinute', e.target.value)}
                                    placeholder="MM"
                                    min="0"
                                    max="59"
                                  />
                                  <input
                                    type="number"
                                    className="room-entry-form-text-input"
                                    value={arrangement.lunchSecond}
                                    onChange={(e) => updateFoodArrangement(arrangement.id, 'lunchSecond', e.target.value)}
                                    placeholder="SS"
                                    min="0"
                                    max="59"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="room-entry-time-inputs">
                                  <input
                                    type="number"
                                    className="room-entry-form-text-input"
                                    value={arrangement.highTeaHour}
                                    onChange={(e) => updateFoodArrangement(arrangement.id, 'highTeaHour', e.target.value)}
                                    placeholder="HH"
                                    min="0"
                                    max="23"
                                  />
                                  <input
                                    type="number"
                                    className="room-entry-form-text-input"
                                    value={arrangement.highTeaMinute}
                                    onChange={(e) => updateFoodArrangement(arrangement.id, 'highTeaMinute', e.target.value)}
                                    placeholder="MM"
                                    min="0"
                                    max="59"
                                  />
                                  <input
                                    type="number"
                                    className="room-entry-form-text-input"
                                    value={arrangement.highTeaSecond}
                                    onChange={(e) => updateFoodArrangement(arrangement.id, 'highTeaSecond', e.target.value)}
                                    placeholder="SS"
                                    min="0"
                                    max="59"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="room-entry-time-inputs">
                                  <input
                                    type="number"
                                    className="room-entry-form-text-input"
                                    value={arrangement.dinnerHour}
                                    onChange={(e) => updateFoodArrangement(arrangement.id, 'dinnerHour', e.target.value)}
                                    placeholder="HH"
                                    min="0"
                                    max="23"
                                  />
                                  <input
                                    type="number"
                                    className="room-entry-form-text-input"
                                    value={arrangement.dinnerMinute}
                                    onChange={(e) => updateFoodArrangement(arrangement.id, 'dinnerMinute', e.target.value)}
                                    placeholder="MM"
                                    min="0"
                                    max="59"
                                  />
                                  <input
                                    type="number"
                                    className="room-entry-form-text-input"
                                    value={arrangement.dinnerSecond}
                                    onChange={(e) => updateFoodArrangement(arrangement.id, 'dinnerSecond', e.target.value)}
                                    placeholder="SS"
                                    min="0"
                                    max="59"
                                  />
                                </div>
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
                        onClick={addFoodArrangementRow}
                      >
                        Add More
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="room-entry-form-row">
                  <div className="room-entry-form-group full-width">
                    <label className="room-entry-checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      />
                      I here by undertake to abide by the rules and regulation of the Guest House and would not bring out own cook/bearer,eatable etc from outside for the party. We ensure that the dining Hall facility is not being used to organize marriage and reception. Number of Guest, in any case, Would not exceed as mentioned above, in case of any damages caused to the Guest House property, I will be responsible to pay for damages
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
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

export default DiningHall;