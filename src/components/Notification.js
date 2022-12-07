const Notification = ({ successMessage, errorMessage }) => {
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  if (successMessage) {
    return (
      <div className='success' style={successStyle}>
        {successMessage}
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className='error' style={errorStyle}>
        {errorMessage}
      </div>
    );
  }

  return (
    <></>
  );
};

export default Notification;