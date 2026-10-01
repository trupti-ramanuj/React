const BASE_URL = "https://dummyjson.com";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("API ERROR:", {
      url: `${BASE_URL}${endpoint}`,
      status: response.status,
      data,
    });

    throw new Error(
      data?.message || `Request failed with status ${response.status}`
    );
  }

  return data;
}

export async function login(username, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: username.trim(),
      password: password.trim(),
    
    }),
  });
}

export async function getUsers() {
  return request("/users?limit=0");
}

export async function getUser(id) {
  return request(`/users/${id}`);
}

export async function create(user) {
  return request("/users/add", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export async function update(id, user) {
  return request(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
}

export async function deleteUser(id) {
  return request(`/users/${id}`, {
    method: "DELETE",
  });
}