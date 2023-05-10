

const UploadProfilePicture = ({showForm, hideUploadForm, uploadProfileImage, setShowForm,}) => {


  return (
    <div className={`bg-black bg-opacity-20 fixed left-0 right-0 h-screen top-0 flex justify-center items-center z-50 ${showForm}`}>
      <form onSubmit={uploadProfileImage} className="bg-navbar w-80 md:w-1/2 lg:w-1/4 p-4 rounded-md text-white" encType="multipart/form-data">
        <div>
          <label htmlFor="upload-image" className="text-lg font-medium">Upload Profile Picture</label>
          <input
            className="mt-5 bg-bg-focus w-full rounded-md py-2 px-3"
            id="upload-image"
            type="file"
            name="image"
            accept="image/*"
          />
        </div>
        <div className="flex justify-end items-center mt-4">
          <button type="button" className="bg-blue-600 px-4 py-1 rounded-md mr-4 duration-300 transition-all hover:bg-blue-700" onClick={hideUploadForm}>
            Cancel
          </button>
          <input
            type="submit"
            value="Upload"
            className="cursor-pointer bg-green-600 px-4 py-1 rounded-md duration-300 transition-all hover:bg-green-700"
            onClick={() => setShowForm("hidden")}
          />
        </div>
      </form>
    </div>

  )
}

export default UploadProfilePicture