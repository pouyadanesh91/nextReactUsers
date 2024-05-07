import UserListItem from "@/lib/features/users/userListItem"

export const fetchUsers = async (page = 1) => {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result: { page: number, per_page: number, total: number, total_pages: number, data: UserListItem[] } = await response.json();
  
    return result;
  };

  export const fetchUser = async (id = 1) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result: { data: UserListItem } = await response.json();
  
    return result;
  };
  
  export const createUser = async (name: string, job: string) => {
    const response = await fetch(`https://reqres.in/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, job: job }),
    });
    const result: { data: UserListItem } = await response.json();
  
    return result;
  };

  export const updateUser = async (name: string, job: string) => {
    const response = await fetch(`https://reqres.in/api/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, job: job }),
    });
    const result: { data: UserListItem } = await response.json();
  
    return result;
  };
  
  export const deleteUser = async (id = 1) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
  
    return result;
  };