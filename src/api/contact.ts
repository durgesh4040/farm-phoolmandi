import axiosServices from "@/lib/axios";

export function getContactList(query?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/contacts${query ?? ""}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getContactListById(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/contacts${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteContact(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .delete(`/api/contacts/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function createContact(values: unknown): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .post("/api/contacts", values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function updateConatact(id: number, values: unknown): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .put(`/api/contacts/${id}`, values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}