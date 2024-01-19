
const clockIn = async() =>{
  let result;
  const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/users/user/clockIn`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

  if(response.status === 200){
    result = true
  } else {
    result = false;
  }

  return result;
}

export {clockIn}