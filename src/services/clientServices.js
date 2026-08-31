const STORAGE_KEY = "smart-review-demo-clients";

function getClients() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveClients(clients) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}

export async function addClient(data) {
  try {
    const clients = getClients();

    const client = {
      ...data,
      createdAt: new Date().toISOString(),
      scan: 0,
      active: true,
    };

    clients.push(client);
    saveClients(clients);

    return {
      success: true,
      message: "Client berhasil ditambahkan",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getClient(id) {
  const clients = getClients();

  return clients.find((client) => client.id === id) || null;
}

export async function getAllClients() {
  return getClients();
}

export async function updateClient(id, data) {
  const clients = getClients();

  const index = clients.findIndex((client) => client.id === id);

  if (index === -1) {
    throw new Error("Client tidak ditemukan");
  }

  clients[index] = {
    ...clients[index],
    ...data,
  };

  saveClients(clients);
}

export async function deleteClient(id) {
  const clients = getClients();

  const filtered = clients.filter((client) => client.id !== id);

  saveClients(filtered);
}
