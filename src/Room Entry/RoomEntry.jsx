"use client";

import imageCompression from "browser-image-compression";
import { useState } from "react";
import Select from "react-select";
import "./RoomEntry.css";

const RoomEntry = () => {
  const [isFormView, setIsFormView] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState({ value: "All", label: "All" });
  const [selectedStatus, setSelectedStatus] = useState({ value: "All", label: "All" });
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [modalPhotos, setModalPhotos] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    roomType: "",
    isNewRoomType: false,
    newRoomTypeName: "",
    roomPhotos: [],
    roomPhotosPreviews: []
  });

  // Dummy room data - 5 rooms for each type
  const [roomData, setRoomData] = useState([
    // Single Rooms
    { id: 1, roomType: "Single Room", status: "Booked", photos: ["single-room.png"] },
    { id: 2, roomType: "Single Room", status: "Vacant", photos: ["single-room.png"] },
    { id: 3, roomType: "Single Room", status: "Booked", photos: ["single-room.png"] },
    { id: 4, roomType: "Single Room", status: "Vacant", photos: ["single-room.png"] },
    { id: 5, roomType: "Single Room", status: "Booked", photos: ["single-room.png"] },

    // Double Rooms
    { id: 6, roomType: "Double Room", status: "Vacant", photos: ["double-room.png"] },
    { id: 7, roomType: "Double Room", status: "Booked", photos: ["double-room.png"] },
    { id: 8, roomType: "Double Room", status: "Vacant", photos: ["double-room.png"] },
    { id: 9, roomType: "Double Room", status: "Booked", photos: ["double-room.png"] },
    { id: 10, roomType: "Double Room", status: "Vacant", photos: ["double-room.png"] },

    // Standard Rooms
    { id: 11, roomType: "Standard Room", status: "Booked", photos: ["standard-room.png"] },
    { id: 12, roomType: "Standard Room", status: "Vacant", photos: ["standard-room.png"] },
    { id: 13, roomType: "Standard Room", status: "Booked", photos: ["standard-room.png"] },
    { id: 14, roomType: "Standard Room", status: "Vacant", photos: ["standard-room.png"] },
    { id: 15, roomType: "Standard Room", status: "Booked", photos: ["standard-room.png"] },

    // Deluxe Rooms
    { id: 16, roomType: "Deluxe Room", status: "Vacant", photos: ["deluxe-room.png"] },
    { id: 17, roomType: "Deluxe Room", status: "Booked", photos: ["deluxe-room.png"] },
    { id: 18, roomType: "Deluxe Room", status: "Vacant", photos: ["deluxe-room.png"] },
    { id: 19, roomType: "Deluxe Room", status: "Booked", photos: ["deluxe-room.png"] },
    { id: 20, roomType: "Deluxe Room", status: "Vacant", photos: ["deluxe-room.png"] }
  ]);

  // Room type options
  const roomTypeOptions = [
    { value: "All", label: "All" },
    { value: "Single Room", label: "Single Room" },
    { value: "Double Room", label: "Double Room" },
    { value: "Standard Room", label: "Standard Room" },
    { value: "Deluxe Room", label: "Deluxe Room" }
  ];

  // Status options
  const statusOptions = [
    { value: "All", label: "All" },
    { value: "Booked", label: "Booked" },
    { value: "Vacant", label: "Vacant" }
  ];

  // Filter rooms based on room type and status
  const filteredRooms = roomData.filter(room => {
    const matchesRoomType = selectedRoomType.value === "All" ||
      room.roomType === selectedRoomType.value;

    const matchesStatus = selectedStatus.value === "All" ||
      room.status === selectedStatus.value;

    return matchesRoomType && matchesStatus;
  });

  // Handle photo modal
  const handlePhotoClick = (photos) => {
    setModalPhotos(photos);
    setShowPhotoModal(true);
  };

  // Handle file upload and compression
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Validate file types
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const validFiles = files.filter(file => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      alert('Please upload only PNG, JPEG, or JPG files.');
      return;
    }

    try {
      const compressedFiles = [];
      const previews = [];

      for (const file of validFiles) {
        // Compression options
        const options = {
          maxSizeMB: 1, // Maximum file size in MB
          maxWidthOrHeight: 800, // Maximum width or height
          useWebWorker: true,
          fileType: file.type
        };

        // Compress the image
        const compressedFile = await imageCompression(file, options);

        // Create preview URL
        const previewUrl = URL.createObjectURL(compressedFile);

        compressedFiles.push(compressedFile);
        previews.push(previewUrl);
      }

      setFormData(prev => ({
        ...prev,
        roomPhotos: [...prev.roomPhotos, ...compressedFiles],
        roomPhotosPreviews: [...prev.roomPhotosPreviews, ...previews]
      }));
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing files. Please try again.');
    }
  };

  // Remove photo from form
  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      roomPhotos: prev.roomPhotos.filter((_, i) => i !== index),
      roomPhotosPreviews: prev.roomPhotosPreviews.filter((_, i) => i !== index)
    }));
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.isNewRoomType && !formData.roomType) {
      alert("Please select a room type");
      return;
    }
    if (formData.isNewRoomType && !formData.newRoomTypeName.trim()) {
      alert("Please enter new room type name");
      return;
    }
    if (!formData.roomPhotos.length) {
      alert("Please upload at least one room photo");
      return;
    }

    const roomType = formData.isNewRoomType ? formData.newRoomTypeName : formData.roomType;

    if (editingRoom) {
      // Update existing room
      setRoomData(prev => prev.map(room =>
        room.id === editingRoom.id
          ? {
              ...room,
              roomType: roomType,
              photos: formData.roomPhotosPreviews.length ? formData.roomPhotosPreviews : room.photos
            }
          : room
      ));
      alert("Room updated successfully!");
      setEditingRoom(null);
    } else {
      // Add new room
      const newRoom = {
        id: Date.now(),
        roomType: roomType,
        status: "Vacant", // Default status for new rooms
        photos: formData.roomPhotosPreviews
      };
      setRoomData(prev => [...prev, newRoom]);
      alert("Room added successfully!");
    }

    // Reset form
    resetForm();
    setIsFormView(false);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      roomType: "",
      isNewRoomType: false,
      newRoomTypeName: "",
      roomPhotos: [],
      roomPhotosPreviews: []
    });
    setEditingRoom(null);
  };

  return (
    <div className="room-entry-container">
      <header>
        <div className="room-entry-logo-text">Room Entry</div>
      </header>

      {/* Add Room Button - Outside Card */}
      {!isFormView && (
        <div className="room-entry-add-button-container">
          <button
            className="room-entry-add-button"
            onClick={() => {
              resetForm();
              setIsFormView(true);
            }}
          >
            Add Room
          </button>
        </div>
      )}

      <div className="room-entry-data-container">
        {!isFormView ? (
          <>
            {/* Filters */}
            <div className="room-entry-control-panel-filters">
              <div className="room-entry-dropdown-container">
                <div className="room-entry-dropdown-group">
                  <span className="room-entry-label-text">Room Type:</span>
                  <div className="room-entry-select-container">
                    <Select
                      value={selectedRoomType}
                      onChange={(option) => setSelectedRoomType(option)}
                      options={roomTypeOptions}
                      styles={customSelectStyles}
                      isSearchable
                      placeholder="Select Room Type"
                    />
                  </div>
                </div>

                <div className="room-entry-dropdown-group">
                  <span className="room-entry-label-text">Status:</span>
                  <div className="room-entry-select-container">
                    <Select
                      value={selectedStatus}
                      onChange={(option) => setSelectedStatus(option)}
                      options={statusOptions}
                      styles={customSelectStyles}
                      isSearchable
                      placeholder="Select Status"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rooms Table */}
            <div className="room-entry-table-container">
              <table className="room-entry-table">
                <thead>
                  <tr>
                    <th className="room-entry-sl-no-header">Sl No.</th>
                    <th>Room Photo</th>
                    <th>Room Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRooms.map((room, index) => (
                    <tr key={room.id}>
                      <td className="room-entry-sl-no-cell">{index + 1}</td>
                      <td>
                        <div
                          className="room-entry-photo-container"
                          onClick={() => handlePhotoClick(room.photos)}
                        >
                          <img
                            src={room.photos[0]}
                            alt={room.roomType}
                            className="room-entry-photo"
                          />
                          {room.photos.length > 1 && (
                            <div className="room-entry-photo-count">
                              +{room.photos.length - 1}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>{room.roomType}</td>
                      <td>
                        <span className={`room-entry-status ${room.status.toLowerCase()}`}>
                          {room.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          /* Room Form */
          <div className="room-entry-form-container">
            <div className="room-entry-form-header">
              <h3>{editingRoom ? 'Edit Room' : 'Add New Room'}</h3>
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

            <form className="room-entry-form" onSubmit={handleSubmit}>
              <div className="room-entry-form-row">
                <div className="room-entry-form-group room-entry-form-group-full-width">
                  <label className="room-entry-form-label">Room Type:</label>
                  <div className="room-entry-room-type-container">
                    <div className="room-entry-room-type-toggle">
                      <label className="room-entry-toggle-label">
                        <input
                          type="radio"
                          name="roomTypeOption"
                          checked={!formData.isNewRoomType}
                          onChange={() => setFormData(prev => ({ ...prev, isNewRoomType: false, newRoomTypeName: "" }))}
                        />
                        <span>Select Existing Room Type</span>
                      </label>
                      <label className="room-entry-toggle-label">
                        <input
                          type="radio"
                          name="roomTypeOption"
                          checked={formData.isNewRoomType}
                          onChange={() => setFormData(prev => ({ ...prev, isNewRoomType: true, roomType: "" }))}
                        />
                        <span>Add New Room Type</span>
                      </label>
                    </div>

                    {!formData.isNewRoomType ? (
                      <div className="room-entry-select-container">
                        <Select
                          value={roomTypeOptions.find(option => option.value === formData.roomType) || null}
                          onChange={(option) => setFormData(prev => ({ ...prev, roomType: option.value }))}
                          options={roomTypeOptions.filter(option => option.value !== "All")}
                          styles={customSelectStyles}
                          placeholder="Select Room Type"
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        className="room-entry-form-text-input"
                        value={formData.newRoomTypeName}
                        onChange={(e) => setFormData(prev => ({ ...prev, newRoomTypeName: e.target.value }))}
                        placeholder="Enter new room type name"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="room-entry-form-row">
                <div className="room-entry-form-group room-entry-form-group-full-width">
                  <label className="room-entry-form-label" htmlFor="roomPhotos">Room Photos:</label>
                  <div className="room-entry-file-upload-container">
                    <input
                      id="roomPhotos"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      onChange={handleFileUpload}
                      className="room-entry-file-input"
                    />
                    <div className="room-entry-file-upload-text">
                      <p>Upload room photos (JPG, JPEG, PNG only)</p>
                      <p>Multiple photos can be selected</p>
                    </div>
                  </div>

                  {formData.roomPhotosPreviews.length > 0 && (
                    <div className="room-entry-photos-preview">
                      {formData.roomPhotosPreviews.map((preview, index) => (
                        <div key={index} className="room-entry-photo-preview">
                          <img src={preview} alt={`Preview ${index + 1}`} />
                          <button
                            type="button"
                            className="room-entry-remove-photo"
                            onClick={() => removePhoto(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="room-entry-form-row room-entry-form-submit-row">
                <button type="submit" className="room-entry-form-submit-button">
                  {editingRoom ? 'Update Room' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {showPhotoModal && (
        <div className="room-entry-photo-modal" onClick={() => setShowPhotoModal(false)}>
          <div className="room-entry-photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="room-entry-photo-modal-close" onClick={() => setShowPhotoModal(false)}>&times;</span>
            <div className="room-entry-photos-grid">
              {modalPhotos.map((photo, index) => (
                <img key={index} src={photo} alt={`Room Photo ${index + 1}`} className="room-entry-modal-photo" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomEntry;