export const fetchUsers = async () => {
  const response = await fetch("http://localhost:4000/users")
  await new Promise((resolve) => setTimeout(resolve, 1200))
  
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
};
